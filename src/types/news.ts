export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
  isTopStory?: boolean; // Mark articles as top/featured stories
  isNew?: boolean; // Mark articles published within last 2 hours
  author?: string;
}

export interface NewsSection {
  id: string;
  title: string;
  articles: NewsArticle[];
}

// Homepage-specific data structure
export interface HomepageNewsData {
  worldNews: NewsArticle[];
  categoryNews: NewsArticle[];
  categories: {
    technology: NewsArticle[];
    business: NewsArticle[];
    sports: NewsArticle[];
    entertainment: NewsArticle[];
    health: NewsArticle[];
  };
}

// Category page data structure
export interface CategoryPageData {
  worldNews: NewsArticle[];
  categoryUpdates: NewsArticle[];
  subCategories: {
    [key: string]: NewsArticle[];
  };
  pagination: {
    worldNews: { hasMore: boolean; nextPage: number };
    categoryUpdates: { hasMore: boolean; nextPage: number };
    subCategories: { [key: string]: { hasMore: boolean; nextPage: number } };
  };
}

// Dynamic section props for category pages
export interface DynamicSectionProps {
  category: string;
  title?: string;
  loading?: boolean;
}
