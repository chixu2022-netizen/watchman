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
    category?: NewsCategory,
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
  private getMockNews(category?: NewsCategory): NewsResponse {
    const mockArticles = [
      {
        title: "ICE officer kills man in Chicago suburb during arrest attempt",
        description: "DHS said the ICE officer used 'appropriate force' during the incident. Lilian Jimenez, an Illinois state representative in Chicago, criticized ICE for the death.",
        url: "https://example.com/ice-officer-article",
        urlToImage: undefined,
        publishedAt: new Date().toISOString(),
        source: { name: "News Source" },
        author: "Reporter Name"
      },
      {
        title: "OpenAI's $100 Billion Pivot Blurs Its 'Mission' Further",
        description: "The company continues to evolve its business model as it seeks massive funding rounds.",
        url: "https://example.com/openai-article",
        urlToImage: undefined,
        publishedAt: new Date().toISOString(),
        source: { name: "Tech News" }
      },
      {
        title: "ECB's Nagel Says More Rate Cuts Could Jeopardize Stable Prices",
        description: "European Central Bank official warns about the risks of aggressive monetary policy.",
        url: "https://example.com/ecb-article",
        urlToImage: undefined,
        publishedAt: new Date().toISOString(),
        source: { name: "Financial Times" }
      }
    ];

    return {
      status: 'ok',
      totalResults: mockArticles.length,
      articles: mockArticles
    };
  }
}

export const newsAPI = new NewsAPIService();
