import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import Logo from './Logo';
import SearchResults from './SearchResults';
import { newsAPI } from '../services/newsAPI';
import { NewsArticle, SearchFilters } from '../types/news';

const primaryLinks = [
  'Home',
  'For you',
  'Technology',
  'AI',
  'Business',
  'Entertainment',
  'Sports',
  'World',
];

const moreLinks = ['Local', 'Health', 'Politics'];

const NavBar: React.FC = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const moreRef = useRef<HTMLLIElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const filters: SearchFilters = { query: query.trim() };
      const response = await newsAPI.searchArticles(filters);
      setSearchResults(response.articles);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleArticleClick = (article: NewsArticle) => {
    // Open article in new tab
    window.open(article.url, '_blank');
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <nav className="nm-navbar">
  <div className="nm-inner">
        <div className="nm-left">
              <Logo />
              <h2 className="nm-watchman-text">
                watchman
              </h2>
        </div>

  <div className="nm-center">
          <ul className="nm-links" role="menubar">
            {primaryLinks.map(l => {
              const slug = l.toLowerCase().replace(/\s+/g,'-');
              return (
                <li key={l} role="none">
                  <a role="menuitem" className={`nm-link nm-link-${slug}`} href={`/${slug}`}>{l}</a>
                </li>
              );
            })}

            <li role="none" ref={moreRef} className="nm-more">
              <button className="nm-link nm-more-button" aria-haspopup="true" aria-expanded={moreOpen} onClick={() => setMoreOpen(v => !v)}>
                More ▾
              </button>
              {moreOpen && (
                <div className="nm-more-panel" role="menu">
                  {moreLinks.map(m => (
                    <a key={m} role="menuitem" className="nm-more-item" href={`/${m.toLowerCase()}`}>{m}</a>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="nm-right">
          <div className="nm-search-wrapper" role="search">
            <button 
              type="button" 
              className="nm-search-button" 
              aria-label="Open search" 
              onClick={() => setSearchOpen(true)}
            >
              <svg 
                className="nm-search-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden
              >
                <path 
                  d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" 
                  stroke="currentColor" 
                  strokeWidth="1.6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 21l-4.35-4.35" 
                  stroke="currentColor" 
                  strokeWidth="1.6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <button className="nm-subscribe">Subscribe</button>
          <a className="nm-signin" href="/signin">Sign in</a>
          <button className="nm-subscribe nm-factcheck">Fact check</button>
        </div>
      </div>

      {/* Search Popup */}
      {searchOpen && (
        <div
          className="search-backdrop"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseSearch();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
              handleCloseSearch();
            }
          }}
        >
          <div
            className="search-popup"
            role="dialog"
            aria-modal="true"
          >
            <div className="search-popup-header">
              <input
                type="text"
                placeholder="Search news articles..."
                className="search-popup-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

              />
              <button 
                onClick={handleCloseSearch} 
                aria-label="Close popup"
                className="search-popup-close"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="search-popup-content">
              <SearchResults
                articles={searchResults}
                loading={loading}
                query={searchQuery}
                onArticleClick={handleArticleClick}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
