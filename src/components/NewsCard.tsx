import React, { memo } from 'react';
import { NewsArticle } from '../types/news';
import { LazyImage } from './LazyImage';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact';
  onClick?: (article: NewsArticle) => void;
}

/**
 * Reusable News Card Component
 * Memoized to prevent unnecessary re-renders
 */
const NewsCard: React.FC<NewsCardProps> = memo(({ 
  article, 
  variant = 'default',
  onClick 
}) => {
  const formatTimeAgo = (publishedAt: string): string => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    } else if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (variant === 'compact') {
    return (
      <article 
        className="crypto-card"
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <div className="crypto-card-content">
          <h3 className="crypto-card-title">{article.title}</h3>
          <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article 
        className="category-card featured"
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <div className="category-card-image">
          <LazyImage
            src={article.imageUrl || '/ttttttt.jpg'}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="category-card-content">
          <h3 className="category-card-title">{article.title}</h3>
          <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article 
      className="world-card"
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
    >
      <div className="world-card-image">
        <LazyImage
          src={article.imageUrl || '/ttttttt.jpg'}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="world-card-content">
        <h3 className="world-card-title">{article.title}</h3>
        <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
      </div>
    </article>
  );
});

NewsCard.displayName = 'NewsCard';

export default NewsCard;
