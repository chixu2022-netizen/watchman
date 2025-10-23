import { NewsArticle, HomepageNewsData } from '../types/news';
import { ENV, API_CONFIG } from '../config/environment';

// Database-first approach with API fallback
const USE_DATABASE = ENV.useDatabaseCache;

// NewsData.io configuration (secure)
const NEWS_API_KEY = ENV.newsDataApiKey;
const NEWS_API_BASE_URL = API_CONFIG.newsDataBaseUrl;

// Validate API key
if (!NEWS_API_KEY) {
  console.error('❌ NewsData.io API key missing! Set REACT_APP_NEWSDATA_API_KEY in .env');
} else if (ENV.isDevelopment) {
  console.log('🔧 NewsData.io API configured:', `${NEWS_API_KEY.slice(0, 8)}...`);
}

if (ENV.isDevelopment) {
  console.log('🔧 Database cache mode:', USE_DATABASE ? 'ENABLED' : 'DISABLED');
}

// These are kept commented for potential future use when backend proxy is implemented
// interface NewsAPIResponse {
//   status: string;
//   totalResults: number;
//   articles: Array<{
//     source: { id: string | null; name: string };
//     author: string | null;
//     title: string;
//     description: string | null;
//     url: string;
//     urlToImage: string | null;
//     publishedAt: string;
//     content: string | null;
//   }>;
// }

// // Category mappings for different page types
// const CATEGORY_MAPPINGS = {
//   general: 'general',
//   crypto: 'business', // Crypto news often comes under business
//   sports: 'sports',
//   technology: 'technology',
//   ai: 'technology', // AI news under technology
//   business: 'business',
//   entertainment: 'entertainment',
//   health: 'health',
//   science: 'science'
// };

// Transform NewsAPI response to our NewsArticle format


const transformNewsDataArticle = (article: any, category: string = 'general'): NewsArticle => {
  // Enhanced image handling with better validation for NewsData.io
  let imageUrl = '/ttttttt.jpg'; // Default fallback
  let imageSource = 'fallback';
  
  // Check image_url (NewsData.io format)
  if (article.image_url && 
      article.image_url !== null && 
      article.image_url !== 'null' &&
      typeof article.image_url === 'string' &&
      article.image_url.startsWith('http') &&
      article.image_url.length > 10) {
    imageUrl = article.image_url;
    imageSource = 'image_url';
  } 
  // Check alternative image field
  else if (article.image && 
           typeof article.image === 'string' &&
           article.image.startsWith('http')) {
    imageUrl = article.image;
    imageSource = 'image';
  } 
  // Check multimedia array
  else if (article.multimedia && 
           Array.isArray(article.multimedia) && 
           article.multimedia.length > 0 &&
           article.multimedia[0].url) {
    imageUrl = article.multimedia[0].url;
    imageSource = 'multimedia';
  }
  
  console.log(`🖼️ Image for "${article.title?.slice(0, 30)}" | Source: ${imageSource} | URL: ${imageUrl.slice(0, 60)}...`);
  
  return {
    id: article.article_id || `${article.link?.slice(-20) || Math.random().toString(36)}`,
    title: article.title || 'Breaking News',
    description: article.description || 'Stay informed with the latest updates.',
    url: article.link || '#',
    imageUrl: imageUrl,
    publishedAt: article.pubDate || new Date().toISOString(),
    source: {
      name: article.source_name || 'News Source'
    },
    category: category
  };
};

// Fallback news data in case API fails - using your original static content
const getFallbackNews = (category: string = 'general'): NewsArticle[] => [
  {
    id: `fallback-${category}-1`,
    title: 'Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact',
    description: 'Saudi Arabia and Pakistan have signed a mutual defense agreement.',
    url: '#',
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    source: { name: 'News Source' },
    category: category
  },
  {
    id: `fallback-${category}-2`,
    title: 'Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome',
    description: 'High-level diplomatic discussions continue.',
    url: '#',
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    source: { name: 'News Source' },
    category: category
  },
  {
    id: `fallback-${category}-3`,
    title: 'France gears up for protests, strikes over budget cuts',
    description: 'Economic tensions rise across European nations.',
    url: '#',
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date(Date.now() - 420000).toISOString(), // 7 minutes ago
    source: { name: 'News Source' },
    category: category
  },
  {
    id: `fallback-${category}-4`,
    title: 'Beetle that threatens Australia\'s grains industry found in imported nappies',
    description: 'Agricultural security measures under review.',
    url: '#',
    imageUrl: '/ttttttt.jpg',
    publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    source: { name: 'News Source' },
    category: category
  }
];

