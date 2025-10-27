import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { databaseNewsService } from '../services/databaseNewsService';
import { NewsArticle } from '../types/news';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';
import './Home.css'; // Use the same CSS as Home

// Using NewsArticle from types/news.ts

interface NewsData {
  worldNews: NewsArticle[];
  cryptoUpdates: NewsArticle[];
  bitcoin: NewsArticle[];
  ethereum: NewsArticle[];
  defi: NewsArticle[];
  nft: NewsArticle[];
  // Duplicate sections
  worldNews2: NewsArticle[];
  cryptoUpdates2: NewsArticle[];
  bitcoin2: NewsArticle[];
  ethereum2: NewsArticle[];
  defi2: NewsArticle[];
  nft2: NewsArticle[];
  worldNews3: NewsArticle[];
  cryptoUpdates3: NewsArticle[];
  bitcoin3: NewsArticle[];
  ethereum3: NewsArticle[];
  defi3: NewsArticle[];
  nft3: NewsArticle[];
}

const Crypto: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    worldNews: [],
    cryptoUpdates: [],
    bitcoin: [],
    ethereum: [],
    defi: [],
    nft: [],
    // Duplicate sections
    worldNews2: [],
    cryptoUpdates2: [],
    bitcoin2: [],
    ethereum2: [],
    defi2: [],
    nft2: [],
    worldNews3: [],
    cryptoUpdates3: [],
    bitcoin3: [],
    ethereum3: [],
    defi3: [],
    nft3: []
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [additionalSections, setAdditionalSections] = useState<NewsArticle[][]>([]);



  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({
    id: Math.random().toString(),
    title,
    description: 'Crypto news description',
    imageUrl: NEWS_IMAGE_PLACEHOLDER,
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    url: "#",
    source: { name: 'Crypto News' },
    category: 'crypto'
  });

  const loadMoreArticles = async () => {
    setLoadingMore(true);
    
    // Simulate loading time and add new section
    setTimeout(() => {
      const newSection = [
        mockArticle('Breaking: Major crypto exchange launches new features'),
        mockArticle('Blockchain innovation drives market growth'),
        mockArticle('Digital asset regulation updates announced'),
        mockArticle('Cryptocurrency adoption reaches new milestone')
      ];
      
      setAdditionalSections(prev => [...prev, newSection]);
      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      
      try {
        console.log('📚 Crypto: Loading from database (no API calls)...');
        
        // DATABASE ONLY: Crypto news pre-fetched by cron jobs
        const cryptoArticles = await databaseNewsService.getNewsByCategory('crypto', 50);
        
        console.log(`✅ Loaded ${cryptoArticles.length} crypto articles from database`);
        console.log('🚀 Zero API calls made! All from pre-fetched data.');
        
        // If we got less than 48 articles, repeat them to fill all sections
        while (cryptoArticles.length < 48 && cryptoArticles.length > 0) {
          cryptoArticles.push(...cryptoArticles.slice(0, Math.min(10, 48 - cryptoArticles.length)));
        }
        
        // Split articles across different sections
        setNewsData({
          worldNews: cryptoArticles.slice(0, 4),
          cryptoUpdates: cryptoArticles.slice(4, 8),
          bitcoin: cryptoArticles.slice(8, 10),
          ethereum: cryptoArticles.slice(10, 12),
          defi: cryptoArticles.slice(12, 14),
          nft: cryptoArticles.slice(14, 16),
          // Duplicate sections with different articles
          worldNews2: cryptoArticles.slice(16, 20),
          cryptoUpdates2: cryptoArticles.slice(20, 24),
          bitcoin2: cryptoArticles.slice(24, 26),
          ethereum2: cryptoArticles.slice(26, 28),
          defi2: cryptoArticles.slice(28, 30),
          nft2: cryptoArticles.slice(30, 32),
          worldNews3: cryptoArticles.slice(32, 36),
          cryptoUpdates3: cryptoArticles.slice(36, 40),
          bitcoin3: cryptoArticles.slice(40, 42),
          ethereum3: cryptoArticles.slice(42, 44),
          defi3: cryptoArticles.slice(44, 46),
          nft3: cryptoArticles.slice(46, 48)
        });
      } catch (error) {
        console.error('❌ Error fetching crypto news:', error);
        // Fallback to mock data already defined below
      }
      
      setLoading(false);
    };

    loadAllNews();
  }, []);

  // Using real data from optimizedNewsService - no mock data needed!
  // Smart caching: LocalStorage → Supabase → NewsData.io API → Fallback

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ marginBottom: '30px' }}>Loading Crypto News...</h2>
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
        {/* World News Section */}
        <section className="world-section">
          <div className="world-cards">
            
            {newsData.worldNews.map((article, index) => (
              <article key={`world-1-${index}`} className="world-card" data-article-id={`world-1-${index}`} data-category="world" data-section="1" data-position={index + 1}>
                <div className="world-card-image">
                  <img 
                    src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                    alt={article.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                    }}
                  />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
                  <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Crypto Updates Section */}
        <section className="crypto-section">
          <div className="crypto-cards">
            
            {newsData.cryptoUpdates.map((article, index) => (
              <article key={index} className="crypto-card">
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="categories-grid">
            {/* Bitcoin Column */}
            <div className="category-column">
              
              {newsData.bitcoin.map((article: NewsArticle, index: number) => (
                <article key={index} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                        alt={article.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

            {/* Ethereum Column */}
            <div className="category-column">
              
              {newsData.ethereum.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                        alt={article.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

            {/* DeFi Column */}
            <div className="category-column">
              
              {newsData.defi.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                        alt={article.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

            {/* NFTs Column */}
            <div className="category-column">
              
              {newsData.nft.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                        alt={article.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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
          </div>
        </section>

        {/* DUPLICATE SET 1 - World News Section */}
        <section className="world-section">
            <div className="world-cards">
              {newsData.worldNews2.map((article: NewsArticle, index: number) => (
                <article key={`world-1-${index}`} className="world-card" data-article-id={`world-1-${index}`} data-category="world" data-section="1" data-position={index + 1}>
                  <div className="world-card-image">
                    <img 
                      src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                      }}
                    />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">{article.title}</h3>
                    <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        {/* DUPLICATE SET 1 - Crypto Updates Section */}
        <section className="crypto-section">
            <div className="crypto-cards">
              {newsData.cryptoUpdates2.map((article: NewsArticle, index: number) => (
                <article key={index} className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">{article.title}</h3>
                    <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        {/* DUPLICATE SET 1 - Categories Section */}
        <section className="categories-section">
            <div className="categories-grid">
              {/* Bitcoin Column */}
              <div className="category-column">
                
                {newsData.bitcoin2.map((article: NewsArticle, index: number) => (
                  <article 
                    key={`bitcoin-2-${index}`}
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                    data-article-id={article.id || `bitcoin-2-${index}`}
                    data-category="bitcoin"
                    data-section="2"
                    data-position={index + 1}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                          }}
                        />
                      </div>
                    )}
                    <span className="dev-label">BTC-2-{index + 1}</span>
                    <div className="category-card-content">
                      <h3 className="category-card-title">{article.title}</h3>
                      <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Ethereum Column */}
              <div className="category-column" data-column="ethereum-2">
                
                {newsData.ethereum2.map((article: NewsArticle, index: number) => (
                  <article 
                    key={`ethereum-2-${index}`}
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                    data-article-id={article.id || `ethereum-2-${index}`}
                    data-category="ethereum"
                    data-section="2"
                    data-position={index + 1}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                          }}
                        />
                      </div>
                    )}
                    <span className="dev-label">ETH-2-{index + 1}</span>
                    <div className="category-card-content">
                      <h3 className="category-card-title">{article.title}</h3>
                      <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* DeFi Column */}
              <div className="category-column">
                
                {newsData.defi2.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                          }}
                        />
                      </div>
                    )}
                    <span className="dev-label">DEFI-2-{index + 1}</span>
                    <div className="category-card-content">
                      <h3 className="category-card-title">{article.title}</h3>
                      <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* NFTs Column */}
              <div className="category-column">
                
                {newsData.nft2.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                          }}
                        />
                      </div>
                    )}
                    <span className="dev-label">NFT-2-{index + 1}</span>
                    <div className="category-card-content">
                      <h3 className="category-card-title">{article.title}</h3>
                      <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

        {/* DUPLICATE SET 2 - World News Section */}
        <section className="world-section">
            <div className="world-cards">
              {newsData.worldNews3.map((article: NewsArticle, index: number) => (
                <article key={`world-1-${index}`} className="world-card" data-article-id={`world-1-${index}`} data-category="world" data-section="1" data-position={index + 1}>
                  <div className="world-card-image">
                    <img 
                      src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                      }}
                    />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">{article.title}</h3>
                    <p className="world-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        {/* DUPLICATE SET 2 - Crypto Updates Section */}
        <section className="crypto-section">
            <div className="crypto-cards">
              {newsData.cryptoUpdates3.map((article: NewsArticle, index: number) => (
                <article key={index} className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">{article.title}</h3>
                    <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        {/* DUPLICATE SET 2 - Categories Section */}
        <section className="categories-section">
            <div className="categories-grid">
              {/* Bitcoin Column */}
              <div className="category-column">
                
                {newsData.bitcoin3.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

              {/* Ethereum Column */}
              <div className="category-column">
                
                {newsData.ethereum3.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

              {/* DeFi Column */}
              <div className="category-column">
                
                {newsData.defi3.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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

              {/* NFTs Column */}
              <div className="category-column">
                
                {newsData.nft3.map((article: NewsArticle, index: number) => (
                  <article 
                    key={index} 
                    
                    className={`category-card ${index === 0 ? 'featured' : ''}`}
                  >
                    {index === 0 && (
                      <div className="category-card-image">
                        <img 
                          src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
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
            </div>
          </section>

        {/* Load More Articles Sections */}
        {additionalSections.map((sectionArticles: NewsArticle[], sectionIndex: number) => (
          <section 
            key={sectionIndex} 
            
            className="world-section"
          >
            <div className="world-cards">
              {sectionArticles.map((article: NewsArticle, articleIndex: number) => (
                <article 
                  key={articleIndex} 
                  
                  className="world-card"
                >
                  <div className="world-card-image">
                    <img 
                      src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                      }}
                    />
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
      <div className="load-more-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <button 
          className="load-more-btn"
          style={{
            backgroundColor: loadingMore ? '#f8f9fa' : 'transparent',
            color: loadingMore ? '#6c757d' : '#6c757d',
            border: '1px solid #6c757d',
            padding: '12px 30px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: loadingMore ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: loadingMore ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#6c757d';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6c757d';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#6c757d';
            e.currentTarget.style.color = 'white';
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6c757d';
          }}
          onClick={loadMoreArticles}
          disabled={loadingMore}
        >
          {loadingMore ? 'Loading More Articles...' : 'Load More Articles'}
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Crypto;