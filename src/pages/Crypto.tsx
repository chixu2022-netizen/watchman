import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { newsAPI } from '../services/newsAPI';
import { NewsArticle } from '../types/news';
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
    imageUrl: "/ttttttt.jpg",
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
      
      // 🔥 NewsAPI Integration (COMMENTED OUT - Ready for activation)
      /*
      try {
        console.log('🚀 Fetching live crypto news from NewsAPI...');
        const [
          cryptoGeneral,
          bitcoinNews, 
          ethereumNews,
          defiNews,
          nftNews
        ] = await Promise.all([
          newsAPI.getNewsByCategory('crypto', 8),
          newsAPI.getNewsByCategory('bitcoin', 4),
          newsAPI.getNewsByCategory('ethereum', 4), 
          newsAPI.getNewsByCategory('defi', 4),
          newsAPI.getNewsByCategory('nft', 4)
        ]);
        
        setNewsData({
          worldNews: cryptoGeneral.slice(0, 4),
          cryptoUpdates: cryptoGeneral.slice(4, 8),
          bitcoin: bitcoinNews,
          ethereum: ethereumNews,
          defi: defiNews,
          nft: nftNews,
          // Duplicate sections with same data
          worldNews2: cryptoGeneral.slice(0, 4),
          cryptoUpdates2: cryptoGeneral.slice(4, 8),
          bitcoin2: bitcoinNews,
          ethereum2: ethereumNews,
          defi2: defiNews,
          nft2: nftNews,
          worldNews3: cryptoGeneral.slice(0, 4),
          cryptoUpdates3: cryptoGeneral.slice(4, 8),
          bitcoin3: bitcoinNews,
          ethereum3: ethereumNews,
          defi3: defiNews,
          nft3: nftNews
        });
      } catch (error) {
        console.error('❌ Error fetching crypto news:', error);
        // Fallback to mock data
      }
      */
      
      // Mock data (TEMPORARY - Will be replaced with live news)
      const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({
        id: Math.random().toString(),
        title,
        description: 'Crypto news description',
        imageUrl: "/ttttttt.jpg",
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        url: "#",
        source: { name: 'Crypto News' },
        category: 'crypto'
      });

      setTimeout(() => {
        setNewsData({
          worldNews: [
            mockArticle('Bitcoin ETF approval drives crypto market surge'),
            mockArticle('Ethereum 2.0 staking rewards hit new high'),
            mockArticle('Major bank announces crypto custody services'),
            mockArticle('Regulatory clarity boosts institutional adoption')
          ],
          cryptoUpdates: [
            mockArticle('Bitcoin price breaks $45,000 resistance level'),
            mockArticle('DeFi protocol launches on Ethereum mainnet'),
            mockArticle('NFT marketplace reports record trading volume'),
            mockArticle('Central bank digital currency pilot begins')
          ],
          bitcoin: [
            mockArticle('Bitcoin mining difficulty reaches all-time high'),
            mockArticle('Lightning Network adoption accelerates globally')
          ],
          ethereum: [
            mockArticle('Ethereum gas fees drop to lowest level in months'),
            mockArticle('Smart contract security audit reveals vulnerabilities')
          ],
          defi: [
            mockArticle('DeFi total value locked surpasses $100 billion'),
            mockArticle('Yield farming rewards drive protocol growth')
          ],
          nft: [
            mockArticle('Digital art NFT sells for record-breaking price'),
            mockArticle('Gaming NFTs gain mainstream adoption')
          ],
          // Duplicate sections with slight variations
          worldNews2: [
            mockArticle('Cryptocurrency regulation framework announced'),
            mockArticle('Blockchain technology adoption in healthcare'),
            mockArticle('Stablecoin market cap reaches new milestone'),
            mockArticle('Crypto exchange implements enhanced security')
          ],
          cryptoUpdates2: [
            mockArticle('Altcoin season drives market diversification'),
            mockArticle('Institutional investors increase crypto holdings'),
            mockArticle('Cross-chain bridge launches for multi-asset swaps'),
            mockArticle('Crypto lending platform offers competitive rates')
          ],
          bitcoin2: [
            mockArticle('Bitcoin spot ETF sees massive inflows'),
            mockArticle('Hash rate recovery signals network strength')
          ],
          ethereum2: [
            mockArticle('Layer 2 solutions reduce transaction costs'),
            mockArticle('Ethereum roadmap updates focus on scalability')
          ],
          defi2: [
            mockArticle('Decentralized exchange launches governance token'),
            mockArticle('Liquidity mining rewards attract new users')
          ],
          nft2: [
            mockArticle('Music industry embraces NFT technology'),
            mockArticle('Virtual real estate NFTs gain investor interest')
          ],
          worldNews3: [
            mockArticle('Global crypto adoption hits 100 million users'),
            mockArticle('Central banks explore digital currency benefits'),
            mockArticle('Cryptocurrency becomes legal tender in new country'),
            mockArticle('Blockchain innovation drives financial inclusion')
          ],
          cryptoUpdates3: [
            mockArticle('Crypto market cap approaches $2 trillion'),
            mockArticle('Environmental concerns drive green crypto initiatives'),
            mockArticle('Institutional custody solutions gain traction'),
            mockArticle('Regulatory sandbox launches for crypto startups')
          ],
          bitcoin3: [
            mockArticle('Bitcoin network processes record transactions'),
            mockArticle('Corporate treasuries add Bitcoin reserves')
          ],
          ethereum3: [
            mockArticle('Ethereum developers announce major upgrade'),
            mockArticle('Enterprise blockchain adoption accelerates')
          ],
          defi3: [
            mockArticle('Flash loan attacks highlight protocol security'),
            mockArticle('Synthetic assets expand DeFi possibilities')
          ],
          nft3: [
            mockArticle('Sports NFTs create new fan engagement'),
            mockArticle('Metaverse land sales reach unprecedented levels')
          ]
        });
        setLoading(false);
      }, 1000); // Simulate loading time
    };

    loadAllNews();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading crypto news...</p>
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
                    src={article.imageUrl || "/ttttttt.jpg"} 
                    alt={article.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
          </div>
        </section>

        {/* DUPLICATE SET 1 - World News Section */}
        <section className="world-section">
            <div className="world-cards">
              {newsData.worldNews2.map((article: NewsArticle, index: number) => (
                <article key={`world-1-${index}`} className="world-card" data-article-id={`world-1-${index}`} data-category="world" data-section="1" data-position={index + 1}>
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
                          src={article.imageUrl || "/ttttttt.jpg"} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
                          src={article.imageUrl || "/ttttttt.jpg"} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
                          src={article.imageUrl || "/ttttttt.jpg"} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
                          src={article.imageUrl || "/ttttttt.jpg"} 
                          alt={article.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
                      src={article.imageUrl || "/ttttttt.jpg"} 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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
                      src={article.imageUrl || "/ttttttt.jpg"} 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/ttttttt.jpg";
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