// Main NewsAPI class
class NewsAPIService {
  // Fetch news for all homepage categories dynamically
  async getAllCategoriesNews(): Promise<{[key: string]: NewsArticle[]}> {
    const categories = [
      'world', 'crypto', 'technology', 'business', 
      'entertainment', 'sports', 'health', 'politics', 
      'local', 'artificial-intelligence'
    ];

    const results: {[key: string]: NewsArticle[]} = {};
    
    console.log('🚀 Fetching dynamic news for all categories...');
    
    // Fetch news for each category
    await Promise.all(categories.map(async (category) => {
      try {
        console.log(`📰 Fetching ${category} news...`);
        const articles = await this.getNewsByCategory(category, 4);
        results[category] = articles;
        console.log(`✅ Got ${articles.length} articles for ${category}`);
      } catch (error) {
        console.error(`❌ Error fetching ${category} news:`, error);
        results[category] = this.getFallbackArticles(category).slice(0, 4);
      }
    }));

    console.log('🎉 All categories news fetched:', Object.keys(results));
    return results;
  }

  private getFallbackArticles(category: string): NewsArticle[] {
    return getFallbackNews(category);
  }

  private async fetchWithFallback(url: string, options: RequestInit = {}): Promise<any> {
    try {
      console.log('🌐 Making API request to:', url.replace(NEWS_API_KEY, 'API_KEY_HIDDEN'));
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      console.log('📡 API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const jsonData = await response.json();
      console.log('✅ API response received successfully:', {
        status: jsonData.status,
        totalResults: jsonData.totalResults,
        resultsCount: jsonData.results?.length
      });
      return jsonData;
    } catch (error) {
      console.error('❌ NewsData.io API request failed:', error);
      console.log('🔍 Full error details:', JSON.stringify(error, null, 2));
      return null;
    }
  }

  async getNewsByCategory(category: string, limit: number = 4): Promise<NewsArticle[]> {
    try {
      
      // Try different approaches for NewsAPI - improved with more sources and better queries
      const queries = {
        'general': ['world news', 'international', 'breaking news', 'headlines'],
        'technology': ['technology', 'tech', 'AI', 'software', 'startup'],
        'business': ['business', 'finance', 'economy', 'market', 'stocks'],
        'sports': ['sports', 'football', 'basketball', 'soccer', 'athletics'],
        'health': ['health', 'medical', 'healthcare', 'medicine', 'wellness'],
        'entertainment': ['entertainment', 'movies', 'music', 'celebrity', 'hollywood'],
        'crypto': ['cryptocurrency', 'bitcoin', 'blockchain', 'crypto', 'ethereum'],
        'artificial-intelligence': ['artificial intelligence', 'AI', 'machine learning', 'deep learning', 'robotics'],
        'politics': ['politics', 'political', 'government', 'congress', 'senate'],
        'elections': ['elections', 'voting', 'campaign', 'ballot', 'primary'],
        'policy': ['policy', 'legislation', 'bill', 'law', 'reform'],
        'legislation': ['legislation', 'bill', 'congress', 'senate', 'house'],
        'government': ['government', 'federal', 'administration', 'white house', 'congress']
      };
      
      const categoryQueries = queries[category as keyof typeof queries] || queries['general'];
      const randomQuery = categoryQueries[Math.floor(Math.random() * categoryQueries.length)];
      
      const urls = [
        `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(randomQuery)}&size=${Math.min(limit * 2, 10)}&language=en`,
        `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&country=us&size=${Math.min(limit * 2, 10)}&language=en`,
        `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(category)}&size=${Math.min(limit * 2, 10)}&language=en`,
        `${NEWS_API_BASE_URL}/news?apikey=${NEWS_API_KEY}&language=en&size=${Math.min(limit * 2, 10)}`
      ];
      
      for (const url of urls) {
        console.log(`🔍 Trying ${category} news from:`, url);
        console.log('🔑 Using API key:', NEWS_API_KEY ? 'Present' : 'Missing');
        
        console.log(`🌐 Attempting to fetch ${category} from: ${url.replace(NEWS_API_KEY, 'API_KEY_HIDDEN')}`);
        const data = await this.fetchWithFallback(url);
        
        console.log(`📊 API response for ${category}:`, {
          status: data?.status,
          totalResults: data?.totalResults,
          resultsCount: data?.results?.length,
          firstTitle: data?.results?.[0]?.title
        });
        
        if (data && data.results && data.results.length > 0) {
          console.log(`✅ Found ${data.results.length} articles for ${category}`);
          const transformedArticles = data.results
            .slice(0, limit)
            .map((article: any) => transformNewsDataArticle(article, category));
          console.log(`🔄 Transformed ${transformedArticles.length} articles for ${category}`);
          return transformedArticles;
        } else {
          console.warn(`⚠️ No results for ${category} from ${url}`);
        }
      }
      
      console.log(`⚠️ No articles found for ${category} with any URL, using fallback`);
      // Return fallback data if API fails or returns no results
      return getFallbackNews(category).slice(0, limit);
    } catch (error) {
      console.error(`❌ Error fetching news by category ${category}:`, error);
      return getFallbackNews(category).slice(0, limit);
    }
  }

  async getHomepageNews(): Promise<HomepageNewsData> {
    try {
      // Fetch MASSIVE amounts of news for homepage - it has 108 article slots!
      console.log('🚀 Fetching news for ENTIRE homepage - this needs A LOT of articles!');
      
      const [
        worldNews1, worldNews2, worldNews3,
        cryptoNews1, cryptoNews2, cryptoNews3, cryptoNews4,
        techNews1, techNews2, techNews3,
        businessNews1, businessNews2,
        sportsNews1, sportsNews2,
        entertainmentNews1, entertainmentNews2,
        healthNews1, healthNews2,
        generalNews1, generalNews2
      ] = await Promise.all([
        // World news sections (multiple)
        this.getNewsByCategory('general', 15),
        this.getNewsByCategory('general', 15),
        this.getNewsByCategory('general', 15),
        
        // Crypto sections (4 different sections)
        this.getNewsByCategory('crypto', 15),
        this.getNewsByCategory('business', 15), // Financial news for crypto sections
        this.getNewsByCategory('technology', 15), // Tech news for crypto sections
        this.getNewsByCategory('crypto', 15),
        
        // Technology sections (3 sections)
        this.getNewsByCategory('technology', 15),
        this.getNewsByCategory('artificial-intelligence', 15),
        this.getNewsByCategory('technology', 15),
        
        // Business sections
        this.getNewsByCategory('business', 15),
        this.getNewsByCategory('business', 15),
        
        // Sports sections
        this.getNewsByCategory('sports', 15),
        this.getNewsByCategory('sports', 15),
        
        // Entertainment sections
        this.getNewsByCategory('entertainment', 15),
        this.getNewsByCategory('entertainment', 15),
        
        // Health sections
        this.getNewsByCategory('health', 15),
        this.getNewsByCategory('health', 15),
        
        // More general news
        this.getNewsByCategory('general', 15),
        this.getNewsByCategory('general', 15)
      ]);
      
      // Combine all news into pools
      const allWorldNews = [...worldNews1, ...worldNews2, ...worldNews3, ...generalNews1, ...generalNews2];
      const allCryptoNews = [...cryptoNews1, ...cryptoNews2, ...cryptoNews3, ...cryptoNews4];
      const allTechNews = [...techNews1, ...techNews2, ...techNews3];
      const allBusinessNews = [...businessNews1, ...businessNews2];
      const allSportsNews = [...sportsNews1, ...sportsNews2];
      const allEntertainmentNews = [...entertainmentNews1, ...entertainmentNews2];
      const allHealthNews = [...healthNews1, ...healthNews2];
      
      console.log(`📊 MASSIVE NEWS HAUL: World=${allWorldNews.length}, Crypto=${allCryptoNews.length}, Tech=${allTechNews.length}, Business=${allBusinessNews.length}, Sports=${allSportsNews.length}, Entertainment=${allEntertainmentNews.length}, Health=${allHealthNews.length}`);
      

      return {
        worldNews: allWorldNews.slice(0, 50), // Plenty for all world sections
        categoryNews: allCryptoNews.slice(0, 50), // Plenty for all crypto sections
        categories: {
          technology: allTechNews.slice(0, 20),
          business: allBusinessNews.slice(0, 20),
          sports: allSportsNews.slice(0, 20),
          entertainment: allEntertainmentNews.slice(0, 20),
          health: allHealthNews.slice(0, 20)
        }
      };
    } catch (error) {
      console.error('Error fetching homepage news:', error);
      
      // Return complete fallback data structure
      return {
        worldNews: getFallbackNews('general').slice(0, 50),
        categoryNews: getFallbackNews('technology').slice(0, 50),
        categories: {
          technology: getFallbackNews('technology').slice(0, 20),
          business: getFallbackNews('business').slice(0, 20),
          sports: getFallbackNews('sports').slice(0, 20),
          entertainment: getFallbackNews('entertainment').slice(0, 20),
          health: getFallbackNews('health').slice(0, 20)
        }
      };
    }
  }

  async searchNews(query: string, limit: number = 10): Promise<{ articles: NewsArticle[] }> {
    try {
      if (!query.trim()) {
        return { articles: [] };
      }

      const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${limit}&sortBy=publishedAt`;
      const data = await this.fetchWithFallback(url);
      
      if (data && data.articles && data.articles.length > 0) {
        const articles = data.articles
          .slice(0, limit)
            .map((article: any) => transformNewsDataArticle(article, 'search'));        return { articles };
      }
      
      return { articles: [] };
    } catch (error) {
      console.error('Error searching news:', error);
      return { articles: [] };
    }
  }
}

// Export singleton instance
export const newsAPI = new NewsAPIService();