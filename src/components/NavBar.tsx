import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import Logo from './Logo';
import SearchResults from './SearchResults';
import { newsAPI } from '../services/newsAPI';
import { NewsArticle } from '../types/news';

const primaryLinks = [
  'Home',
  'Crypto',
  'Technology',
  'AI',
  'Business',
  'Entertainment',
  'Sports',
  'World',
  'Local',
  'Health',
  'Politics',
];

const NavBar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await newsAPI.searchNews(query.trim());
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

        {/* Desktop layout (default) */}
        <div className="nm-left">
          <Logo />
          <h2 className="nm-watchman-text">watchman</h2>
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
        </div>

        {/* Mobile nav only (hidden on desktop) */}
        <button
          className="nm-hamburger"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span className="nm-hamburger-bar" />
          <span className="nm-hamburger-bar" />
          <span className="nm-hamburger-bar" />
        </button>
        <div className="nm-center-logo">
          <Logo />
          <h2 className="nm-watchman-text">watchman</h2>
        </div>
        <div className="nm-right-mobile">
          <button
            type="button"
            className="nm-icon nm-search-mobile"
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
          <button className="nm-icon nm-subscribe-mobile" aria-label="Subscribe">
            {/* Bell/subscribe icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <a className="nm-icon nm-signin-mobile" href="/signin" aria-label="Sign in">
            {/* User icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 0 0 2-2v-2a7 7 0 0 0-14 0v2a2 2 0 0 0 2 2z"/></svg>
          </a>
        </div>
        <div className={`nm-mobile-drawer${mobileMenuOpen ? ' open' : ''}`}>
          <ul className="nm-mobile-links" role="menubar">
            {primaryLinks.map(l => {
              const slug = l.toLowerCase().replace(/\s+/g,'-');
              return (
                <li key={l} role="none">
                  <a role="menuitem" className={`nm-link nm-link-${slug}`} href={`/${slug}`}>{l}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {mobileMenuOpen && (
          <div
            className="nm-mobile-overlay"
            role="button"
            tabIndex={0}
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                setMobileMenuOpen(false);
              }
            }}
          />
        )}

        {/* Mobile nav drawer */}
        <div className={`nm-mobile-drawer${mobileMenuOpen ? ' open' : ''}`}>
          <ul className="nm-mobile-links" role="menubar">
            {primaryLinks.map(l => {
              const slug = l.toLowerCase().replace(/\s+/g,'-');
              return (
                <li key={l} role="none">
                  <a role="menuitem" className={`nm-link nm-link-${slug}`} href={`/${slug}`}>{l}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="nm-mobile-overlay"
            role="button"
            tabIndex={0}
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                setMobileMenuOpen(false);
              }
            }}
          />
        )}
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
