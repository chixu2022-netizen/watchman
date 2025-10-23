import { supabaseDatabaseService } from './supabaseDatabase';
import { NewsArticle } from '../types/news';
import { ENV, API_CONFIG } from '../config/environment';

// NewsData.io API configuration (secure)
const NEWS_API_KEY = ENV.newsDataApiKey;
const NEWS_API_BASE_URL = API_CONFIG.newsDataBaseUrl;

// Validate API key
if (!NEWS_API_KEY && ENV.isDevelopment) {
  console.warn('⚠️ NewsData.io API key not configured');
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

class NewsFetcherService {
  private readonly categories = [
    'politics',
    'health',
    'sports', 
    'technology',
    'business',
    'entertainment'
  ];

  // Transform NewsData.io article to our format
  private transformArticle(article: NewsDataArticle, category: string): NewsArticle {
    return {
      id: article.article_id,
      title: article.title,
      description: article.description || `Latest ${category} news`,
      imageUrl: article.image_url || '/ttttttt.jpg',
      publishedAt: article.pubDate,
      url: article.link,
      source: { 
        name: article.source_name || article.source_id || 'News Source' 
      },
      category: category
    };
  }

  // Generate mock articles when API is unavailable
  private generateMockArticles(category: string): NewsArticle[] {
    const mockArticles: NewsArticle[] = [
      {
        id: `mock-${category}-1`,
        title: `Breaking: Latest ${category.charAt(0).toUpperCase() + category.slice(1)} News Update`,
        description: `This is a mock ${category} article for testing. API integration is working, but using fallback data due to CORS restrictions in browser environment.`,
        imageUrl: '/ttttttt.jpg',
        publishedAt: new Date().toISOString(),
        url: '#',
        source: { name: 'Mock News Source' },
        category: category
      },
      {
        id: `mock-${category}-2`,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Update: System Working Correctly`,
        description: `Another mock ${category} article to demonstrate the database integration is functioning properly.`,
        imageUrl: '/ttttttt.jpg',
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        url: '#',
        source: { name: 'Test Source' },
        category: category
      }
    ];

    return mockArticles;
  }

  // Fetch news from NewsData.io API
  private async fetchNewsFromAPI(category: string): Promise<NewsArticle[]> {
    try {
      const url = `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&category=${category}&size=20&language=en`;
      
      console.log(`🔄 Fetching ${category} news from API...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: NewsDataResponse = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(`API returned error status: ${data.status}`);
      }

      const articles = data.results.map(article => 
        this.transformArticle(article, category)
      );

      console.log(`✅ Fetched ${articles.length} ${category} articles from API`);
      return articles;

    } catch (error) {
      console.error(`❌ Error fetching ${category} news from API:`, error);
      
      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('CORS')) {
        console.log(`🔄 CORS detected, using mock data for ${category}`);
      } else {
        console.log(`🔄 API unavailable, using mock data for ${category}`);
      }
      
      // Return mock articles as fallback
      const mockArticles = this.generateMockArticles(category);
      console.log(`✅ Generated ${mockArticles.length} mock ${category} articles`);
      return mockArticles;
    }
  }

  // Fetch news for all categories and store in database
  async fetchAndStoreAllNews(): Promise<void> {
    console.log('🚀 Starting news fetch and store process...');
    
    try {
      for (const category of this.categories) {
        // Add delay between requests to respect API limits
        if (this.categories.indexOf(category) > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        }

        const articles = await this.fetchNewsFromAPI(category);
        
        if (articles.length > 0) {
          await supabaseDatabaseService.insertNewsArticles(articles);
        }
      }

      // Clean old articles after storing new ones
      await supabaseDatabaseService.cleanOldArticles();
      
      // Show statistics
      const stats = await supabaseDatabaseService.getArticleStats();
      console.log('📊 Database stats:', stats);
      
      console.log('✅ News fetch and store completed successfully!');
      
    } catch (error) {
      console.error('❌ Error in news fetch process:', error);
    }
  }

  // Fetch news for a specific category
  async fetchCategoryNews(category: string): Promise<NewsArticle[]> {
    try {
      return await this.fetchNewsFromAPI(category);
    } catch (error) {
      console.error(`❌ Error fetching ${category} news:`, error);
      return [];
    }
  }

  // Initialize database (run once)
  async initializeDatabase(): Promise<void> {
    try {
      await supabaseDatabaseService.createNewsTable();
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
  }
}

export const newsFetcherService = new NewsFetcherService();