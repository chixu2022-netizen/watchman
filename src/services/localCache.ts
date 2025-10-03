import { NewsArticle } from '../types/news';

// Simple local cache service (no external database needed)
class LocalCacheService {
  private cache: Map<string, { data: NewsArticle[], timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  // Store articles in local memory
  async storeArticles(category: string, articles: NewsArticle[]): Promise<void> {
    this.cache.set(category, {
      data: articles,
      timestamp: Date.now()
    });
    console.log(`✅ Cached ${articles.length} ${category} articles locally`);
  }

  // Get articles from local cache
  async getArticles(category: string): Promise<NewsArticle[]> {
    const cached = this.cache.get(category);
    
    if (!cached) {
      console.log(`❌ No cached ${category} articles found`);
      return [];
    }

    // Check if cache is still valid (within 30 minutes)
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      console.log(`⚠️ ${category} cache expired, need fresh data`);
      this.cache.delete(category);
      return [];
    }

    console.log(`✅ Using cached ${category} articles (${cached.data.length} items)`);
    return cached.data;
  }

  // Get cache statistics
  getStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    
    this.cache.forEach((value, key) => {
      // Only count non-expired cache
      if (Date.now() - value.timestamp <= this.CACHE_DURATION) {
        stats[key] = value.data.length;
      }
    });

    return stats;
  }

  // Clear all cache
  clearAll(): void {
    this.cache.clear();
    console.log('🗑️ All cache cleared');
  }

  // Clear expired cache
  clearExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((value, key) => {
      if (now - value.timestamp > this.CACHE_DURATION) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
    console.log(`🗑️ Cleared ${keysToDelete.length} expired cache entries`);
  }
}

export const localCacheService = new LocalCacheService();