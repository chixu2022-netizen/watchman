// News API Types for better type safety and API integration

export interface NewsArticle {
  id?: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  };
  author?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface ArticleCardProps {
  article: NewsArticle;
  variant?: 'featured' | 'medium' | 'compact';
  showImage?: boolean;
  showDescription?: boolean;
}

// News categories for API requests
export enum NewsCategory {
  GENERAL = 'general',
  BUSINESS = 'business',
  ENTERTAINMENT = 'entertainment',
  HEALTH = 'health',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology'
}

// News API endpoints and configuration
export const NEWS_API_CONFIG = {
  BASE_URL: 'https://newsapi.org/v2',
  ENDPOINTS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
    SOURCES: '/sources'
  }
};
