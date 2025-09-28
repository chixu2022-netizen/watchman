import React from 'react';
import { NewsArticle } from '../types/news';
import './SearchResults.css';

interface SearchResultsProps {
  articles: NewsArticle[];
  loading: boolean;
  query: string;
  onArticleClick: (article: NewsArticle) => void;
  onSuggestionClick?: (query: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  articles,
  loading,
  query,
  onArticleClick,
  onSuggestionClick
}) => {
  if (loading) {
    return (
      <div className="search-results-loading">
        <div className="search-loading-spinner"></div>
        <p>Searching...</p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="search-empty-state">
        <p>Type to search for news articles...</p>
        <div className="search-suggestions">
          <p>Try searching for:</p>
          <div className="search-suggestion-tags">
            <button className="search-tag" onClick={() => onSuggestionClick && onSuggestionClick('Technology')}>Technology</button>
            <button className="search-tag" onClick={() => onSuggestionClick && onSuggestionClick('Business')}>Business</button>
            <button className="search-tag" onClick={() => onSuggestionClick && onSuggestionClick('AI')}>AI</button>
            <button className="search-tag" onClick={() => onSuggestionClick && onSuggestionClick('Sports')}>Sports</button>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="search-no-results">
        <p>No articles found for &quot;{query}&quot;</p>
        <p className="search-no-results-suggestion">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <p>{articles.length} result{articles.length !== 1 ? 's' : ''} for &quot;{query}&quot;</p>
      </div>
      <div className="search-results-list">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="search-result-item"
            onClick={() => onArticleClick(article)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onArticleClick(article);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="search-result-content">
              <h3 className="search-result-title">{article.title}</h3>
              <p className="search-result-description">{article.description}</p>
              <div className="search-result-meta">
                <span className="search-result-source">{article.source.name}</span>
                <span className="search-result-category">{(article as any).category || 'General'}</span>
                <span className="search-result-time">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {(article as any).imageUrl && (
              <div className="search-result-image">
                <img src={(article as any).imageUrl} alt={article.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
