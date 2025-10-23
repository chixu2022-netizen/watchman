import { NewsArticle } from '../types/news';
import { CACHE_CONFIG, API_LIMITS } from '../config/environment';

/**
 * Smart caching service optimized for free API tier (200 requests/day)
 * Implements multiple caching strategies:
 * 1. LocalStorage cache with TTL
 * 2. Request deduplication
 * 3. API quota tracking
 * 4. Stale-while-revalidate pattern
 */

interface CacheEntry {
  articles: NewsArticle[];
  timestamp: number;
  expiresAt: number;
}

interface QuotaInfo {
  count: number;
  resetAt: number;
}

class SmartCacheService {
  private requestCache = new Map<string, Promise<NewsArticle[]>>();
  private readonly CACHE_PREFIX = 'watchman_news_';
  private readonly QUOTA_KEY = 'watchman_api_quota';

  /**
   * Get cached articles for a category
   */
  getCachedArticles(category: string): NewsArticle[] | null {
    try {
      const cacheKey = `${this.CACHE_PREFIX}${category}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;

      const entry: CacheEntry = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now < entry.expiresAt) {
        console.log(`✅ Cache HIT for ${category} (${Math.floor((entry.expiresAt - now) / 60000)}min remaining)`);
        return entry.articles;
      }

      // Cache expired
      console.log(`⏰ Cache EXPIRED for ${category}`);
      localStorage.removeItem(cacheKey);
      return null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  /**
   * Store articles in cache with TTL
   */
  setCachedArticles(category: string, articles: NewsArticle[]): void {
    try {
      const cacheKey = `${this.CACHE_PREFIX}${category}`;
      const now = Date.now();
      
      const entry: CacheEntry = {
        articles,
        timestamp: now,
        expiresAt: now + CACHE_CONFIG.articleTTL, // Default: 1 hour
      };

      localStorage.setItem(cacheKey, JSON.stringify(entry));
      console.log(`💾 Cached ${articles.length} articles for ${category}`);
    } catch (error) {
      console.error('Cache write error:', error);
      // Clear old cache if storage is full
      this.clearOldCache();
    }
  }

  /**
   * Get stale cache (even if expired) as fallback
   */
  getStaleCache(category: string): NewsArticle[] | null {
    try {
      const cacheKey = `${this.CACHE_PREFIX}${category}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;

      const entry: CacheEntry = JSON.parse(cached);
      console.log(`⚠️ Using STALE cache for ${category}`);
      return entry.articles;
    } catch (error) {
      return null;
    }
  }

  /**
   * Track API quota usage (200 requests/day limit)
   */
  trackAPIRequest(): boolean {
    try {
      const quotaData = localStorage.getItem(this.QUOTA_KEY);
      const now = Date.now();
      
      let quota: QuotaInfo;

      if (quotaData) {
        quota = JSON.parse(quotaData);
        
        // Reset quota if 24 hours passed
        if (now > quota.resetAt) {
          quota = {
            count: 0,
            resetAt: now + 86400000, // 24 hours
          };
        }
      } else {
        quota = {
          count: 0,
          resetAt: now + 86400000,
        };
      }

      // Check if quota exceeded
      if (quota.count >= API_LIMITS.dailyLimit) {
        const hoursUntilReset = Math.floor((quota.resetAt - now) / 3600000);
        console.warn(`⚠️ API QUOTA EXCEEDED! ${quota.count}/${API_LIMITS.dailyLimit} requests used. Resets in ${hoursUntilReset}h`);
        return false;
      }

      // Increment quota
      quota.count++;
      localStorage.setItem(this.QUOTA_KEY, JSON.stringify(quota));
      
      const remaining = API_LIMITS.dailyLimit - quota.count;
      console.log(`📊 API Quota: ${quota.count}/${API_LIMITS.dailyLimit} used (${remaining} remaining)`);
      
      return true;
    } catch (error) {
      console.error('Quota tracking error:', error);
      return true; // Allow request on error
    }
  }

  /**
   * Get current quota status
   */
  getQuotaStatus(): { used: number; limit: number; remaining: number; resetIn: number } {
    try {
      const quotaData = localStorage.getItem(this.QUOTA_KEY);
      const now = Date.now();
      
      if (!quotaData) {
        return { used: 0, limit: API_LIMITS.dailyLimit, remaining: API_LIMITS.dailyLimit, resetIn: 24 };
      }

      const quota: QuotaInfo = JSON.parse(quotaData);
      
      // Check if quota should be reset
      if (now > quota.resetAt) {
        return { used: 0, limit: API_LIMITS.dailyLimit, remaining: API_LIMITS.dailyLimit, resetIn: 24 };
      }

      const resetIn = Math.ceil((quota.resetAt - now) / 3600000);
      
      return {
        used: quota.count,
        limit: API_LIMITS.dailyLimit,
        remaining: Math.max(0, API_LIMITS.dailyLimit - quota.count),
        resetIn,
      };
    } catch (error) {
      return { used: 0, limit: API_LIMITS.dailyLimit, remaining: API_LIMITS.dailyLimit, resetIn: 24 };
    }
  }

  /**
   * Deduplicate simultaneous requests for same category
   */
  deduplicateRequest<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existingRequest = this.requestCache.get(key);
    
    if (existingRequest) {
      console.log(`♻️ Deduplicating request for ${key}`);
      return existingRequest as Promise<T>;
    }

    const request = fetcher().finally(() => {
      // Clean up after request completes
      this.requestCache.delete(key);
    });

    this.requestCache.set(key, request as Promise<NewsArticle[]>);
    return request;
  }

  /**
   * Clear old cache entries to free up space
   */
  clearOldCache(): void {
    try {
      const now = Date.now();
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key?.startsWith(this.CACHE_PREFIX)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const entry: CacheEntry = JSON.parse(cached);
              
              // Remove if expired by more than 24 hours
              if (now > entry.expiresAt + 86400000) {
                keysToRemove.push(key);
              }
            }
          } catch (error) {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log(`🗑️ Cleared ${keysToRemove.length} old cache entries`);
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    try {
      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.CACHE_PREFIX)) {
          keys.push(key);
        }
      }

      keys.forEach(key => localStorage.removeItem(key));
      console.log(`🗑️ Cleared all cache (${keys.length} entries)`);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { [category: string]: { articles: number; age: string } } {
    const stats: { [category: string]: { articles: number; age: string } } = {};
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key?.startsWith(this.CACHE_PREFIX)) {
          const category = key.replace(this.CACHE_PREFIX, '');
          const cached = localStorage.getItem(key);
          
          if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            const ageMinutes = Math.floor((Date.now() - entry.timestamp) / 60000);
            
            stats[category] = {
              articles: entry.articles.length,
              age: ageMinutes < 60 ? `${ageMinutes}min` : `${Math.floor(ageMinutes / 60)}h`,
            };
          }
        }
      }
    } catch (error) {
      console.error('Stats error:', error);
    }

    return stats;
  }
}

export const smartCacheService = new SmartCacheService();
