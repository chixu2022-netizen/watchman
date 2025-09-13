import React from 'react';
import { ArticleCardProps } from '../types/news';

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'medium', 
  showImage = true, 
  showDescription = true 
}) => {
  const handleReadMore = () => {
    window.open(article.url, '_blank');
  };

  return (
    <div className={`news-article-card news-article-card--${variant}`}>
      {showImage && article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className={`news-image-placeholder news-image-placeholder--${variant}`}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      
      {showImage && !article.urlToImage && (
        <div className={`news-image-placeholder news-image-placeholder--${variant}`}>
          No Image Available
        </div>
      )}

      <h3 className={`news-headline news-headline--${variant === 'featured' ? 'large' : variant === 'compact' ? 'small' : 'medium'}`}>
        {article.title}
      </h3>

      {showDescription && article.description && (
        <p className={`news-content news-content--${variant === 'featured' ? 'large' : 'medium'}`}>
          {article.description}
        </p>
      )}

      <div className="news-meta">
        {article.source.name && (
          <span className="news-source">{article.source.name}</span>
        )}
        {article.publishedAt && (
          <span className="news-date">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <button className="news-read-more" onClick={handleReadMore}>
        Read more
      </button>
    </div>
  );
};

export default ArticleCard;
