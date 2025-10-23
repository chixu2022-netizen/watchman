import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { optimizedNewsService } from '../services/optimizedNewsService';
import { NewsArticle } from '../types/news';
import LoadingSkeleton from '../components/LoadingSkeleton';
import './Home.css';

interface NewsData {
  worldNews: NewsArticle[];
  updates: NewsArticle[];
  sub1: NewsArticle[];
  sub2: NewsArticle[];
  sub3: NewsArticle[];
  sub4: NewsArticle[];
  worldNews2: NewsArticle[];
  updates2: NewsArticle[];
  sub1_2: NewsArticle[];
  sub2_2: NewsArticle[];
  sub3_2: NewsArticle[];
  sub4_2: NewsArticle[];
  worldNews3: NewsArticle[];
  updates3: NewsArticle[];
  sub1_3: NewsArticle[];
  sub2_3: NewsArticle[];
  sub3_3: NewsArticle[];
  sub4_3: NewsArticle[];
}

const Business: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    worldNews: [], updates: [], sub1: [], sub2: [], sub3: [], sub4: [],
    worldNews2: [], updates2: [], sub1_2: [], sub2_2: [], sub3_2: [], sub4_2: [],
    worldNews3: [], updates3: [], sub1_3: [], sub2_3: [], sub3_3: [], sub4_3: []
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [additionalSections, setAdditionalSections] = useState<NewsArticle[][]>([]);

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const loadMoreArticles = async () => {
    setLoadingMore(true);
    const moreArticles = await optimizedNewsService.getNewsByCategory('business', 4);
    setAdditionalSections(prev => [...prev, moreArticles]);
    setLoadingMore(false);
  };

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      
      try {
        console.log('📰 Fetching STRICTLY POLITICS NEWS with smart caching...');
        const articles = await optimizedNewsService.getNewsByCategory('business', 50);
        console.log(`✅ Loaded ${articles.length} business articles`);
        
        while (articles.length < 48 && articles.length > 0) {
          articles.push(...articles.slice(0, Math.min(10, 48 - articles.length)));
        }
        
        setNewsData({
          worldNews: articles.slice(0, 4),
          updates: articles.slice(4, 8),
          sub1: articles.slice(8, 10),
          sub2: articles.slice(10, 12),
          sub3: articles.slice(12, 14),
          sub4: articles.slice(14, 16),
          worldNews2: articles.slice(16, 20),
          updates2: articles.slice(20, 24),
          sub1_2: articles.slice(24, 26),
          sub2_2: articles.slice(26, 28),
          sub3_2: articles.slice(28, 30),
          sub4_2: articles.slice(30, 32),
          worldNews3: articles.slice(32, 36),
          updates3: articles.slice(36, 40),
          sub1_3: articles.slice(40, 42),
          sub2_3: articles.slice(42, 44),
          sub3_3: articles.slice(44, 46),
          sub4_3: articles.slice(46, 48)
        });
      } catch (error) {
        console.error('❌ Error fetching business news:', error);
      }
      
      setLoading(false);
    };

    loadAllNews();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ marginBottom: '30px' }}>Loading Business News...</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            <LoadingSkeleton variant="card" count={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__container">
        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="crypto-section">
          <div className="crypto-cards">
            {newsData.updates.map((article, index) => (
              <article key={index} className="crypto-card">
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1, newsData.sub2, newsData.sub3, newsData.sub4].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
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

        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews2.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="crypto-section">
          <div className="crypto-cards">
            {newsData.updates2.map((article, index) => (
              <article key={index} className="crypto-card">
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1_2, newsData.sub2_2, newsData.sub3_2, newsData.sub4_2].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
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

        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews3.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="crypto-section">
          <div className="crypto-cards">
            {newsData.updates3.map((article, index) => (
              <article key={index} className="crypto-card">
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1_3, newsData.sub2_3, newsData.sub3_3, newsData.sub4_3].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
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

        {additionalSections.map((sectionArticles, sectionIndex) => (
          <section key={sectionIndex} className="world-section">
            <div className="world-cards">
              {sectionArticles.map((article, articleIndex) => (
                <article key={articleIndex} className="world-card">
                  <div className="world-card-image">
                    <img src={article.imageUrl || "/ttttttt.jpg"} alt={article.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = "/ttttttt.jpg"; }} />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">{article.title}</h3>
                    <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <button onClick={loadMoreArticles} disabled={loadingMore}
          style={{
            background: loadingMore ? '#f8f9fa' : 'transparent',
            color: '#6c757d', border: '1px solid #6c757d',
            padding: '12px 30px', fontSize: '16px', borderRadius: '6px',
            cursor: loadingMore ? 'not-allowed' : 'pointer'
          }}>
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Business;
