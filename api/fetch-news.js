// Vercel serverless function to fetch real news (bypasses CORS)
import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables (secure)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const newsApiKey = process.env.REACT_APP_NEWSDATA_API_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseKey || !newsApiKey) {
  console.error('❌ Missing required environment variables');
  console.error('Required:', {
    supabaseUrl: !!supabaseUrl,
    supabaseKey: !!supabaseKey,
    newsApiKey: !!newsApiKey
  });
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { category = 'politics' } = req.query;
    
    console.log(`🔄 ServerlessFetch: Getting ${category} news from NewsData.io`);
    
    // Fetch real news from NewsData.io (no CORS issues on server)
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${newsApiKey}&category=${category}&size=10&language=en`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'success' || !data.results) {
      throw new Error('Invalid API response');
    }

    // Transform to our format
    const articles = data.results.map(article => ({
      id: article.article_id,
      title: article.title,
      description: article.description || `Latest ${category} news update`,
      image_url: article.image_url || 'https://images.unsplash.com/photo-1586946560795-09c1cc6b7e43?w=800',
      published_at: article.pubDate,
      url: article.link,
      source: article.source_name || article.source_id || 'News Source',
      category: category,
      created_at: new Date().toISOString(),
      is_active: true
    }));

    // Store in Supabase
    const { data: insertData, error } = await supabase
      .from('news_articles')
      .upsert(articles, { onConflict: 'id' });

    if (error) {
      console.error('❌ Database error:', error);
      throw error;
    }

    console.log(`✅ ServerlessFetch: Stored ${articles.length} ${category} articles`);

    res.status(200).json({
      success: true,
      message: `Fetched and stored ${articles.length} ${category} articles`,
      articles: articles.length
    });

  } catch (error) {
    console.error('❌ ServerlessFetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}