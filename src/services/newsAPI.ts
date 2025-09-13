import { NewsArticle, NewsCategory, NewsResponse, SearchFilters } from '../types/news';

// Mock news data for demonstration
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Paramount Skydance prepares bid for Warner Bros Discovery, source says',
    description: 'The political operator known for his capacity for intrigue and spin was fired by Prime Minister Keir Starmer on Thursday.',
    content: 'Full article content would go here...',
    url: 'https://example.com/paramount-warner',
    imageUrl: 'https://via.placeholder.com/400x200?text=Paramount+Warner',
    publishedAt: '2025-09-13T10:30:00Z',
    source: { id: 'business-insider', name: 'Business Insider' },
    category: 'business'
  },
  {
    id: '2',
    title: 'OpenAI\'s $100 Billion Pivot Blurs Its \'Mission\' Further',
    description: 'OpenAI continues to evolve its business model as it raises massive funding rounds.',
    content: 'Full article content would go here...',
    url: 'https://example.com/openai-pivot',
    imageUrl: 'https://via.placeholder.com/400x200?text=OpenAI+News',
    publishedAt: '2025-09-13T09:15:00Z',
    source: { id: 'techcrunch', name: 'TechCrunch' },
    category: 'ai'
  },
  {
    id: '3',
    title: 'NATO to beef up defence of Europe\'s eastern flank after Poland shot down drones',
    description: 'NATO announced plans to beef up the defence of Europe\'s eastern flank on Friday.',
    content: 'Full article content would go here...',
    url: 'https://example.com/nato-defence',
    imageUrl: 'https://via.placeholder.com/400x200?text=NATO+Defence',
    publishedAt: '2025-09-13T08:45:00Z',
    source: { id: 'reuters', name: 'Reuters' },
    category: 'world'
  },
  {
    id: '4',
    title: 'Global markets surge as inflation data shows cooling trend',
    description: 'Stock markets worldwide posted significant gains on Friday as new inflation data revealed a cooling trend.',
    content: 'Full article content would go here...',
    url: 'https://example.com/markets-surge',
    imageUrl: 'https://via.placeholder.com/400x200?text=Global+Markets',
    publishedAt: '2025-09-13T07:30:00Z',
    source: { id: 'bloomberg', name: 'Bloomberg' },
    category: 'business'
  },
  {
    id: '5',
    title: 'Tether to Launch New US Stablecoin, Bo Hines to Lead Project',
    description: 'Cryptocurrency company Tether announces plans for a new US-focused stablecoin project.',
    content: 'Full article content would go here...',
    url: 'https://example.com/tether-stablecoin',
    imageUrl: 'https://via.placeholder.com/400x200?text=Tether+Crypto',
    publishedAt: '2025-09-13T06:20:00Z',
    source: { id: 'coindesk', name: 'CoinDesk' },
    category: 'technology'
  },
  {
    id: '6',
    title: 'ICE officer kills man in Chicago suburb during arrest attempt',
    description: 'DHS said the ICE officer used "appropriate force" during the incident.',
    content: 'Full article content would go here...',
    url: 'https://example.com/ice-incident',
    imageUrl: 'https://via.placeholder.com/400x200?text=Chicago+News',
    publishedAt: '2025-09-13T05:15:00Z',
    source: { id: 'cnn', name: 'CNN' },
    category: 'general'
  },
  {
    id: '7',
    title: 'New breakthrough in quantum computing shows 99% accuracy',
    description: 'Scientists achieve new milestone in quantum error correction with unprecedented accuracy rates.',
    content: 'Full article content would go here...',
    url: 'https://example.com/quantum-breakthrough',
    imageUrl: 'https://via.placeholder.com/400x200?text=Quantum+Computing',
    publishedAt: '2025-09-13T04:10:00Z',
    source: { id: 'science-daily', name: 'Science Daily' },
    category: 'science'
  },
  {
    id: '8',
    title: 'Championship finals set as top teams advance in tournament',
    description: 'Exciting matches lead to championship matchups in international tournament.',
    content: 'Full article content would go here...',
    url: 'https://example.com/championship-finals',
    imageUrl: 'https://via.placeholder.com/400x200?text=Sports+News',
    publishedAt: '2025-09-13T03:25:00Z',
    source: { id: 'espn', name: 'ESPN' },
    category: 'sports'
  }
];

class NewsAPIService {
  private static instance: NewsAPIService;
  private articles: NewsArticle[] = mockArticles;

  static getInstance(): NewsAPIService {
    if (!NewsAPIService.instance) {
      NewsAPIService.instance = new NewsAPIService();
    }
    return NewsAPIService.instance;
  }

  // Simulate API delay
  private async simulateDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Search articles based on filters
  async searchArticles(filters: SearchFilters): Promise<NewsResponse> {
    await this.simulateDelay();

    let filteredArticles = [...this.articles];

    // Filter by search query
    if (filters.query && filters.query.trim()) {
      const query = filters.query.toLowerCase().trim();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.source.name.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.category && filters.category !== 'general') {
      filteredArticles = filteredArticles.filter(article =>
        article.category === filters.category
      );
    }

    // Sort articles
    switch (filters.sortBy) {
      case 'publishedAt':
        filteredArticles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
      case 'relevancy':
        // For mock data, we'll keep the default order as "relevancy"
        break;
      case 'popularity':
        // For mock data, reverse the order to simulate popularity
        filteredArticles.reverse();
        break;
      default:
        // Default to published date
        filteredArticles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }

    return {
      articles: filteredArticles,
      totalResults: filteredArticles.length,
      status: 'ok'
    };
  }

  // Get articles by category
  async getArticlesByCategory(category: NewsCategory): Promise<NewsResponse> {
    return this.searchArticles({ query: '', category });
  }

  // Get all articles (latest news)
  async getLatestNews(): Promise<NewsResponse> {
    return this.searchArticles({ query: '', sortBy: 'publishedAt' });
  }
}

export const newsAPI = NewsAPIService.getInstance();