import React from 'react';
import './LoadingState.css';

interface LoadingStateProps {
  variant?: 'articles' | 'search' | 'page';
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  variant = 'articles', 
  message = 'Loading news...' 
}) => {
  if (variant === 'articles') {
    return (
      <div className="loading-articles">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="article-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-title short"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'search') {
    return (
      <div className="loading-search">
        <div className="search-spinner"></div>
        <p className="loading-message">Searching for articles...</p>
      </div>
    );
  }

  return (
    <div className="loading-page">
      <div className="page-spinner"></div>
      <h2 className="loading-title">Watchman News</h2>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingState;
