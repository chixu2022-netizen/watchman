import React, { useState, useEffect } from 'react';
import { CategoryPageData } from '../types/news';
// import { newsAPI } from '../services/newsAPI'; // Disabled due to CORS
import { mockNewsAPI } from '../services/mockNewsData'; // Using mock data
import Footer from './Footer';
import '../pages/Home.css'; // Use the same CSS as Home

interface DynamicSectionProps {
  category: string;
  title?: string;
  loading?: boolean;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ 
  category, 
  title 
}) => {
  const [newsData, setNewsData] = useState<CategoryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<string | null>(null); // Track which section is loading more
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date()); // Track when content was last refreshed

  // Category-specific subcategories mapping
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch news for this category using mock data
        const categoryPageData = await mockNewsAPI.getCategoryPageNews(category);
        setNewsData(categoryPageData);
        setLastRefresh(new Date()); // Update refresh timestamp
      } catch (err) {
        console.error('Error fetching category news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category]);

  // Load more articles for all sections
  const loadMoreArticles = async (sectionType: string) => {
    if (!newsData) return;
    
    setLoadingMore(sectionType);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate more mock articles (in real app, this would be an API call)
      const newArticles = await mockNewsAPI.getCategoryPageNews(category);
      
      // Update all sections with new articles
      setNewsData(prevData => {
        if (!prevData) return prevData;
        
        const updatedData = { ...prevData };
        
        // Add more articles to all sections
        updatedData.worldNews = [...prevData.worldNews, ...newArticles.worldNews.slice(4, 8)];
        updatedData.categoryUpdates = [...prevData.categoryUpdates, ...newArticles.categoryUpdates.slice(4, 8)];
        
        // Add more articles to all subcategories
        Object.keys(prevData.subCategories).forEach(subCat => {
          updatedData.subCategories[subCat] = [
            ...prevData.subCategories[subCat], 
            ...newArticles.subCategories[subCat].slice(2, 4)
          ];
        });
        
        return updatedData;
      });
    } catch (err) {
      console.error('Error loading more articles:', err);
    } finally {
      setLoadingMore(null);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <div className="home__container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading {title || category} news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="home">
        <div className="home__container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>{error || 'Unable to load news at this time.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const { worldNews, categoryUpdates, subCategories, pagination } = newsData;
  const subCategoryNames = Object.keys(subCategories);

  // Component for NEW badge
  const NewBadge: React.FC<{ article: any }> = ({ article }) => {
    return article.isNew ? <span className="new-badge">NEW</span> : null;
  };

  // Manual refresh function
  const refreshContent = async () => {
    setLoading(true);
    try {
      const categoryPageData = await mockNewsAPI.getCategoryPageNews(category);
      setNewsData(categoryPageData);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Error refreshing content:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="home__container">
        {/* World News Section */}
        <section id="world-news-section" className="world-section">
          <div className="world-header">
            <h2 id="world-title" className="world-title">
              <a href="/world" className="world-link">{title || category.charAt(0).toUpperCase() + category.slice(1)} World News &gt;</a>
              <span className="id-label">world-title</span>
            </h2>
          </div>
          
          <div id="world-cards-container" className="world-cards">
            <span className="id-label">world-cards-container</span>
            
            {worldNews.map((article, index) => (
              <article key={article.id} id={`world-card-${index + 1}`} className="world-card">
                <span className="id-label">world-card-{index + 1}</span>
                <div className="world-card-image">
                  <img src={article.imageUrl || '/ttttttt.jpg'} alt={article.title} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">
                    {article.title}
                    <NewBadge article={article} />
                  </h3>
                  <p className="world-card-time">
                    {(() => {
                      const now = new Date();
                      const published = new Date(article.publishedAt);
                      const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
                      
                      if (diffInMinutes < 1) return 'Just now';
                      if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
                      
                      const diffInHours = Math.floor(diffInMinutes / 60);
                      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                      
                      const diffInDays = Math.floor(diffInHours / 24);
                      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                    })()}
                  </p>
                </div>
              </article>
            ))}
          </div>
          

        </section>

        {/* Category Updates Section */}
        <section id="crypto-section" className="crypto-section">
          <div className="crypto-header">
            <h2 id="crypto-title" className="crypto-title">
              <a href={`/${category}`} className="crypto-link">Latest {title || category.charAt(0).toUpperCase() + category.slice(1)} Updates &gt;</a>
              <span className="id-label">crypto-title</span>
            </h2>
          </div>
          
          <div id="crypto-cards-container" className="crypto-cards">
            <span className="id-label">crypto-cards-container</span>
            
            {categoryUpdates.map((article, index) => (
              <article key={article.id} id={`crypto-card-${index + 1}`} className="crypto-card">
                <span className="id-label">crypto-card-{index + 1}</span>
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">
                    {article.title}
                    <NewBadge article={article} />
                  </h3>
                  <p className="crypto-card-time">
                    {(() => {
                      const now = new Date();
                      const published = new Date(article.publishedAt);
                      const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
                      
                      if (diffInMinutes < 1) return 'Just now';
                      if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
                      
                      const diffInHours = Math.floor(diffInMinutes / 60);
                      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                      
                      const diffInDays = Math.floor(diffInHours / 24);
                      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                    })()}
                  </p>
                </div>
              </article>
            ))}
          </div>
          

        </section>

        {/* Categories Section */}
        <section id="categories-section" className="categories-section">
          <span className="id-label">categories-section</span>
          <div className="categories-grid">
            {subCategoryNames.slice(0, 4).map((subCat, colIndex) => (
              <div key={subCat} id={`${subCat.toLowerCase()}-column`} className="category-column">
                <span className="id-label">{subCat.toLowerCase()}-column</span>
                <h2 id={`${subCat.toLowerCase()}-header`} className="category-header">
                  <span className="id-label">{subCat.toLowerCase()}-header</span>
                  <button className="category-link" onClick={() => window.location.href = `/${subCat.toLowerCase()}`}>
                    {subCat}
                  </button>
                  <span className="arrow-symbol">›</span>
                </h2>
                
                {subCategories[subCat].map((article, cardIndex) => (
                  <article 
                    key={article.id} 
                    id={`${subCat.toLowerCase()}-card-${cardIndex + 1}`} 
                    className={`category-card ${cardIndex === 0 ? 'featured' : ''}`}
                  >
                    <span className="id-label">{subCat.toLowerCase()}-card-{cardIndex + 1}</span>
                    {cardIndex === 0 && (
                      <div className="category-card-image">
                        <img src={article.imageUrl || '/ttttttt.jpg'} alt={article.title} />
                      </div>
                    )}
                    <div className="category-card-content">
                      <h3 className="category-card-title">
                        {article.title}
                        <NewBadge article={article} />
                      </h3>
                      <p className="category-card-time">
                        {(() => {
                          const now = new Date();
                          const published = new Date(article.publishedAt);
                          const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
                          
                          if (diffInMinutes < 1) return 'Just now';
                          if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
                          
                          const diffInHours = Math.floor(diffInMinutes / 60);
                          if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                          
                          const diffInDays = Math.floor(diffInHours / 24);
                          return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                        })()}
                      </p>
                    </div>
                  </article>
                ))}
                

              </div>
            ))}
          </div>
        </section>

        {/* Single Load More Button at Bottom */}
        <div style={{ 
          textAlign: 'center', 
          margin: '40px 0 60px 0', 
          padding: '20px 0',
          borderTop: '1px solid #e0e0e0'
        }}>
          <button 
            onClick={() => loadMoreArticles('all')}
            disabled={loadingMore === 'all'}
            style={{
              background: 'transparent',
              border: '2px solid #333',
              color: '#333',
              padding: '12px 32px',
              borderRadius: '25px',
              cursor: loadingMore === 'all' ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              minWidth: '140px'
            }}
          >
            {loadingMore === 'all' ? 'Loading...' : 'Load more'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicSection;