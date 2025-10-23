import { NewsArticle } from '../types/news';
import { localCacheService } from './localCache';
import { ENV, API_CONFIG } from '../config/environment';

// NewsData.io API configuration (secure)
const NEWS_API_KEY = ENV.newsDataApiKey;
const NEWS_API_BASE_URL = API_CONFIG.newsDataBaseUrl;

// Validate API key
if (!NEWS_API_KEY && ENV.isDevelopment) {
  console.warn('⚠️ NewsData.io API key not configured. Using mock data.');
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}

interface NewsDataArticle {
  article_id: string;
  title: string;
  description?: string;
  image_url?: string;
  pubDate: string;
  link: string;
  source_id: string;
  source_name?: string;
  category: string[];
}

// Mock articles for fallback
const getMockArticles = (category: string): NewsArticle[] => [
  {
    id: `mock-${category}-1`,
    title: `Breaking: Latest ${category} developments worldwide`,
    description: `Stay updated with the most recent ${category} news and analysis from trusted sources`,
    imageUrl: '/wm01.jpeg',
    publishedAt: new Date().toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Today` },
    category: category
  },
  {
    id: `mock-${category}-2`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} industry sees major changes`,
    description: `Comprehensive coverage of trending ${category} stories and their impact`,
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Weekly` },
    category: category
  },
  {
    id: `mock-${category}-3`,
    title: `Expert analysis: ${category} trends for 2025`,
    description: `In-depth analysis and future predictions from industry experts`,
    imageUrl: '/placeholders/placeholder1.svg',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Reports` },
    category: category
  },
  {
    id: `mock-${category}-4`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} sector attracts global attention`,
    description: `International focus on ${category} developments and their global implications`,
    imageUrl: '/placeholders/placeholder2.svg',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    url: '#',
    source: { name: `Global ${category.charAt(0).toUpperCase() + category.slice(1)}` },
    category: category
  }
];

class SimpleNewsService {
  // Transform NewsData.io article to our format
  private transformArticle(article: NewsDataArticle, category: string): NewsArticle {
    return {
      id: article.article_id,
      title: article.title,
      description: article.description || `Latest ${category} news update`,
      imageUrl: article.image_url || '/ttttttt.jpg',
      publishedAt: article.pubDate,
      url: article.link,
      source: { 
        name: article.source_name || article.source_id || 'News Source' 
      },
      category: category
    };
  }

  // Fetch fresh news from API
  private async fetchFromAPI(category: string): Promise<NewsArticle[]> {
    try {
      const url = `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&category=${category}&size=15&language=en`;
      
      console.log(`📡 Fetching fresh ${category} news from API...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: NewsDataResponse = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(`API returned error status: ${data.status}`);
      }

      const articles = data.results.map(article => 
        this.transformArticle(article, category)
      );

      console.log(`✅ Fetched ${articles.length} fresh ${category} articles`);
      return articles;

    } catch (error) {
      console.error(`❌ API fetch failed for ${category}:`, error);
      return [];
    }
  }

  // Main method: Get news with local caching (super fast after first load)
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      console.log(`⚡ SimpleNewsService: Getting ${category} news...`);
      
      // Step 1: Check local cache first (instant)
      let articles = await localCacheService.getArticles(category);
      
      if (articles.length > 0) {
        console.log(`✅ Using cached ${category} articles`);
        return articles.slice(0, limit);
      }

      // Step 2: Fetch fresh from API
      articles = await this.fetchFromAPI(category);
      
      if (articles.length > 0) {
        // Cache for next time
        await localCacheService.storeArticles(category, articles);
        console.log(`✅ Fresh ${category} articles fetched and cached`);
        return articles.slice(0, limit);
      }

      // Step 3: Fallback to mock data
      console.log(`⚠️ Using mock ${category} data`);
      const mockArticles = getMockArticles(category);
      await localCacheService.storeArticles(category, mockArticles);
      return mockArticles;

    } catch (error) {
      console.error(`❌ Error in SimpleNewsService for ${category}:`, error);
      return getMockArticles(category);
    }
  }

  // Refresh specific category
  async refreshCategory(category: string): Promise<NewsArticle[]> {
    try {
      console.log(`🔄 Force refreshing ${category}...`);
      const articles = await this.fetchFromAPI(category);
      
      if (articles.length > 0) {
        await localCacheService.storeArticles(category, articles);
        return articles;
      }
      
      return getMockArticles(category);
    } catch (error) {
      console.error(`❌ Error refreshing ${category}:`, error);
      return getMockArticles(category);
    }
  }

  // Get cache statistics
  getStats(): { [key: string]: number } {
    return localCacheService.getStats();
  }

  // Clear cache
  clearCache(): void {
    localCacheService.clearAll();
  }

  // Pre-load all categories (run this on app start)
  async preloadAllCategories(): Promise<void> {
    const categories = ['politics', 'health', 'technology', 'business', 'sports', 'entertainment'];
    
    console.log('🚀 Pre-loading all news categories...');
    
    for (const category of categories) {
      try {
        await this.getNewsByCategory(category, 15);
        // Small delay to respect API limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Failed to preload ${category}:`, error);
      }
    }
    
    console.log('✅ All categories preloaded!');
    console.log('📊 Cache stats:', this.getStats());
  }
}

export const simpleNewsService = new SimpleNewsService();