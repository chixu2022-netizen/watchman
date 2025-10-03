import { createClient } from '@supabase/supabase-js';
import { NewsArticle } from '../types/news';

// Supabase configuration - HARDCODED (working version)
const supabaseUrl = 'https://nzugwnffhegzbtwfjffn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dWd3bmZmaGVnemJ0d2ZqZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTEwNDAsImV4cCI6MjA3NTA2NzA0MH0.uZGrNeoURbL8IzVW2saPpGJq3ovHAv7SvdVrF1NkxMQ';

console.log('� Using HARDCODED credentials (guaranteed to work)');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client created');

export interface DatabaseNewsArticle {
  id: string;
  title: string;
  description: string;
  image_url: string;
  published_at: string;
  url: string;
  source: string;
  category: string;
  created_at: string;
  is_active: boolean;
}

class SupabaseDatabaseService {
  // Generate mock articles when database is not available
  private getMockArticles(category: string, limit: number): NewsArticle[] {
    const mockArticles: NewsArticle[] = [];
    
    for (let i = 1; i <= limit; i++) {
      mockArticles.push({
        id: `mock-${category}-${i}`,
        title: `Mock ${category} news article ${i} - Database not configured`,
        description: `This is a mock ${category} article. Set up Supabase database for real news.`,
        imageUrl: '/ttttttt.jpg',
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
        url: '#',
        source: { name: `Mock ${category} Source` },
        category: category
      });
    }
    
    return mockArticles;
  }

  // Create news table (run once during setup)
  async createNewsTable(): Promise<void> {
    try {
      // Note: Table creation is usually done via Supabase dashboard
      // This is just for reference - you'll create the table in Supabase UI
      console.log('✅ Use Supabase dashboard to create table with this schema:');
      console.log(`
        CREATE TABLE news_articles (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          image_url TEXT,
          published_at TIMESTAMP NOT NULL,
          url TEXT,
          source TEXT,
          category TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          is_active BOOLEAN DEFAULT TRUE
        );
        
        -- Add indexes for better performance
        CREATE INDEX idx_category ON news_articles(category);
        CREATE INDEX idx_published_at ON news_articles(published_at);
        CREATE INDEX idx_is_active ON news_articles(is_active);
      `);
    } catch (error) {
      console.error('❌ Error with table setup:', error);
    }
  }

  // Insert multiple news articles
  async insertNewsArticles(articles: NewsArticle[]): Promise<void> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured. Set up database credentials in .env.local');
      return;
    }
    
    try {
      const supabaseArticles = articles.map(article => ({
        id: article.id,
        title: article.title,
        description: article.description || '',
        image_url: article.imageUrl || '/ttttttt.jpg',
        published_at: article.publishedAt,
        url: article.url,
        source: article.source?.name || 'Unknown',
        category: article.category,
        is_active: true
      }));

      const { data, error } = await supabase
        .from('news_articles')
        .upsert(supabaseArticles, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        throw error;
      }

      console.log(`✅ Inserted ${articles.length} articles successfully`);
    } catch (error) {
      console.error('❌ Error inserting articles:', error);
      throw error;
    }
  }

  // Get news articles by category
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured. Using mock data.');
      return this.getMockArticles(category, limit);
    }
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return (data || []).map((row: DatabaseNewsArticle) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.image_url || '/ttttttt.jpg',
        publishedAt: row.published_at,
        url: row.url,
        source: { name: row.source },
        category: row.category
      }));
    } catch (error) {
      console.error(`❌ Error fetching ${category} news:`, error);
      throw error;
    }
  }

  // Get latest news (all categories)
  async getLatestNews(limit: number = 50): Promise<NewsArticle[]> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured. Using mock data.');
      return this.getMockArticles('general', limit);
    }
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return (data || []).map((row: DatabaseNewsArticle) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.image_url || '/ttttttt.jpg',
        publishedAt: row.published_at,
        url: row.url,
        source: { name: row.source },
        category: row.category
      }));
    } catch (error) {
      console.error('❌ Error fetching latest news:', error);
      throw error;
    }
  }

  // Clean old articles (older than specified days)
  async cleanOldArticles(daysOld: number = 7): Promise<void> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured. Cannot clean old articles.');
      return;
    }
    
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { error } = await supabase
        .from('news_articles')
        .update({ is_active: false })
        .lt('published_at', sevenDaysAgo.toISOString());

      if (error) {
        throw error;
      }

      console.log('✅ Cleaned old articles successfully');
    } catch (error) {
      console.error('❌ Error cleaning old articles:', error);
    }
  }

  // Get article count by category
  async getArticleStats(): Promise<{ [key: string]: number }> {
    if (!supabase) {
      return {};
    }
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('category')
        .eq('is_active', true);

      if (error) {
        throw error;
      }

      const stats: { [key: string]: number } = {};
      (data || []).forEach((row: any) => {
        stats[row.category] = (stats[row.category] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('❌ Error fetching article stats:', error);
      return {};
    }
  }

  // Test database connection
  async testConnection(): Promise<boolean> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured. Cannot test connection.');
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Database connection failed:', error);
        return false;
      }

      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      return false;
    }
  }
}

export const supabaseDatabaseService = new SupabaseDatabaseService();