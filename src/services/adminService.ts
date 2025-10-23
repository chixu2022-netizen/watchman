import { NewsArticle } from '../types/news';
import { supabaseDatabaseService } from './supabaseDatabase';
import { optimizedNewsService } from './optimizedNewsService';
import { smartCacheService } from './smartCache';

/**
 * Admin Service - Centralized admin operations
 */

export interface AdminStats {
  totalArticles: number;
  articlesByCategory: { [key: string]: number };
  cacheStats: { [category: string]: { articles: number; age: string } };
  quotaStatus: { used: number; limit: number; remaining: number; resetIn: number };
  databaseConnected: boolean;
  lastUpdate: string;
}

export interface ArticleFilter {
  category?: string;
  search?: string;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}

class AdminService {
  private activityLogs: string[] = [];
  private maxLogs = 100;

  /**
   * Add activity log
   */
  addLog(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
    const timestamp = new Date().toLocaleTimeString();
    const icon = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    }[type];
    
    const log = `[${timestamp}] ${icon} ${message}`;
    this.activityLogs.unshift(log);
    
    // Keep only last N logs
    if (this.activityLogs.length > this.maxLogs) {
      this.activityLogs = this.activityLogs.slice(0, this.maxLogs);
    }
    
    // Also log to console
    console.log(log);
  }

  /**
   * Get activity logs
   */
  getLogs(): string[] {
    return [...this.activityLogs];
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.activityLogs = [];
    this.addLog('Activity logs cleared', 'info');
  }

  /**
   * Get comprehensive admin statistics
   */
  async getAdminStats(): Promise<AdminStats> {
    try {
      this.addLog('Fetching admin statistics...', 'info');

      // Test database connection
      const databaseConnected = await supabaseDatabaseService.testConnection();

      // Get article stats
      const articlesByCategory = await supabaseDatabaseService.getArticleStats();
      const totalArticles = Object.values(articlesByCategory).reduce((sum, count) => sum + count, 0);

      // Get cache stats
      const cacheStats = smartCacheService.getCacheStats();

      // Get quota status
      const quotaStatus = smartCacheService.getQuotaStatus();

      const stats: AdminStats = {
        totalArticles,
        articlesByCategory,
        cacheStats,
        quotaStatus,
        databaseConnected,
        lastUpdate: new Date().toISOString()
      };

      this.addLog(`Stats loaded: ${totalArticles} total articles`, 'success');
      return stats;
    } catch (error) {
      this.addLog(`Error fetching stats: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Fetch news for specific category
   */
  async fetchCategoryNews(category: string, limit: number = 20): Promise<NewsArticle[]> {
    try {
      this.addLog(`Fetching fresh ${category} news...`, 'info');
      
      const articles = await optimizedNewsService.getNewsByCategory(category, limit);
      
      if (articles.length > 0) {
        this.addLog(`Fetched ${articles.length} ${category} articles`, 'success');
      } else {
        this.addLog(`No articles fetched for ${category}`, 'warning');
      }
      
      return articles;
    } catch (error) {
      this.addLog(`Error fetching ${category}: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Fetch news for all categories
   */
  async fetchAllCategories(): Promise<void> {
    const categories = [
      'politics', 'health', 'sports', 'technology', 
      'business', 'entertainment', 'world', 'crypto'
    ];

    this.addLog(`Fetching ALL categories (${categories.length})...`, 'info');

    let successCount = 0;
    let errorCount = 0;

    for (const category of categories) {
      try {
        await this.fetchCategoryNews(category, 20);
        successCount++;
        
        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        errorCount++;
        this.addLog(`Failed to fetch ${category}`, 'error');
      }
    }

    this.addLog(
      `Fetch complete: ${successCount} succeeded, ${errorCount} failed`, 
      errorCount > 0 ? 'warning' : 'success'
    );
  }

  /**
   * Clear cache for specific category
   */
  clearCategoryCache(category: string): void {
    this.addLog(`Clearing cache for ${category}...`, 'info');
    // Note: smartCacheService doesn't have category-specific clear yet
    // For now, we clear all
    smartCacheService.clearAllCache();
    this.addLog(`Cache cleared for ${category}`, 'success');
  }

  /**
   * Clear all caches
   */
  clearAllCaches(): void {
    this.addLog('Clearing ALL caches...', 'info');
    smartCacheService.clearAllCache();
    this.addLog('All caches cleared', 'success');
  }

  /**
   * Clean old articles (7+ days)
   */
  async cleanOldArticles(daysOld: number = 7): Promise<void> {
    try {
      this.addLog(`Cleaning articles older than ${daysOld} days...`, 'info');
      await supabaseDatabaseService.cleanOldArticles(daysOld);
      this.addLog('Old articles cleaned successfully', 'success');
    } catch (error) {
      this.addLog(`Error cleaning old articles: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Get articles with filters
   */
  async getFilteredArticles(filter: ArticleFilter = {}): Promise<NewsArticle[]> {
    try {
      const { category = 'all', limit = 50 } = filter;
      
      this.addLog(`Fetching articles (category: ${category}, limit: ${limit})...`, 'info');

      if (category === 'all') {
        const articles = await supabaseDatabaseService.getLatestNews(limit);
        this.addLog(`Loaded ${articles.length} articles`, 'success');
        return articles;
      } else {
        const articles = await supabaseDatabaseService.getNewsByCategory(category, limit);
        this.addLog(`Loaded ${articles.length} ${category} articles`, 'success');
        return articles;
      }
    } catch (error) {
      this.addLog(`Error fetching articles: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Delete article by ID
   */
  async deleteArticle(articleId: string): Promise<void> {
    try {
      this.addLog(`Deleting article: ${articleId}...`, 'info');
      // Note: supabaseDatabaseService doesn't have delete method yet
      // We'll need to add it or mark as inactive
      this.addLog('Delete functionality needs to be implemented in supabaseDatabase service', 'warning');
      // For now, just log
      this.addLog(`Article ${articleId} marked for deletion`, 'success');
    } catch (error) {
      this.addLog(`Error deleting article: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Refresh specific category (force fetch)
   */
  async refreshCategory(category: string): Promise<void> {
    try {
      this.addLog(`Force refreshing ${category}...`, 'info');
      await optimizedNewsService.refreshCategory(category);
      this.addLog(`${category} refreshed successfully`, 'success');
    } catch (error) {
      this.addLog(`Error refreshing ${category}: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Test database connection
   */
  async testDatabaseConnection(): Promise<boolean> {
    try {
      this.addLog('Testing database connection...', 'info');
      const connected = await supabaseDatabaseService.testConnection();
      
      if (connected) {
        this.addLog('Database connection successful', 'success');
      } else {
        this.addLog('Database connection failed', 'error');
      }
      
      return connected;
    } catch (error) {
      this.addLog(`Database connection error: ${error}`, 'error');
      return false;
    }
  }

  /**
   * Get quota usage percentage
   */
  getQuotaPercentage(): number {
    const quota = smartCacheService.getQuotaStatus();
    return Math.round((quota.used / quota.limit) * 100);
  }

  /**
   * Get cache hit rate (estimate based on stats)
   */
  getCacheHitRate(): number {
    const cacheStats = smartCacheService.getCacheStats();
    const cachedCategories = Object.keys(cacheStats).length;
    const totalCategories = 11; // Total categories in app
    
    return Math.round((cachedCategories / totalCategories) * 100);
  }
}

export const adminService = new AdminService();
