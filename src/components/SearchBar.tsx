import React, { useState } from 'react';
import { NewsCategory } from '../types/news';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: NewsCategory | 'all') => void;
  currentCategory: NewsCategory | 'all';
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onCategoryChange, 
  currentCategory,
  isLoading = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const categories = [
    { value: 'all', label: 'All News' },
    { value: NewsCategory.GENERAL, label: 'General' },
    { value: NewsCategory.BUSINESS, label: 'Business' },
    { value: NewsCategory.TECHNOLOGY, label: 'Technology' },
    { value: NewsCategory.ENTERTAINMENT, label: 'Entertainment' },
    { value: NewsCategory.HEALTH, label: 'Health' },
    { value: NewsCategory.SCIENCE, label: 'Science' },
    { value: NewsCategory.SPORTS, label: 'Sports' }
  ];

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !searchQuery.trim()}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </form>

      <div className="category-filters">
        <span className="filter-label">Categories:</span>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value as NewsCategory | 'all')}
              className={`category-button ${currentCategory === category.value ? 'active' : ''}`}
              disabled={isLoading}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
