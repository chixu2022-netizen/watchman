import { NewsArticle } from '../types/news';
import { ENV, API_LIMITS } from '../config/environment';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';

/**
 * Multi-Provider News Service
 * Tries multiple APIs in order until success
 * Automatically skips providers with missing API keys
 * Total: Up to 500+ free requests/day (depends on configured providers)
 */

interface Provider {
  name: string;
  fetch: (category: string, limit: number) => Promise<NewsArticle[]>;
  priority: number;
  dailyLimit: number;
  enabled: boolean;
}

// Helper to create legal snippet
const createSnippet = (text: string | null | undefined, category: string): string => {
  if (!text) return `Latest ${category} news`;
  const maxLength = 150;
  if (text.length <= maxLength) return text;
  const snippet = text.substring(0, maxLength);
  const lastPeriod = snippet.lastIndexOf('.');
  return lastPeriod > 0 ? snippet.substring(0, lastPeriod + 1) : snippet.trim() + '...';
};

// NewsData.io (200 req/day)
const fetchNewsData = async (category: string, limit: number): Promise<NewsArticle[]> => {
  const apiKey = ENV.newsDataApiKey;
  if (!apiKey) throw new Error('NewsData.io API key missing');

  let url: string;
  if (category === 'crypto') {
    url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency OR bitcoin OR ethereum&size=${limit}&language=en`;
  } else {
    url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=${category}&size=${limit}&language=en`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`NewsData.io failed: ${response.status}`);

  const data = await response.json();
  if (!data.results?.length) throw new Error('No results from NewsData.io');

  return data.results.map((article: any) => ({
    id: article.article_id || `newsdata-${Date.now()}-${Math.random()}`,
    title: article.title || 'Breaking News',
    description: createSnippet(article.description, category),
    url: article.link || '#',
    imageUrl: article.image_url || NEWS_IMAGE_PLACEHOLDER,
    publishedAt: article.pubDate || new Date().toISOString(),
    source: { name: article.source_name || 'News Source' },
    category,
  }));
};

