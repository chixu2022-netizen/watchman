import { NewsArticle } from '../types/news';
import { supabaseDatabaseService } from './supabaseDatabase';
import { smartCacheService } from './smartCache';
import { ENV, API_CONFIG } from '../config/environment';

/**
 * Optimized News Service for free API tier
 * Priority: Cache > Database > API > Fallback
 */

const NEWS_API_KEY = ENV.newsDataApiKey;
const NEWS_API_BASE_URL = API_CONFIG.newsDataBaseUrl;

interface NewsDataResponse {
  status: string;
  totalResults?: number;
  results: Array<{
    article_id: string;
    title: string;
    description?: string;
    image_url?: string;
    pubDate: string;
    link: string;
    source_name?: string;
    source_id?: string;
  }>;
}

class OptimizedNewsService {
  /**
   * Transform API article to our format
   */
  private transformArticle(article: any, category: string): NewsArticle {
    return {
      id: article.article_id || `${Date.now()}-${Math.random()}`,
      title: article.title || 'Breaking News',
      description: article.description || `Latest ${category} news`,
      imageUrl: article.image_url || '/ttttttt.jpg',
      publishedAt: article.pubDate || new Date().toISOString(),
      url: article.link || '#',
      source: { name: article.source_name || article.source_id || 'News Source' },
      category,
    };
  }

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
      imageUrl: '/ttttttt.jpg',
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      url: '#',
      source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Today` },
      category,
    }));
  }

  /**
   * Fetch from API (with quota check)
   */
  private async fetchFromAPI(category: string, limit: number): Promise<NewsArticle[]> {
    // Check API quota first
    if (!smartCacheService.trackAPIRequest()) {
      console.warn(`⚠️ API quota exceeded for ${category}, using fallback`);
      return [];
    }

    try {
      // Special handling for crypto - use search query instead of category
      let url: string;
      if (category === 'crypto') {
        url = `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&q=cryptocurrency OR bitcoin OR ethereum OR blockchain&size=${limit}&language=en`;
      } else {
        url = `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&category=${category}&size=${limit}&language=en`;
      }
      
      console.log(`📡 Fetching fresh ${category} news from API...`);
      
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: NewsDataResponse = await response.json();

      if (data.status !== 'success' || !data.results?.length) {
        throw new Error('No results from API');
      }

      const articles = data.results.map(article => 
        this.transformArticle(article, category)
      );

      console.log(`✅ Fetched ${articles.length} fresh ${category} articles from API`);
      return articles;
    } catch (error) {
      console.error(`❌ API fetch failed for ${category}:`, error);
      return [];
    }
  }

  /**
   * Main method: Get news with smart caching strategy
   * Priority: Cache > Database > API > Fallback
   */
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      console.log(`⚡ OptimizedNewsService: Getting ${category} news...`);

      // STEP 1: Check cache first (instant)
      const cachedArticles = smartCacheService.getCachedArticles(category);
      if (cachedArticles && cachedArticles.length > 0) {
        return cachedArticles.slice(0, limit);
      }

      // STEP 2: Try database (fast)
      try {
        const dbArticles = await supabaseDatabaseService.getNewsByCategory(category, limit);
        if (dbArticles && dbArticles.length > 0) {
          // Cache database results for next time
          smartCacheService.setCachedArticles(category, dbArticles);
          console.log(`✅ Retrieved ${dbArticles.length} ${category} articles from database`);
          return dbArticles;
        }
      } catch (dbError) {
        console.warn(`⚠️ Database fetch failed for ${category}, trying API`);
      }

      // STEP 3: Fetch from API (with quota check)
      const apiArticles = await this.fetchFromAPI(category, limit);
      
      if (apiArticles.length > 0) {
        // Cache API results
        smartCacheService.setCachedArticles(category, apiArticles);
        
        // Store in database for future use (non-blocking)
        this.storeInDatabase(category, apiArticles).catch(err => 
          console.warn('Background database store failed:', err)
        );
        
        return apiArticles;
      }

      // STEP 4: Try stale cache as fallback
      const staleCache = smartCacheService.getStaleCache(category);
      if (staleCache && staleCache.length > 0) {
        console.log(`⚠️ Using stale cache for ${category}`);
        return staleCache.slice(0, limit);
      }

      // STEP 5: Final fallback - generate mock articles
      console.log(`⚠️ Using fallback articles for ${category}`);
      const fallbackArticles = this.getFallbackArticles(category, limit);
      smartCacheService.setCachedArticles(category, fallbackArticles);
      return fallbackArticles;

    } catch (error) {
      console.error(`❌ Error in OptimizedNewsService for ${category}:`, error);
      return this.getFallbackArticles(category, limit);
    }
  }

  /**
   * Store articles in database (non-blocking)
   */
  private async storeInDatabase(category: string, articles: NewsArticle[]): Promise<void> {
    try {
      await supabaseDatabaseService.insertNewsArticles(articles);
      console.log(`💾 Stored ${articles.length} ${category} articles in database`);
    } catch (error) {
      console.warn('Database storage failed:', error);
    }
  }

  /**
   * Preload critical categories (run on app startup)
   */
  async preloadCriticalCategories(): Promise<void> {
    const criticalCategories = ['politics', 'technology', 'business', 'health'];
    
    console.log('🚀 Preloading critical categories...');
    
    for (const category of criticalCategories) {
      try {
        await this.getNewsByCategory(category, 10);
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to preload ${category}:`, error);
      }
    }
    
    console.log('✅ Critical categories preloaded!');
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
   * Refresh specific category (force API fetch)
   */
  async refreshCategory(category: string): Promise<NewsArticle[]> {
    console.log(`🔄 Force refreshing ${category}...`);
    
    // Clear cache first
    smartCacheService.clearAllCache();
    
    // Fetch fresh
    return this.getNewsByCategory(category, 20);
  }
}

export const optimizedNewsService = new OptimizedNewsService();
