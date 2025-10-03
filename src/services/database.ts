import { connect } from '@planetscale/database';
import { NewsArticle } from '../types/news';

// Database configuration
const config = {
  host: process.env.REACT_APP_DATABASE_HOST,
  username: process.env.REACT_APP_DATABASE_USERNAME,
  password: process.env.REACT_APP_DATABASE_PASSWORD,
};

const conn = connect(config);

export interface DatabaseNewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
  source: string;
  category: string;
  createdAt: string;
  isActive: boolean;
}

class DatabaseService {
  // Create news table (run once during setup)
  async createNewsTable(): Promise<void> {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS news_articles (
          id VARCHAR(255) PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          imageUrl TEXT,
          publishedAt DATETIME NOT NULL,
          url TEXT,
          source VARCHAR(255),
          category VARCHAR(50) NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          isActive BOOLEAN DEFAULT TRUE,
          INDEX idx_category (category),
          INDEX idx_publishedAt (publishedAt),
          INDEX idx_isActive (isActive)
        )
      `;
      
      await conn.execute(createTableQuery);
      console.log('✅ News table created successfully');
    } catch (error) {
      console.error('❌ Error creating news table:', error);
      throw error;
    }
  }

  // Insert multiple news articles
  async insertNewsArticles(articles: NewsArticle[]): Promise<void> {
    try {
      for (const article of articles) {
        const insertQuery = `
          INSERT INTO news_articles (id, title, description, imageUrl, publishedAt, url, source, category)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          description = VALUES(description),
          imageUrl = VALUES(imageUrl),
          publishedAt = VALUES(publishedAt),
          url = VALUES(url),
          source = VALUES(source),
          isActive = TRUE
        `;

        await conn.execute(insertQuery, [
          article.id,
          article.title,
          article.description || '',
          article.imageUrl || '/ttttttt.jpg',
          new Date(article.publishedAt).toISOString().slice(0, 19).replace('T', ' '),
          article.url,
          article.source?.name || 'Unknown',
          article.category
        ]);
      }
      
      console.log(`✅ Inserted ${articles.length} articles successfully`);
    } catch (error) {
      console.error('❌ Error inserting articles:', error);
      throw error;
    }
  }

  // Get news articles by category
  async getNewsByCategory(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      const query = `
        SELECT id, title, description, imageUrl, publishedAt, url, source, category
        FROM news_articles 
        WHERE category = ? AND isActive = TRUE
        ORDER BY publishedAt DESC 
        LIMIT ?
      `;

      const results = await conn.execute(query, [category, limit]);
      
      return results.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.imageUrl || '/ttttttt.jpg',
        publishedAt: row.publishedAt,
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
    try {
      const query = `
        SELECT id, title, description, imageUrl, publishedAt, url, source, category
        FROM news_articles 
        WHERE isActive = TRUE
        ORDER BY publishedAt DESC 
        LIMIT ?
      `;

      const results = await conn.execute(query, [limit]);
      
      return results.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.imageUrl || '/ttttttt.jpg',
        publishedAt: row.publishedAt,
        url: row.url,
        source: { name: row.source },
        category: row.category
      }));
    } catch (error) {
      console.error('❌ Error fetching latest news:', error);
      throw error;
    }
  }

  // Clean old articles (keep only last 7 days)
  async cleanOldArticles(): Promise<void> {
    try {
      const query = `
        UPDATE news_articles 
        SET isActive = FALSE 
        WHERE publishedAt < DATE_SUB(NOW(), INTERVAL 7 DAY)
      `;

      await conn.execute(query);
      console.log('✅ Cleaned old articles successfully');
    } catch (error) {
      console.error('❌ Error cleaning old articles:', error);
    }
  }

  // Get article count by category
  async getArticleStats(): Promise<{ [key: string]: number }> {
    try {
      const query = `
        SELECT category, COUNT(*) as count
        FROM news_articles 
        WHERE isActive = TRUE
        GROUP BY category
      `;

      const results = await conn.execute(query);
      const stats: { [key: string]: number } = {};
      
      results.rows.forEach((row: any) => {
        stats[row.category] = row.count;
      });

      return stats;
    } catch (error) {
      console.error('❌ Error fetching article stats:', error);
      return {};
    }
  }
}

export const databaseService = new DatabaseService();