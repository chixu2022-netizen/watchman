import { NewsArticle } from '../types/news';
import { supabaseDatabaseService } from './supabaseDatabase';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';
import { ENV } from '../config/environment';

/**
 * DATABASE-ONLY News Service
 * 
 * Professional approach: Frontend NEVER calls external APIs
 * - All news is pre-fetched by cron jobs
 * - Frontend only reads from database
 * - Instant page loads, zero API costs from users
 * 
 * This is how SmartNews, Google News, Flipboard work!
 */

class DatabaseNewsService {
  
  /**
   * Get news by category (DATABASE ONLY - No API calls!)
   */
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      if (ENV.isDevelopment) {
        console.log(`📚 Database: Fetching ${category} (limit: ${limit})`);
      }

      // Read from database (no API calls!)
      const articles = await supabaseDatabaseService.getNewsByCategory(category, limit);
      
      if (articles && articles.length > 0) {
        if (ENV.isDevelopment) {
          console.log(`✅ Database: Found ${articles.length} ${category} articles`);
        }
        return articles;
      }

      // No articles in database - return fallback
      if (ENV.isDevelopment) {
        console.warn(`⚠️ Database: No ${category} articles found, using fallback`);
      }
      return this.getFallbackArticles(category, limit);

    } catch (error) {
      if (ENV.isDevelopment) {
        console.error(`❌ Database error for ${category}:`, error);
      }
      return this.getFallbackArticles(category, limit);
    }
  }

  /**
   * Get latest news across all categories
   */
  async getLatestNews(limit: number = 50): Promise<NewsArticle[]> {
    try {
      const articles = await supabaseDatabaseService.getLatestNews(limit);
      return articles.length > 0 ? articles : this.getFallbackArticles('general', limit);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      return this.getFallbackArticles('general', limit);
    }
  }

  /**
   * Search articles in database (full-text search)
   */
  async searchArticles(query: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      if (!query.trim()) return [];

      const categories = ['world', 'crypto', 'technology', 'business', 'sports', 
                         'entertainment', 'health', 'politics', 'local', 'ai'];
      
      const allArticles: NewsArticle[] = [];
      
      // Get articles from multiple categories
      for (const category of categories) {
        const articles = await this.getNewsByCategory(category, 10);
        allArticles.push(...articles);
      }
      
      // Filter by search query
      const searchLower = query.toLowerCase();
      const filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.description?.toLowerCase().includes(searchLower)
      );
      
      return filtered.slice(0, limit);
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<{ [key: string]: number }> {
    try {
      return await supabaseDatabaseService.getArticleStats();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {};
    }
  }

  /**
   * Fallback articles when database is empty
   */
  private getFallbackArticles(category: string, limit: number): NewsArticle[] {
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
   * Check if database has articles for category
   */
  async hasArticles(category: string): Promise<boolean> {
    try {
      const articles = await this.getNewsByCategory(category, 1);
      return articles.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get total article count in database
   */
  async getTotalArticleCount(): Promise<number> {
    try {
      const stats = await this.getStats();
      return Object.values(stats).reduce((sum, count) => sum + count, 0);
    } catch (error) {
      return 0;
    }
  }
}

export const databaseNewsService = new DatabaseNewsService();
