import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { newsAPI } from '../services/newsAPI';
import { NewsArticle } from '../types/news';
import './Home.css'; // Use the same CSS as Home

// Using NewsArticle from types/news.ts

interface NewsData {
  worldNews: NewsArticle[];
  healthUpdates: NewsArticle[];
  healthNews: NewsArticle[];
  healthStories: NewsArticle[];
  healthReports: NewsArticle[];
  healthBreaking: NewsArticle[];
  // Duplicate sections
  worldNews2: NewsArticle[];
  healthUpdates2: NewsArticle[];
  healthNews2: NewsArticle[];
  healthStories2: NewsArticle[];
  healthReports2: NewsArticle[];
  healthBreaking2: NewsArticle[];
  worldNews3: NewsArticle[];
  healthUpdates3: NewsArticle[];
  healthNews3: NewsArticle[];
  healthStories3: NewsArticle[];
  healthReports3: NewsArticle[];
  healthBreaking3: NewsArticle[];
}

const Health: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    worldNews: [],
    healthUpdates: [],
    healthNews: [],
    healthStories: [],
    healthReports: [],
    healthBreaking: [],
    // Duplicate sections
    worldNews2: [],
    healthUpdates2: [],
    healthNews2: [],
    healthStories2: [],
    healthReports2: [],
    healthBreaking2: [],
    worldNews3: [],
    healthUpdates3: [],
    healthNews3: [],
    healthStories3: [],
    healthReports3: [],
    healthBreaking3: []
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
    description: 'World news description',
    imageUrl: "/ttttttt.jpg",
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    url: "#",
    source: { name: 'Health News' },
    category: 'health'
  });

  const loadMoreArticles = async () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const newSection = [
        mockArticle('Breaking: New Alzheimer treatment shows 60% success rate'),
        mockArticle('Revolutionary gene therapy approved for rare diseases'),
        mockArticle('Mental health apps reduce depression symptoms by half'),
        mockArticle('Global health partnership launches malaria eradication program')
      ];
      
      setAdditionalSections(prev => [...prev, newSection]);
      setLoadingMore(false);
    }, 1000);
  };
  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      
      // Mock data to avoid API rate limits
      const mockArticle = (title: string, imageUrl: string = "/ttttttt.jpg"): NewsArticle => ({
        id: Math.random().toString(),
        title,
        description: 'Health news and medical breakthroughs',
        imageUrl: imageUrl,
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        url: "#",
        source: { name: 'Health News' },
        category: 'health'
      });

      setTimeout(() => {
        setNewsData({
          worldNews: [
            mockArticle('WHO announces breakthrough in cancer treatment research', '/wm01.jpeg'),
            mockArticle('Mental health awareness programs show positive results globally', '/placeholders/placeholder1.svg'),
            mockArticle('New vaccine technology promises faster pandemic response', '/ttttttt.jpg'),
            mockArticle('Telemedicine adoption transforms healthcare accessibility', '/placeholders/placeholder2.svg')
          ],
          healthUpdates: [
            mockArticle('Heart disease prevention methods show 40% improvement rate', '/wm01.jpeg'),
            mockArticle('AI-powered diagnostics revolutionize early disease detection', '/ttttttt.jpg'),
            mockArticle('Personalized medicine approaches gain FDA approval', '/placeholders/placeholder1.svg'),
            mockArticle('Global health initiatives reduce maternal mortality by 30%', '/placeholders/placeholder2.svg')
          ],
          healthNews: [
            mockArticle('Exercise prescriptions prove more effective than medication', '/wm01.jpeg'),
            mockArticle('Breakthrough study links gut health to mental wellness', '/ttttttt.jpg')
          ],
          healthStories: [
            mockArticle('Diabetes management apps help millions control blood sugar', '/placeholders/placeholder1.svg'),
            mockArticle('Gene therapy trials show promising results for rare diseases', '/placeholders/placeholder2.svg')
          ],
          healthReports: [
            mockArticle('Nutrition education programs reduce childhood obesity rates', '/wm01.jpeg'),
            mockArticle('Sleep studies reveal optimal rest patterns for longevity', '/ttttttt.jpg')
          ],
          healthBreaking: [
            mockArticle('Emergency medical services adopt drone delivery systems', '/placeholders/placeholder1.svg'),
            mockArticle('Universal healthcare initiatives expand coverage globally', '/placeholders/placeholder2.svg')
          ],
          // Duplicate sections with slight variations
          worldNews2: [
            mockArticle('Robotic surgery advances reduce recovery times significantly', '/ttttttt.jpg'),
            mockArticle('Mental health support programs expand to underserved communities', '/wm01.jpeg'),
            mockArticle('Biomedical research receives $10 billion funding boost', '/placeholders/placeholder1.svg'),
            mockArticle('Global health partnerships combat infectious diseases', '/placeholders/placeholder2.svg')
          ],
          healthUpdates2: [
            mockArticle('Chronic pain management breakthroughs offer new hope', '/wm01.jpeg'),
            mockArticle('Immunotherapy treatments show success in multiple cancers', '/ttttttt.jpg'),
            mockArticle('Digital health records improve patient care coordination', '/placeholders/placeholder1.svg'),
            mockArticle('Preventive care programs reduce healthcare costs by 25%', '/placeholders/placeholder2.svg')
          ],
          healthNews2: [
            mockArticle('Alzheimer research reveals promising therapeutic targets', '/placeholders/placeholder1.svg'),
            mockArticle('Maternal health initiatives save thousands of lives annually', '/wm01.jpeg')
          ],
          healthStories2: [
            mockArticle('Wearable health devices detect early signs of illness', '/ttttttt.jpg'),
            mockArticle('Community health workers bridge gaps in rural healthcare', '/placeholders/placeholder2.svg')
          ],
          healthReports2: [
            mockArticle('Antibiotic resistance strategies show effectiveness worldwide', '/placeholders/placeholder1.svg'),
            mockArticle('Public health campaigns reduce smoking rates to historic lows', '/wm01.jpeg')
          ],
          healthBreaking2: [
            mockArticle('Precision medicine tailors treatments to individual genetics', '/ttttttt.jpg'),
            mockArticle('Healthcare automation improves efficiency and reduces errors', '/placeholders/placeholder2.svg')
          ],
          worldNews3: [
            mockArticle('Organ transplant success rates reach all-time highs globally', '/wm01.jpeg'),
            mockArticle('Health equity programs address disparities in medical care', '/placeholders/placeholder1.svg'),
            mockArticle('Breakthrough treatments for rare diseases gain approval', '/ttttttt.jpg'),
            mockArticle('Global vaccination campaigns achieve 95% coverage targets', '/placeholders/placeholder2.svg')
          ],
          healthUpdates3: [
            mockArticle('Stem cell therapy shows promise for spinal cord injuries', '/placeholders/placeholder1.svg'),
            mockArticle('Nutrition research reveals optimal diets for disease prevention', '/wm01.jpeg'),
            mockArticle('Medical device innovations improve quality of life dramatically', '/ttttttt.jpg'),
            mockArticle('Healthcare workforce training programs address skill shortages', '/placeholders/placeholder2.svg')
          ],
          healthNews3: [
            mockArticle('Clinical trials accelerate with AI-powered patient matching', '/wm01.jpeg'),
            mockArticle('Public health interventions reduce infectious disease spread', '/placeholders/placeholder1.svg')
          ],
          healthStories3: [
            mockArticle('Pediatric medicine advances offer hope for childhood diseases', '/ttttttt.jpg'),
            mockArticle('Elder care innovations support aging populations worldwide', '/placeholders/placeholder2.svg')
          ],
          healthReports3: [
            mockArticle('Health insurance reforms expand coverage to millions', '/placeholders/placeholder1.svg'),
            mockArticle('Environmental health studies link pollution to disease outcomes', '/wm01.jpeg')
          ],
          healthBreaking3: [
            mockArticle('Emergency response systems save lives with faster interventions', '/ttttttt.jpg'),
            mockArticle('Health technology startups attract record venture capital', '/placeholders/placeholder2.svg')
          ]
        });
        setLoading(false);
      }, 1000); // Simulate loading time
    };

  const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({
    id: Math.random().toString(),
    title,
    description: 'Health news and medical breakthroughs',
    imageUrl: "/ttttttt.jpg",
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    url: "#",
    source: { name: 'Health News' },
    category: 'health'
  });

  const loadMoreArticles = async () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const newSection = [
        mockArticle('Breaking: Breakthrough in diabetes treatment shows promise'),
        mockArticle('Telehealth services expand to rural communities worldwide'),
        mockArticle('Cancer immunotherapy achieves 80% remission rates'),
        mockArticle('Global vaccination initiative prevents 2 million deaths annually')
      ];
      
      setAdditionalSections(prev => [...prev, newSection]);
      setLoadingMore(false);
    }, 1000);
  };
    loadAllNews();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container" style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading health news...</p>
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

        {/* Health Updates Section */}
        <section className="crypto-section">          
          <div className="crypto-cards">            
            {newsData.healthUpdates.map((article, index) => (
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
            {/* Health News Column */}
            <div className="category-column">
              
              {newsData.healthNews.map((article: NewsArticle, index: number) => (
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

            {/* Health Stories Column */}
            <div className="category-column">
              
              {newsData.healthStories.map((article: NewsArticle, index: number) => (
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

            {/* Health Reports Column */}
            <div className="category-column">
              
              {newsData.healthReports.map((article: NewsArticle, index: number) => (
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

            {/* Health Breaking Column */}
            <div className="category-column">
              
              {newsData.healthBreaking.map((article: NewsArticle, index: number) => (
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

        {/* DUPLICATE SET 1 - Health Updates Section */}
        <section className="crypto-section">          
          <div className="crypto-cards">            
            {newsData.healthUpdates2.map((article: NewsArticle, index: number) => (
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
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Bitcoin layer 2 development" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Bitcoin Layer 2 solutions process 1M transactions daily</h3>
                  <p className="category-card-time">40 mins ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Taproot adoption reaches 80% among Bitcoin nodes</h3>
                <p className="category-card-time">1.5 hours ago</p>
              </article>
            </div>

            {/* Ethereum Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Ethereum sharding upgrade" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Ethereum sharding testnet achieves 100,000 TPS milestone</h3>
                  <p className="category-card-time">55 mins ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">EIP-4844 reduces transaction costs by 90% on rollups</h3>
                <p className="category-card-time">2.5 hours ago</p>
              </article>
            </div>

            {/* DeFi Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Cross-chain DeFi protocol" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Cross-chain DeFi protocol enables seamless asset bridging</h3>
                  <p className="category-card-time">1.2 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Algorithmic stablecoin maintains perfect peg for 6 months</h3>
                <p className="category-card-time">3.5 hours ago</p>
              </article>
            </div>

            {/* NFTs Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Dynamic NFT marketplace" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Dynamic NFTs change based on real-world data feeds</h3>
                  <p className="category-card-time">1.8 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Music NFTs generate $50M in royalties for artists</h3>
                <p className="category-card-time">4.2 hours ago</p>
              </article>
            </div>
          </div>
        </section>

        {/* DUPLICATE SET 2 - World News Section */}
        <section className="world-section">
          
          <div className="world-cards">
            
            <article className="world-card">
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Crypto staking rewards" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Proof-of-stake networks offer 12% average staking rewards</h3>
                <p className="world-card-time">4 hours ago</p>
              </div>
            </article>

            <article className="world-card">
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Decentralized identity" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Decentralized identity platform reaches 5M verified users</h3>
                <p className="world-card-time">6 hours ago</p>
              </div>
            </article>

            <article className="world-card">
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Crypto derivatives market" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Crypto derivatives market surpasses $3 trillion in volume</h3>
                <p className="world-card-time">8 hours ago</p>
              </div>
            </article>

            <article className="world-card">
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Quantum-resistant blockchain" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Quantum-resistant blockchain launches with post-quantum cryptography</h3>
                <p className="world-card-time">10 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* DUPLICATE SET 2 - Crypto Updates Section */}
        <section className="crypto-section">
          
          <div className="crypto-cards">
            
            <article className="crypto-card">
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Cosmos ecosystem introduces interchain security for 50 zones</h3>
                <p className="crypto-card-time">35 mins ago</p>
              </div>
            </article>

            <article className="crypto-card">
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Arbitrum One becomes fastest growing Layer 2 with 2M users</h3>
                <p className="crypto-card-time">1 hour ago</p>
              </div>
            </article>

            <article className="crypto-card">
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Polkadot parachain auctions raise $2B for ecosystem projects</h3>
                <p className="crypto-card-time">1.8 hours ago</p>
              </div>
            </article>

            <article className="crypto-card">
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Binance Smart Chain upgrades consensus mechanism for efficiency</h3>
                <p className="crypto-card-time">2.8 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* DUPLICATE SET 2 - Categories Section */}
        <section className="categories-section">
          <div className="categories-grid">
            {/* Bitcoin Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Bitcoin ordinals growth" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Bitcoin Ordinals marketplace sees 500% growth in collections</h3>
                  <p className="category-card-time">50 mins ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">RGB protocol enables smart contracts on Bitcoin network</h3>
                <p className="category-card-time">1.8 hours ago</p>
              </article>
            </div>

            {/* Ethereum Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Ethereum validators growth" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Ethereum validator count reaches 1 million active nodes</h3>
                  <p className="category-card-time">1.1 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Account abstraction wallets gain 2M users in one month</h3>
                <p className="category-card-time">2.8 hours ago</p>
              </article>
            </div>

            {/* DeFi Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="DeFi insurance protocol" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">DeFi insurance protocol covers $10B in smart contract risks</h3>
                  <p className="category-card-time">1.5 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Automated market makers process $50B weekly volume</h3>
                <p className="category-card-time">3.8 hours ago</p>
              </article>
            </div>

            {/* NFTs Column */}
            <div className="category-column">
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="NFT fractionalization" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">NFT fractionalization enables shared ownership of rare assets</h3>
                  <p className="category-card-time">2.1 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">Virtual real estate NFTs generate $25M in monthly sales</h3>
                <p className="category-card-time">4.5 hours ago</p>
              </article>
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
            backgroundColor: 'transparent',
            color: '#6c757d',
            border: '1px solid #6c757d',
            padding: '12px 30px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
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

export default Health;