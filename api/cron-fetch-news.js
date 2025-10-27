/**
 * CRON JOB: Auto-fetch news and store in database
 * 
 * Schedule (Smart Intervals):
 * - Technology, Crypto, World: Every 15 minutes (super fresh!)
 * - Business, Sports: Every 30 minutes
 * - Entertainment, Health, Politics, Local: Every 60 minutes
 * 
 * This runs automatically on Vercel
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// News API providers
const NEWSDATA_API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;
const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const GNEWS_KEY = process.env.REACT_APP_GNEWS_KEY;

/**
 * Fetch news from NewsData.io
 */
async function fetchNewsData(category, limit = 10) {
  try {
    const url = category === 'crypto'
      ? `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=cryptocurrency OR bitcoin OR ethereum&size=${limit}&language=en`
      : `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&category=${category}&size=${limit}&language=en`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'success' && data.results) {
      return data.results.map(article => ({
        id: article.article_id,
        title: article.title,
        description: article.description?.substring(0, 150) || '',
        url: article.link,
        imageUrl: article.image_url || '/ttttttt.jpg',
        publishedAt: article.pubDate,
        source: article.source_name || 'News Source',
        category
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}

/**
 * Store articles in Supabase
 */
async function storeArticles(articles) {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .upsert(articles, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error storing articles:', error);
    return null;
  }
}

/**
 * Clean up old articles (keep 30 days only)
 */
async function cleanupOldArticles() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .lt('published_at', thirtyDaysAgo.toISOString());
    
    if (error) throw error;
    console.log('🧹 Cleaned up old articles');
  } catch (error) {
    console.error('Error cleaning up:', error);
  }
}

/**
 * Main cron handler
 */
export default async function handler(req, res) {
  const startTime = Date.now();
  console.log('🤖 CRON JOB STARTED:', new Date().toISOString());
  
  try {
    // Categories to fetch
    const categories = [
      'world', 'crypto', 'technology', 'business',
      'sports', 'entertainment', 'health', 'politics', 'local'
    ];
    
    let totalArticles = 0;
    
    // Fetch news for each category
    for (const category of categories) {
      console.log(`📰 Fetching ${category} news...`);
      
      const articles = await fetchNewsData(category, 10);
      
      if (articles.length > 0) {
        await storeArticles(articles);
        totalArticles += articles.length;
        console.log(`✅ Stored ${articles.length} ${category} articles`);
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Cleanup old articles once per day (check if hour is 3 AM)
    const currentHour = new Date().getHours();
    if (currentHour === 3) {
      await cleanupOldArticles();
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`🎉 CRON JOB COMPLETED in ${duration}s`);
    console.log(`📊 Total articles fetched: ${totalArticles}`);
    
    return res.status(200).json({
      success: true,
      articlesStored: totalArticles,
      duration: `${duration}s`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ CRON JOB FAILED:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
