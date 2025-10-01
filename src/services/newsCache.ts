// Enhanced News Caching Service for Watchman
// Implements pre-fetching and background sync strategies

import { NewsArticle } from '../types/news';

interface CachedNews {
  data: NewsArticle[];
  timestamp: number;
  category: string;
}

class NewsCacheService {
  private cache = new Map<string, CachedNews>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 50; // Max cached categories
  
  // Pre-fetch popular categories on app load
  private readonly PRIORITY_CATEGORIES = [
    'politics', 'health', 'technology', 'business', 
    'sports', 'entertainment', 'world'
  ];

  constructor() {
    // Start background refresh cycle
    this.startBackgroundRefresh();
    // Pre-fetch priority categories
    this.preFetchPriorityCategories();
  }

  /**
   * Get news from cache or fetch if not available
   */
  async getNews(category: string, limit: number = 10): Promise<NewsArticle[]> {
    const cacheKey = `${category}-${limit}`;
    const cached = this.cache.get(cacheKey);
    
    // Return cached data if fresh
    if (cached && this.isCacheFresh(cached)) {
      console.log(`⚡ Cache HIT for ${category} (${cached.data.length} articles)`);
      return cached.data.slice(0, limit);
    }

    // Fetch fresh data
    console.log(`🔄 Cache MISS for ${category}, fetching fresh data...`);
    return this.fetchAndCache(category, limit);
  }

  /**
   * Pre-fetch priority categories in background
   */
  private async preFetchPriorityCategories() {
    console.log('🚀 Pre-fetching priority news categories...');
    
    // Stagger requests to avoid rate limiting
    for (let i = 0; i < this.PRIORITY_CATEGORIES.length; i++) {
      setTimeout(async () => {
        const category = this.PRIORITY_CATEGORIES[i];
        try {
          await this.fetchAndCache(category, 20);
          console.log(`✅ Pre-fetched ${category} news`);
        } catch (error) {
          console.warn(`⚠️ Failed to pre-fetch ${category}:`, error);
        }
      }, i * 500); // 500ms delay between requests
    }
  }

  /**
   * Background refresh cycle
   */
  private startBackgroundRefresh() {
    setInterval(() => {
      this.refreshExpiredCache();
    }, 2 * 60 * 1000); // Check every 2 minutes
  }

  /**
   * Refresh expired cache entries
   */
  private async refreshExpiredCache() {
    console.log('🔄 Background cache refresh started...');
    
    for (const [key, cached] of Array.from(this.cache.entries())) {
      if (!this.isCacheFresh(cached)) {
        const [category] = key.split('-');
        try {
          await this.fetchAndCache(category, 20);
          console.log(`🔄 Refreshed ${category} cache`);
        } catch (error) {
          console.warn(`⚠️ Failed to refresh ${category}:`, error);
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }

  /**
   * Fetch and cache news data
   */
  private async fetchAndCache(category: string, limit: number): Promise<NewsArticle[]> {
    try {
      // Dynamic import to avoid circular dependencies
      const { newsAPI } = await import('./newsAPI');
      const articles = await newsAPI.getNewsByCategory(category, limit);
      
      const cacheKey = `${category}-${limit}`;
      this.cache.set(cacheKey, {
        data: articles,
        timestamp: Date.now(),
        category
      });

      // Cleanup old cache entries if we exceed max size
      this.cleanupCache();
      
      return articles;
    } catch (error) {
      console.error(`❌ Failed to fetch ${category} news:`, error);
      
      // Return stale cache if available
      const staleCache = this.cache.get(`${category}-${limit}`);
      if (staleCache) {
        console.log(`📦 Using stale cache for ${category}`);
        return staleCache.data;
      }
      
      throw error;
    }
  }

  /**
   * Check if cached data is still fresh
   */
  private isCacheFresh(cached: CachedNews): boolean {
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  /**
   * Clean up old cache entries
   */
  private cleanupCache() {
    if (this.cache.size <= this.MAX_CACHE_SIZE) return;
    
    // Remove oldest entries
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toRemove = entries.slice(0, entries.length - this.MAX_CACHE_SIZE);
    toRemove.forEach(([key]) => this.cache.delete(key));
    
    console.log(`🧹 Cleaned up ${toRemove.length} old cache entries`);
  }

  /**
   * Force refresh specific category
   */
  async forceRefresh(category: string, limit: number = 10): Promise<NewsArticle[]> {
    const cacheKey = `${category}-${limit}`;
    this.cache.delete(cacheKey);
    return this.fetchAndCache(category, limit);
  }

  /**
   * Get cache status for debugging
   */
  getCacheStatus() {
    const status = Array.from(this.cache.entries()).map(([key, cached]) => ({
      key,
      category: cached.category,
      articles: cached.data.length,
      age: Math.round((Date.now() - cached.timestamp) / 1000),
      fresh: this.isCacheFresh(cached)
    }));
    
    return {
      totalCached: this.cache.size,
      entries: status
    };
  }
}

// Export singleton instance
export const newsCache = new NewsCacheService();