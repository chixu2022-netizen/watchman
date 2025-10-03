import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { simpleNewsService } from '../services/simpleNews';
import { NewsArticle } from '../types/news';
import './Home.css';

const Politics: React.FC = () => {
  const [politicsNews, setPoliticsNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTimeAgo = (publishedAt: string): string => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  useEffect(() => {
    const loadPoliticsNews = async () => {
      try {
        setLoading(true);
        console.log('🏛️ Loading politics news...');
        
        // Get politics news from database-first service
        const articles = await simpleNewsService.getNewsByCategory('politics', 30);
        setPoliticsNews(articles);
        
        console.log(`✅ Loaded ${articles.length} politics articles`);
        setError(null);
      } catch (err) {
        console.error('❌ Error loading politics news:', err);
        setError('Failed to load politics news');
        
        // Fallback to mock political articles
        setPoliticsNews([
          {
            id: 'mock-politics-1',
            title: 'Senate Passes Bipartisan Infrastructure Bill in Historic Vote',
            description: 'The Senate has approved a major infrastructure package with support from both parties, marking a significant legislative achievement.',
            imageUrl: '/wm01.jpeg',
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            url: '#',
            source: { name: 'Political News' },
            category: 'politics'
          },
          {
            id: 'mock-politics-2', 
            title: 'Presidential Approval Ratings Show Steady Improvement',
            description: 'Latest polling data indicates rising public confidence in current administration policies and leadership.',
            imageUrl: '/ttttttt.jpg',
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            url: '#',
            source: { name: 'Politics Today' },
            category: 'politics'
          },
          {
            id: 'mock-politics-3',
            title: 'Congressional Committee Announces Major Investigation',
            description: 'House committee will examine key policy issues affecting national security and economic stability.',
            imageUrl: '/placeholders/placeholder1.svg',
            publishedAt: new Date(Date.now() - 10800000).toISOString(),
            url: '#',
            source: { name: 'Capitol Report' },
            category: 'politics'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadPoliticsNews();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Politics News...</h2>
          <p>Getting the latest political updates...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__container">
        {error && (
          <div style={{ 
            background: '#fff3cd', 
            color: '#856404', 
            padding: '10px', 
            borderRadius: '5px', 
            margin: '20px 0',
            textAlign: 'center'
          }}>
            {error} - Showing fallback content
          </div>
        )}

        {/* Main Politics Section */}
        <section className="world-section">
          <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>
            🏛️ Politics News
          </h2>
          <div className="world-cards">
            {politicsNews.slice(0, 8).map((article, index) => (
              <article 
                key={article.id} 
                className="world-card" 
                onClick={() => window.open(article.url, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <div className="world-card-image">
                  <img 
                    src={article.imageUrl || "/ttttttt.jpg"} 
                    alt={article.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/ttttttt.jpg";
                    }}
                  />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-description">{article.description}</p>
                  <div className="world-card-meta">
                    <span className="world-card-source">{article.source.name}</span>
                    <span className="world-card-time">{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Secondary Politics Section */}
        {politicsNews.length > 8 && (
          <section className="crypto-section">
            <h3 style={{ textAlign: 'center', margin: '30px 0', color: '#555' }}>
              More Political Updates
            </h3>
            <div className="crypto-cards">
              {politicsNews.slice(8, 16).map((article, index) => (
                <article 
                  key={article.id} 
                  className="crypto-card"
                  onClick={() => window.open(article.url, '_blank')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">{article.title}</h3>
                    <p className="crypto-card-description">{article.description}</p>
                    <div className="crypto-card-meta">
                      <span className="crypto-card-source">{article.source.name}</span>
                      <span className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories Grid - Latest Political News */}
        {politicsNews.length > 16 && (
          <section className="categories-section">
            <h3 style={{ textAlign: 'center', margin: '30px 0', color: '#555' }}>
              Latest Political Developments
            </h3>
            <div className="categories-grid">
              {[0, 1, 2, 3].map(columnIndex => (
                <div key={columnIndex} className="category-column">
                  {politicsNews.slice(16 + columnIndex * 3, 16 + (columnIndex + 1) * 3).map((article, index) => (
                    <article 
                      key={article.id}
                      className={`category-card ${index === 0 ? 'featured' : ''}`}
                      onClick={() => window.open(article.url, '_blank')}
                      style={{ cursor: 'pointer' }}
                    >
                      {index === 0 && (
                        <div className="category-card-image">
                          <img 
                            src={article.imageUrl || "/ttttttt.jpg"} 
                            alt={article.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/ttttttt.jpg";
                            }}
                          />
                        </div>
                      )}
                      <div className="category-card-content">
                        <h3 className="category-card-title">{article.title}</h3>
                        <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Statistics */}
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          background: '#f8f9fa',
          margin: '30px 0',
          borderRadius: '10px'
        }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            📊 Showing {politicsNews.length} political articles • 
            Updated {formatTimeAgo(politicsNews[0]?.publishedAt || new Date().toISOString())}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Politics;