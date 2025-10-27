import { createClient } from '@supabase/supabase-js';
import { NewsArticle } from '../types/news';
import { ENV } from '../config/environment';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';

// Supabase configuration - Using environment variables (SECURE)
const supabaseUrl = ENV.supabaseUrl;
const supabaseKey = ENV.supabaseAnonKey;

// Validate configuration
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase configuration missing! Check your .env file.');
  console.error('Required: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
}

// Create Supabase client (only if credentials exist)
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

if (supabase) {
  console.log('✅ Supabase client created successfully');
} else {
  console.warn('⚠️ Supabase client not created - check environment variables');
}

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
  async createNewsTable(): Promise<void> {
    console.log('ℹ️ Table creation should be done via Supabase dashboard');
    console.log('See database-setup.sql for the schema');
  }

  private getMockArticles(category: string, limit: number): NewsArticle[] {
    const mockArticles: NewsArticle[] = [];
    
    for (let i = 1; i <= limit; i++) {
      mockArticles.push({
        id: `mock-${category}-${i}`,
        title: `Mock ${category} news article ${i}`,
        description: `This is a mock ${category} article.`,
        imageUrl: NEWS_IMAGE_PLACEHOLDER,
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
        url: '#',
        source: { name: `Mock ${category} Source` },
        category: category
      });
    }
    
    return mockArticles;
  }

  async insertNewsArticles(articles: NewsArticle[]): Promise<void> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured');
      return;
    }
    
    try {
      const supabaseArticles = articles.map(article => ({
        id: article.id,
        title: article.title,
        description: article.description || '',
        image_url: article.imageUrl || NEWS_IMAGE_PLACEHOLDER,
        published_at: article.publishedAt,
        url: article.url,
        source: article.source?.name || 'Unknown',
        category: article.category,
        is_active: true
      }));

      const { error } = await supabase
        .from('news_articles')
        .upsert(supabaseArticles, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      console.log(`✅ Inserted ${articles.length} articles`);
    } catch (error) {
      console.error('❌ Error inserting articles:', error);
      throw error;
    }
  }

  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    if (!supabase) {
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

      if (error) throw error;

      return (data || []).map((row: DatabaseNewsArticle) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.image_url || NEWS_IMAGE_PLACEHOLDER,
        publishedAt: row.published_at,
        url: row.url,
        source: { name: row.source },
        category: row.category
      }));
    } catch (error) {
      console.error(`❌ Error fetching ${category}:`, error);
      throw error;
    }
  }

  async getLatestNews(limit: number = 50): Promise<NewsArticle[]> {
    if (!supabase) {
      return this.getMockArticles('general', limit);
    }
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || []).map((row: DatabaseNewsArticle) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.image_url || NEWS_IMAGE_PLACEHOLDER,
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

  async cleanOldArticles(daysOld: number = 7): Promise<void> {
    if (!supabase) return;
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { error } = await supabase
        .from('news_articles')
        .update({ is_active: false })
        .lt('published_at', cutoffDate.toISOString());

      if (error) throw error;

      console.log('✅ Cleaned old articles');
    } catch (error) {
      console.error('❌ Error cleaning:', error);
    }
  }

  async getArticleStats(): Promise<{ [key: string]: number }> {
    if (!supabase) return {};
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('category')
        .eq('is_active', true);

      if (error) throw error;

      const stats: { [key: string]: number } = {};
      (data || []).forEach((row: any) => {
        stats[row.category] = (stats[row.category] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      return {};
    }
  }

  async testConnection(): Promise<boolean> {
    if (!supabase) return false;
    
    try {
      const { error } = await supabase
        .from('news_articles')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Connection failed:', error);
        return false;
      }

      console.log('✅ Database connected');
      return true;
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
  }
}

export const supabaseDatabaseService = new SupabaseDatabaseService();
