import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { databaseNewsService } from '../services/databaseNewsService';
import { NewsArticle } from '../types/news';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';
import './Home.css';

interface CategoryPageTemplateProps {
  category: string;
  title: string;
}

/**
 * Category Page Template - EXACT SAME as Crypto.tsx structure
 * 48 articles total across 3 duplicate sets
 */
const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({ category, title }) => {
  const [newsData, setNewsData] = useState<{
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
  }>({
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
    const moreArticles = await databaseNewsService.getNewsByCategory(category, 4);
    setAdditionalSections(prev => [...prev, moreArticles]);
    setLoadingMore(false);
  };

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      
      try {
        console.log(`📚 ${category}: Loading from database (no API calls)...`);
        const articles = await databaseNewsService.getNewsByCategory(category, 50);
        console.log(`✅ Loaded ${articles.length} ${category} articles from database`);
        
        // If less than 48, repeat them to fill all sections
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
        console.error(`❌ Error fetching ${category}:`, error);
      }
      
      setLoading(false);
    };

    loadAllNews();
  }, [category]);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ marginBottom: '30px' }}>Loading {title} News...</h2>
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
        {/* World News Section 1 */}
        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Updates Section 1 */}
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

        {/* Categories Section 1 */}
        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1, newsData.sub2, newsData.sub3, newsData.sub4].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
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

        {/* World News Section 2 */}
        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews2.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Updates Section 2 */}
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

        {/* Categories Section 2 */}
        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1_2, newsData.sub2_2, newsData.sub3_2, newsData.sub4_2].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
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

        {/* World News Section 3 */}
        <section className="world-section">
          <div className="world-cards">
            {newsData.worldNews3.map((article, index) => (
              <article key={index} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Updates Section 3 */}
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

        {/* Categories Section 3 */}
        <section className="categories-section">
          <div className="categories-grid">
            {[newsData.sub1_3, newsData.sub2_3, newsData.sub3_3, newsData.sub4_3].map((subNews, colIndex) => (
              <div key={colIndex} className="category-column">
                {subNews.map((article, index) => (
                  <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                    {index === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
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

        {/* Additional Load More Sections */}
        {additionalSections.map((sectionArticles, sectionIndex) => (
          <section key={sectionIndex} className="world-section">
            <div className="world-cards">
              {sectionArticles.map((article, articleIndex) => (
                <article key={articleIndex} className="world-card">
                  <div className="world-card-image">
                    <img src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} alt={article.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER; }} />
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

      {/* Load More Button */}
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

export default CategoryPageTemplate;