// NewsAPI.org (100 req/day)
const fetchNewsAPI = async (category: string, limit: number): Promise<NewsArticle[]> => {
  const apiKey = ENV.newsApiOrgKey;
  if (!apiKey) throw new Error('NewsAPI.org key missing');

  const categoryMap: { [key: string]: string } = {
    crypto: 'technology',
    ai: 'technology',
    local: 'general',
  };

  const mappedCategory = categoryMap[category] || category;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${mappedCategory}&pageSize=${limit}&apiKey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`NewsAPI.org failed: ${response.status}`);

  const data = await response.json();
  if (!data.articles?.length) throw new Error('No results from NewsAPI.org');

  return data.articles.map((article: any) => ({
    id: `newsapi-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: createSnippet(article.description, category),
    url: article.url || '#',
    imageUrl: article.urlToImage || NEWS_IMAGE_PLACEHOLDER,
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: { name: article.source?.name || 'News Source' },
    category,
  }));
};

// GNews.io (100 req/day)
const fetchGNews = async (category: string, limit: number): Promise<NewsArticle[]> => {
  const apiKey = ENV.gNewsApiKey;
  if (!apiKey) throw new Error('GNews.io key missing');

  const categoryMap: { [key: string]: string } = {
    crypto: 'technology',
    ai: 'technology',
    local: 'nation',
    politics: 'nation',
  };

  const mappedCategory = categoryMap[category] || category;
  const url = `https://gnews.io/api/v4/top-headlines?category=${mappedCategory}&lang=en&max=${limit}&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`GNews.io failed: ${response.status}`);

  const data = await response.json();
  if (!data.articles?.length) throw new Error('No results from GNews.io');

  return data.articles.map((article: any) => ({
    id: `gnews-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: createSnippet(article.description, category),
    url: article.url || '#',
    imageUrl: article.image || NEWS_IMAGE_PLACEHOLDER,
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: { name: article.source?.name || 'News Source' },
    category,
  }));
};

// MediaStack (100 req/day)
const fetchMediaStack = async (category: string, limit: number): Promise<NewsArticle[]> => {
  const apiKey = ENV.mediaStackApiKey;
  if (!apiKey) throw new Error('MediaStack key missing');

  const categories = category === 'crypto' ? 'technology' : category;
  const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${categories}&languages=en&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`MediaStack failed: ${response.status}`);

  const data = await response.json();
  if (!data.data?.length) throw new Error('No results from MediaStack');

  return data.data.map((article: any) => ({
    id: `mediastack-${article.url?.slice(-20) || Math.random()}`,
    title: article.title || 'Breaking News',
    description: createSnippet(article.description, category),
    url: article.url || '#',
    imageUrl: article.image || NEWS_IMAGE_PLACEHOLDER,
    publishedAt: article.published_at || new Date().toISOString(),
    source: { name: article.source || 'News Source' },
    category,
  }));
};

class MultiProviderService {
  private allProviders: Provider[] = [
    { 
      name: API_LIMITS.newsData.name, 
      fetch: fetchNewsData, 
      priority: 1, 
      dailyLimit: API_LIMITS.newsData.dailyLimit,
      enabled: !!ENV.newsDataApiKey 
    },
    { 
      name: API_LIMITS.newsApiOrg.name, 
      fetch: fetchNewsAPI, 
      priority: 2, 
      dailyLimit: API_LIMITS.newsApiOrg.dailyLimit,
      enabled: !!ENV.newsApiOrgKey 
    },
    { 
      name: API_LIMITS.gNews.name, 
      fetch: fetchGNews, 
      priority: 3, 
      dailyLimit: API_LIMITS.gNews.dailyLimit,
      enabled: !!ENV.gNewsApiKey 
    },
    { 
      name: API_LIMITS.mediaStack.name, 
      fetch: fetchMediaStack, 
      priority: 4, 
      dailyLimit: API_LIMITS.mediaStack.dailyLimit,
      enabled: !!ENV.mediaStackApiKey 
    },
  ];
  
  // Only use enabled providers
  private get providers(): Provider[] {
    return this.allProviders.filter(p => p.enabled);
  }
  
  constructor() {
    const enabledCount = this.providers.length;
    const totalLimit = this.providers.reduce((sum, p) => sum + p.dailyLimit, 0);
    
    if (ENV.isDevelopment) {
      console.log(`🔧 MultiProvider initialized:`);
      console.log(`   📊 ${enabledCount}/${this.allProviders.length} providers enabled`);
      console.log(`   📈 Total daily limit: ${totalLimit} requests`);
      console.log(`   ✅ Active: ${this.providers.map(p => p.name).join(', ')}`);
      
      const disabled = this.allProviders.filter(p => !p.enabled);
      if (disabled.length > 0) {
        console.log(`   ⚠️  Disabled: ${disabled.map(p => p.name).join(', ')} (missing API keys)`);
      }
    }
  }

  /**
   * Fetch news with automatic fallback across all enabled providers
   */
  async getNewsByCategory(category: string, limit: number = 10): Promise<NewsArticle[]> {
    const enabledProviders = this.providers;
    
    if (enabledProviders.length === 0) {
      if (ENV.isDevelopment) {
        console.error('❌ No API providers enabled! Using fallback data.');
      }
      return this.getFallbackArticles(category, limit);
    }

    if (ENV.isDevelopment) {
      console.log(`🌐 MultiProvider: Fetching ${category} (trying ${enabledProviders.length} providers)`);
    }

    for (const provider of enabledProviders) {
      try {
        if (ENV.isDevelopment) {
          console.log(`📡 Trying ${provider.name}...`);
        }
        
        const articles = await provider.fetch(category, limit);
        
        if (articles && articles.length > 0) {
          if (ENV.isDevelopment) {
            console.log(`✅ ${provider.name} SUCCESS: ${articles.length} articles`);
          }
          return articles;
        }
      } catch (error: any) {
        if (ENV.isDevelopment) {
          console.warn(`⚠️ ${provider.name} failed: ${error.message}`);
        }
        continue; // Try next provider
      }
    }

    // All providers failed
    if (ENV.isDevelopment) {
      console.error(`❌ All ${enabledProviders.length} providers failed for ${category}`);
    }
    return this.getFallbackArticles(category, limit);
  }

  /**
   * Fallback articles when all APIs fail
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
      description: createSnippet(null, category),
      imageUrl: NEWS_IMAGE_PLACEHOLDER,
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      url: '#',
      source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Today` },
      category,
    }));
  }

  /**
   * Get provider statistics (all providers)
   */
  getProviderStats() {
    return this.allProviders.map(p => ({
      name: p.name,
      priority: p.priority,
      dailyLimit: p.dailyLimit,
      enabled: p.enabled,
      status: p.enabled ? '✅ Active' : '⚠️ Disabled (missing API key)'
    }));
  }
  
  /**
   * Get total daily request limit across all enabled providers
   */
  getTotalDailyLimit(): number {
    return this.providers.reduce((sum, p) => sum + p.dailyLimit, 0);
  }
  
  /**
   * Check if at least one provider is enabled
   */
  hasEnabledProviders(): boolean {
    return this.providers.length > 0;
  }
  
  /**
   * Get list of enabled provider names
   */
  getEnabledProviders(): string[] {
    return this.providers.map(p => p.name);
  }
}

export const multiProviderService = new MultiProviderService();
