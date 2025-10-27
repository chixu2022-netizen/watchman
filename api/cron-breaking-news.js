/**
 * CRON JOB: Breaking News (Fast Updates)
 * 
 * Updates breaking/fast-moving categories every 15-30 minutes
 * Categories: world, technology, crypto, business
 * 
 * Schedule: */15 * * * * (every 15 minutes)
 * Or: */30 * * * * (every 30 minutes) - recommended for free tier
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const NEWSDATA_API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;
const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const GNEWS_KEY = process.env.REACT_APP_GNEWS_KEY;
const MEDIASTACK_KEY = process.env.REACT_APP_MEDIASTACK_KEY;

/**
 * Multi-provider fetch with automatic fallback
 */
async function fetchWithFallback(category, limit = 10) {
  const providers = [
    { name: 'NewsData.io', fetch: fetchNewsData, enabled: !!NEWSDATA_API_KEY },
    { name: 'NewsAPI.org', fetch: fetchNewsAPI, enabled: !!NEWSAPI_KEY },
    { name: 'GNews.io', fetch: fetchGNews, enabled: !!GNEWS_KEY },
    { name: 'MediaStack', fetch: fetchMediaStack, enabled: !!MEDIASTACK_KEY }
  ].filter(p => p.enabled);

  for (const provider of providers) {
    try {
      console.log(`📡 Trying ${provider.name} for ${category}...`);
      const articles = await provider.fetch(category, limit);
      if (articles && articles.length > 0) {
        console.log(`✅ ${provider.name} SUCCESS: ${articles.length} articles`);
        return articles;
      }
    } catch (error) {
      console.warn(`⚠️ ${provider.name} failed:`, error.message);
      continue;
    }
  }

  console.error(`❌ All providers failed for ${category}`);
  return [];
}

/**
 * NewsData.io fetcher
 */
async function fetchNewsData(category, limit) {
  const url = category === 'crypto'
    ? `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=cryptocurrency OR bitcoin OR ethereum&size=${limit}&language=en`
    : `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&category=${category}&size=${limit}&language=en`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data = await response.json();
  if (!data.results?.length) throw new Error('No results');
  
  return data.results.map(article => ({
    id: article.article_id || `newsdata-${Date.now()}-${Math.random()}`,
    title: article.title || 'Breaking News',
    description: (article.description || 'Latest news update').substring(0, 150),
    url: article.link || '#',
    image_url: article.image_url || '/fallback.png',
    published_at: article.pubDate || new Date().toISOString(),
    source: article.source_name || 'News Source',
    category: category,
    is_active: true
  }));
}

/**
 * NewsAPI.org fetcher
 */
async function fetchNewsAPI(category, limit) {
  if (!NEWSAPI_KEY) throw new Error('API key missing');
  
  const categoryMap = { crypto: 'technology', ai: 'technology', local: 'general' };
  const mapped = categoryMap[category] || category;
  
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${mapped}&pageSize=${limit}&apiKey=${NEWSAPI_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data = await response.json();
  if (!data.articles?.length) throw new Error('No results');
  
  return data.articles.map(article => ({
    id: `newsapi-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: (article.description || 'Latest news').substring(0, 150),
    url: article.url || '#',
    image_url: article.urlToImage || '/fallback.png',
    published_at: article.publishedAt || new Date().toISOString(),
    source: article.source?.name || 'News Source',
    category: category,
    is_active: true
  }));
}

/**
 * GNews.io fetcher
 */
async function fetchGNews(category, limit) {
  if (!GNEWS_KEY) throw new Error('API key missing');
  
  const categoryMap = { crypto: 'technology', ai: 'technology', local: 'nation', politics: 'nation' };
  const mapped = categoryMap[category] || category;
  
  const url = `https://gnews.io/api/v4/top-headlines?category=${mapped}&lang=en&max=${limit}&apikey=${GNEWS_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data = await response.json();
  if (!data.articles?.length) throw new Error('No results');
  
  return data.articles.map(article => ({
    id: `gnews-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: (article.description || 'Latest news').substring(0, 150),
    url: article.url || '#',
    image_url: article.image || '/fallback.png',
    published_at: article.publishedAt || new Date().toISOString(),
    source: article.source?.name || 'News Source',
    category: category,
    is_active: true
  }));
}

/**
 * MediaStack fetcher
 */
async function fetchMediaStack(category, limit) {
  if (!MEDIASTACK_KEY) throw new Error('API key missing');
  
  const categories = category === 'crypto' ? 'technology' : category;
  const url = `https://api.mediastack.com/v1/news?access_key=${MEDIASTACK_KEY}&categories=${categories}&languages=en&limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data = await response.json();
  if (!data.data?.length) throw new Error('No results');
  
  return data.data.map(article => ({
    id: `mediastack-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: (article.description || 'Latest news').substring(0, 150),
    url: article.url || '#',
    image_url: article.image || '/fallback.png',
    published_at: article.published_at || new Date().toISOString(),
    source: article.source || 'News Source',
    category: category,
    is_active: true
  }));
}

/**
 * Store articles in database
 */
async function storeArticles(articles) {
  if (!articles || articles.length === 0) return 0;
  
  const { data, error } = await supabase
    .from('news_articles')
    .upsert(articles, { onConflict: 'id', ignoreDuplicates: false });
  
  if (error) throw error;
  return articles.length;
}

/**
 * Main cron handler - BREAKING NEWS (Fast updates)
 */
export default async function handler(req, res) {
  const startTime = Date.now();
  console.log('🚨 BREAKING NEWS CRON STARTED:', new Date().toISOString());
  
  try {
    // Fast-moving categories that need frequent updates
    const breakingCategories = ['world', 'technology', 'crypto', 'business'];
    
    let totalArticles = 0;
    const results = [];
    
    for (const category of breakingCategories) {
      try {
        console.log(`📰 Fetching ${category}...`);
        const articles = await fetchWithFallback(category, 15);
        
        if (articles.length > 0) {
          const stored = await storeArticles(articles);
          totalArticles += stored;
          results.push({ category, articles: stored, status: 'success' });
          console.log(`✅ Stored ${stored} ${category} articles`);
        } else {
          results.push({ category, articles: 0, status: 'no_data' });
        }
        
        // Small delay between categories
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error with ${category}:`, error.message);
        results.push({ category, articles: 0, status: 'error', error: error.message });
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`✅ BREAKING NEWS CRON COMPLETED in ${duration}s`);
    console.log(`📊 Total articles: ${totalArticles}`);
    
    return res.status(200).json({
      success: true,
      type: 'breaking_news',
      articlesStored: totalArticles,
      results,
      duration: `${duration}s`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ BREAKING NEWS CRON FAILED:', error);
    
    return res.status(500).json({
      success: false,
      type: 'breaking_news',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
