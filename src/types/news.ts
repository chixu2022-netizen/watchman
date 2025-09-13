export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  category: NewsCategory;
}

export type NewsCategory = 
  | 'general'
  | 'business' 
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'
  | 'world'
  | 'ai';

export interface SearchFilters {
  query: string;
  category?: NewsCategory;
  sortBy?: 'publishedAt' | 'relevancy' | 'popularity';
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}