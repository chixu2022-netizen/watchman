import { NewsResponse, NewsCategory, NEWS_API_CONFIG } from '../types/news';

class NewsAPIService {
  private apiKey: string | null = null;

  constructor() {
    // In production, this should come from environment variables
    // For now, we'll use a placeholder
    this.apiKey = process.env.REACT_APP_NEWS_API_KEY || null;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  private buildUrl(endpoint: string, params: Record<string, string>): string {
    const url = new URL(`${NEWS_API_CONFIG.BASE_URL}${endpoint}`);
    
    // Add API key
    if (this.apiKey) {
      url.searchParams.append('apiKey', this.apiKey);
    }

    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  }

  async getTopHeadlines(
    category?: NewsCategory | 'all',
    country: string = 'us',
    pageSize: number = 20
  ): Promise<NewsResponse> {
    const params: Record<string, string> = {
      country,
      pageSize: pageSize.toString()
    };

    if (category) {
      params.category = category;
    }

    const url = this.buildUrl(NEWS_API_CONFIG.ENDPOINTS.TOP_HEADLINES, params);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch news:', error);
      
      // Return mock data for development when API is not available
      return this.getMockNews(category);
    }
  }

  async searchNews(
    query: string,
    sortBy: 'relevancy' | 'popularity' | 'publishedAt' = 'publishedAt',
    pageSize: number = 20
  ): Promise<NewsResponse> {
    const params = {
      q: query,
      sortBy,
      pageSize: pageSize.toString()
    };

    const url = this.buildUrl(NEWS_API_CONFIG.ENDPOINTS.EVERYTHING, params);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to search news:', error);
      return this.getMockNews();
    }
  }

  // Mock data for development and fallback
  private getMockNews(category?: NewsCategory | 'all'): NewsResponse {
    const allMockArticles = [
      // Technology
      {
        title: "OpenAI's $100 Billion Pivot Blurs Its 'Mission' Further",
        description: "The company continues to evolve its business model as it seeks massive funding rounds amid growing competition in AI.",
        url: "https://example.com/openai-article",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        source: { name: "TechCrunch" },
        category: NewsCategory.TECHNOLOGY
      },
      {
        title: "Apple Announces Revolutionary AR Glasses for 2025",
        description: "The tech giant unveils its most ambitious product since the iPhone, promising to revolutionize augmented reality.",
        url: "https://example.com/apple-ar",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        source: { name: "The Verge" },
        category: NewsCategory.TECHNOLOGY
      },
      // Business
      {
        title: "ECB's Nagel Says More Rate Cuts Could Jeopardize Stable Prices",
        description: "European Central Bank official warns about the risks of aggressive monetary policy in current economic climate.",
        url: "https://example.com/ecb-article",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
        source: { name: "Financial Times" },
        category: NewsCategory.BUSINESS
      },
      {
        title: "Global Markets Surge on Positive Economic Data",
        description: "Stock markets worldwide rally as inflation data shows cooling trend across major economies.",
        url: "https://example.com/markets-surge",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        source: { name: "Reuters" },
        category: NewsCategory.BUSINESS
      },
      // General/Politics
      {
        title: "ICE officer kills man in Chicago suburb during arrest attempt",
        description: "DHS said the ICE officer used 'appropriate force' during the incident. Lilian Jimenez, an Illinois state representative in Chicago, criticized ICE for the death.",
        url: "https://example.com/ice-officer-article",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        source: { name: "CNN" },
        author: "Reporter Name",
        category: NewsCategory.GENERAL
      },
      // Sports
      {
        title: "NFL Playoffs: Unexpected Upsets Shake Championship Race",
        description: "Underdog teams advance in stunning victories that have completely changed the playoff landscape.",
        url: "https://example.com/nfl-playoffs",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
        source: { name: "ESPN" },
        category: NewsCategory.SPORTS
      },
      // Entertainment
      {
        title: "Oscar Nominations Announced: Surprise Snubs and Predictions",
        description: "This year's Academy Award nominations bring several surprises and notable omissions in major categories.",
        url: "https://example.com/oscars-2025",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
        source: { name: "Variety" },
        category: NewsCategory.ENTERTAINMENT
      },
      // Health
      {
        title: "New Study Links Mediterranean Diet to Longevity",
        description: "Comprehensive research spanning 20 years shows significant health benefits of traditional Mediterranean eating patterns.",
        url: "https://example.com/mediterranean-diet",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
        source: { name: "Health News" },
        category: NewsCategory.HEALTH
      },
      // Science
      {
        title: "James Webb Telescope Discovers Potentially Habitable Exoplanet",
        description: "Astronomers identify Earth-like conditions on planet 40 light-years away, raising hopes for extraterrestrial life.",
        url: "https://example.com/webb-discovery",
        urlToImage: undefined,
        publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
        source: { name: "NASA News" },
        category: NewsCategory.SCIENCE
      }
    ];

    // Filter by category if specified
    let filteredArticles = allMockArticles;
    if (category && category !== 'all') {
      filteredArticles = allMockArticles.filter(article => 
        (article as any).category === category
      );
    }

    // Remove the category property before returning (it's not in our NewsArticle interface)
    const mockArticles = filteredArticles.map(({ category, ...article }) => article);

    return {
      status: 'ok',
      totalResults: mockArticles.length,
      articles: mockArticles
    };
  }
}

export const newsAPI = new NewsAPIService();
