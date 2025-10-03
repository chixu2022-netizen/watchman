import { NewsArticle } from '../types/news';
import { supabaseDatabaseService } from './supabaseDatabase';
import { newsFetcherService } from './newsFetcher';

// Mock articles as fallback
const getMockArticles = (category: string): NewsArticle[] => [
  {
    id: `mock-${category}-1`,
    title: `Breaking: Major ${category} development announced`,
    description: `Latest ${category} news and updates from around the world`,
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date().toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} News` },
    category: category
  },
  {
    id: `mock-${category}-2`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} industry sees significant changes`,
    description: `Comprehensive coverage of ${category} developments and trends`,
    imageUrl: '/wm01.jpeg',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Today` },
    category: category
  },
  {
    id: `mock-${category}-3`,
    title: `Expert analysis: ${category} outlook for 2025`,
    description: `In-depth analysis of current ${category} trends and future predictions`,
    imageUrl: '/placeholders/placeholder1.svg',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: '#',
    source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Weekly` },
    category: category
  }
];

class FastNewsService {
  // Get news with database-first approach (1-5 second loading)
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      console.log(`⚡ FastNewsService: Fetching ${category} news...`);
      
      // Step 1: Try database first (super fast)
      let articles = await supabaseDatabaseService.getNewsByCategory(category, limit);
      
      if (articles.length > 0) {
        console.log(`✅ Found ${articles.length} ${category} articles in database`);
        return articles;
      }

      // Step 2: If database is empty, try to fetch fresh data
      console.log(`📡 Database empty, fetching fresh ${category} news...`);
      const freshArticles = await newsFetcherService.fetchCategoryNews(category);
      
      if (freshArticles.length > 0) {
        // Store in database for next time
        await supabaseDatabaseService.insertNewsArticles(freshArticles);
        console.log(`✅ Fetched and stored ${freshArticles.length} fresh ${category} articles`);
        return freshArticles.slice(0, limit);
      }

      // Step 3: Fallback to mock data
      console.log(`⚠️ API failed, using mock ${category} data`);
      return getMockArticles(category);

    } catch (error) {
      console.error(`❌ Error in FastNewsService for ${category}:`, error);
      return getMockArticles(category);
    }
  }

  // Initialize the service (setup database)
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing FastNewsService...');
      await newsFetcherService.initializeDatabase();
      console.log('✅ FastNewsService initialized');
    } catch (error) {
      console.error('❌ FastNewsService initialization failed:', error);
    }
  }

  // Refresh all news (run this periodically)
  async refreshAllNews(): Promise<void> {
    try {
      console.log('🔄 Refreshing all news...');
      await newsFetcherService.fetchAndStoreAllNews();
      console.log('✅ All news refreshed');
    } catch (error) {
      console.error('❌ Error refreshing news:', error);
    }
  }

  // Get database statistics
  async getStats(): Promise<{ [key: string]: number }> {
    try {
      return await supabaseDatabaseService.getArticleStats();
    } catch (error) {
      console.error('❌ Error getting stats:', error);
      return {};
    }
  }
}

export const fastNewsService = new FastNewsService();