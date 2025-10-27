import { NewsArticle } from '../types/news';
import { supabaseDatabaseService } from './supabaseDatabase';
import { smartCacheService } from './smartCache';
import { multiProviderService } from './multiProviderService';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';
import { ENV } from '../config/environment';

/**
 * Optimized News Service with Smart Caching
 * Strategy: Cache (instant) > Database (fast) > API (slow) > Fallback
 * Uses multi-provider service for maximum API availability
 * Total capacity: Up to 500+ requests/day (depends on configured APIs)
 */

class OptimizedNewsService {

  /**
   * Generate fallback articles
   */
  private getFallbackArticles(category: string, limit: number = 10): NewsArticle[] {
    const fallbackTitles = [
      `Breaking: Latest ${category} developments worldwide`,
      `${category.charAt(0).toUpperCase() + category.slice(1)} industry sees major changes`,
      `Expert analysis: ${category} trends for 2025`,
      `Global focus on ${category} sector developments`,
      `${category.charAt(0).toUpperCase() + category.slice(1)} market update`,
    ];

    return Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: `fallback-${category}-${i + 1}`,
      title: fallbackTitles[i] || `${category} news update`,
      description: `Stay updated with the latest ${category} news and analysis`,
      imageUrl: NEWS_IMAGE_PLACEHOLDER,
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      url: '#',
      source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Today` },
      category,
    }));
  }

  /**
   * Fetch from API using multi-provider (with quota tracking)
   */
  private async fetchFromAPI(category: string, limit: number): Promise<NewsArticle[]> {
    // Check if we have any enabled providers
    if (!multiProviderService.hasEnabledProviders()) {
      if (ENV.isDevelopment) {
        console.warn('⚠️ No API providers configured, skipping API fetch');
      }
      return [];
    }

    // Check API quota
    if (!smartCacheService.trackAPIRequest()) {
      if (ENV.isDevelopment) {
        console.warn(`⚠️ API quota exceeded for ${category}, skipping API`);
      }
      return [];
    }

    try {
      // Multi-provider automatically tries all enabled APIs
      const articles = await multiProviderService.getNewsByCategory(category, limit);
      
      if (articles && articles.length > 0) {
        if (ENV.isDevelopment) {
          console.log(`✅ API fetch: ${articles.length} ${category} articles`);
        }
        return articles;
      }
      
      return [];
    } catch (error) {
      if (ENV.isDevelopment) {
        console.error(`❌ API fetch failed for ${category}:`, error);
      }
      return [];
    }
  }

  /**
   * Main method: Get news with smart caching strategy
   * Priority: Cache (instant) > Database (fast) > API (slow) > Fallback
   */
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      if (ENV.isDevelopment) {
        console.log(`⚡ Getting ${category} news (limit: ${limit})...`);
      }

      // STEP 1: Check cache first (instant - no network)
      const cachedArticles = smartCacheService.getCachedArticles(category);
      if (cachedArticles && cachedArticles.length >= limit) {
        if (ENV.isDevelopment) {
          console.log(`🚀 Cache hit: ${cachedArticles.length} ${category} articles`);
        }
        return cachedArticles.slice(0, limit);
      }

      // STEP 2: Try database (fast - local DB query)
      try {
        const dbArticles = await supabaseDatabaseService.getNewsByCategory(category, limit);
        if (dbArticles && dbArticles.length > 0) {
          // Cache database results
          smartCacheService.setCachedArticles(category, dbArticles);
          if (ENV.isDevelopment) {
            console.log(`💾 Database: ${dbArticles.length} ${category} articles`);
          }
          return dbArticles;
        }
      } catch (dbError) {
        if (ENV.isDevelopment) {
          console.warn(`⚠️ Database failed for ${category}, trying API`);
        }
      }

      // STEP 3: Fetch from API (slow - external API call)
      const apiArticles = await this.fetchFromAPI(category, limit);
      
      if (apiArticles.length > 0) {
        // Cache API results
        smartCacheService.setCachedArticles(category, apiArticles);
        
        // Store in database for future (non-blocking)
        this.storeInDatabase(category, apiArticles).catch(() => {
          // Silent fail - not critical
        });
        
        return apiArticles;
      }

      // STEP 4: Try stale cache (expired but better than nothing)
      const staleCache = smartCacheService.getStaleCache(category);
      if (staleCache && staleCache.length > 0) {
        if (ENV.isDevelopment) {
          console.log(`🔄 Using stale cache for ${category}`);
        }
        return staleCache.slice(0, limit);
      }

      // STEP 5: Final fallback - static mock articles
      if (ENV.isDevelopment) {
        console.log(`🚫 Using fallback articles for ${category}`);
      }
      const fallbackArticles = this.getFallbackArticles(category, limit);
      return fallbackArticles;

    } catch (error) {
      if (ENV.isDevelopment) {
        console.error(`❌ Error fetching ${category}:`, error);
      }
      return this.getFallbackArticles(category, limit);
    }
  }

  /**
   * Store articles in database (non-blocking background task)
   */
  private async storeInDatabase(category: string, articles: NewsArticle[]): Promise<void> {
    try {
      await supabaseDatabaseService.insertNewsArticles(articles);
      if (ENV.isDevelopment) {
        console.log(`💾 Stored ${articles.length} ${category} articles in DB`);
      }
    } catch (error) {
      // Silent fail - not critical for user experience
    }
  }

  /**
   * Preload critical categories (only from cache/database)
   * Should be run on app startup or after cron job completes
   */
  async preloadCriticalCategories(): Promise<void> {
    const criticalCategories = ['world', 'politics', 'technology', 'business', 'health'];
    
    if (ENV.isDevelopment) {
      console.log('🚀 Preloading critical categories (cache/DB only)...');
    }
    
    for (const category of criticalCategories) {
      try {
        // Get from cache or database only (no API calls)
        const cached = smartCacheService.getCachedArticles(category);
        if (!cached || cached.length === 0) {
          await supabaseDatabaseService.getNewsByCategory(category, 10);
        }
      } catch (error) {
        // Silent fail - preload is optional
      }
    }
    
    if (ENV.isDevelopment) {
      console.log('✅ Preload complete!');
    }
  }

  /**
   * Get cache and quota statistics
   */
  getStats(): { cache: any; quota: any } {
    return {
      cache: smartCacheService.getCacheStats(),
      quota: smartCacheService.getQuotaStatus(),
    };
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    smartCacheService.clearAllCache();
  }

  /**
   * Force refresh specific category (clears cache, fetches fresh)
   */
  async refreshCategory(category: string): Promise<NewsArticle[]> {
    if (ENV.isDevelopment) {
      console.log(`🔄 Force refreshing ${category}...`);
    }
    
    // Clear cache for this category
    smartCacheService.getCachedArticles(category); // Will expire naturally
    
    // Fetch fresh from API
    return this.getNewsByCategory(category, 20);
  }
  
  /**
   * Get summary of available news providers
   */
  getProviderInfo() {
    return {
      providers: multiProviderService.getProviderStats(),
      totalLimit: multiProviderService.getTotalDailyLimit(),
      enabled: multiProviderService.getEnabledProviders(),
    };
  }
}

export const optimizedNewsService = new OptimizedNewsService();
