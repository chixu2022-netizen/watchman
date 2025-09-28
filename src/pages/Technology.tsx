import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import './Home.css'; // Use the same CSS as Home

interface NewsArticle {
  title: string;
  urlToImage: string | null;
  publishedAt: string;
  url: string;
}

interface NewsData {
  worldNews: NewsArticle[];
  techUpdates: NewsArticle[];
  ai: NewsArticle[];
  blockchain: NewsArticle[];
  hardware: NewsArticle[];
  startups: NewsArticle[];
  // Duplicate sections
  worldNews2: NewsArticle[];
  techUpdates2: NewsArticle[];
  ai2: NewsArticle[];
  blockchain2: NewsArticle[];
  hardware2: NewsArticle[];
  startups2: NewsArticle[];
  worldNews3: NewsArticle[];
  techUpdates3: NewsArticle[];
  ai3: NewsArticle[];
  blockchain3: NewsArticle[];
  hardware3: NewsArticle[];
  startups3: NewsArticle[];
}

const Technology: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    worldNews: [],
    techUpdates: [],
    ai: [],
    blockchain: [],
    hardware: [],
    startups: [],
    // Duplicate sections
    worldNews2: [],
    techUpdates2: [],
    ai2: [],
    blockchain2: [],
    hardware2: [],
    startups2: [],
    worldNews3: [],
    techUpdates3: [],
    ai3: [],
    blockchain3: [],
    hardware3: [],
    startups3: []
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
    title,
    urlToImage: "/ttttttt.jpg",
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    url: "#"
  });

  const loadMoreArticles = async () => {
    setLoadingMore(true);
    
    // Simulate loading time and add new section
    setTimeout(() => {
      const newSection = [
        mockArticle('Breaking: New tech breakthrough announced'),
        mockArticle('Innovation drives digital transformation'),
        mockArticle('Tech startup receives major funding'),
        mockArticle('Technology adoption reaches new milestone')
      ];
      
      setAdditionalSections(prev => [...prev, newSection]);
      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      
      // Mock data to avoid API rate limits
      const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({
        title,
        urlToImage: "/ttttttt.jpg",
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        url: "#"
      });

      setTimeout(() => {
        setNewsData({
          worldNews: [
            mockArticle('Apple unveils revolutionary M4 chip with enhanced AI capabilities'),
            mockArticle('Google announces breakthrough in quantum computing research'),
            mockArticle('Microsoft integrates advanced AI into Office suite'),
            mockArticle('Tesla launches new autonomous driving technology')
          ],
          techUpdates: [
            mockArticle('iPhone 16 Pro features groundbreaking camera technology'),
            mockArticle('Meta releases new VR headset with haptic feedback'),
            mockArticle('OpenAI GPT-5 demonstrates human-level reasoning'),
            mockArticle('Samsung unveils foldable smartphone with improved durability')
          ],
          ai: [
            mockArticle('ChatGPT reaches 200 million weekly active users'),
            mockArticle('AI-powered drug discovery accelerates clinical trials')
          ],
          blockchain: [
            mockArticle('Ethereum 2.0 upgrade reduces energy consumption by 99%'),
            mockArticle('Central bank digital currencies gain global adoption')
          ],
          hardware: [
            mockArticle('NVIDIA announces next-generation AI processing chips'),
            mockArticle('Intel unveils quantum computing processor prototype')
          ],
          startups: [
            mockArticle('AI startup raises $100M for autonomous vehicle technology'),
            mockArticle('Fintech unicorn launches revolutionary payment platform')
          ],
          // Duplicate sections with slight variations
          worldNews2: [
            mockArticle('Amazon Web Services expands cloud computing infrastructure'),
            mockArticle('SpaceX successfully launches Starlink satellite constellation'),
            mockArticle('Netflix implements AI-driven content recommendation system'),
            mockArticle('Adobe launches generative AI tools for creative professionals')
          ],
          techUpdates2: [
            mockArticle('5G network rollout accelerates across major cities'),
            mockArticle('Quantum internet prototype achieves secure communication'),
            mockArticle('Edge computing solutions transform data processing'),
            mockArticle('IoT devices reach 50 billion global connections')
          ],
          ai2: [
            mockArticle('Machine learning models achieve 99% accuracy in medical diagnosis'),
            mockArticle('Natural language processing breakthrough enables real-time translation')
          ],
          blockchain2: [
            mockArticle('Smart contracts revolutionize supply chain management'),
            mockArticle('Decentralized finance protocols secure $200B in assets')
          ],
          hardware2: [
            mockArticle('ARM processors dominate mobile computing market'),
            mockArticle('Solid-state drives achieve unprecedented storage densities')
          ],
          startups2: [
            mockArticle('Biotech startup develops gene therapy for rare diseases'),
            mockArticle('Clean energy company creates efficient solar panel technology')
          ],
          worldNews3: [
            mockArticle('IBM announces quantum advantage in commercial applications'),
            mockArticle('Uber launches autonomous taxi service in select cities'),
            mockArticle('Zoom introduces AI-powered meeting transcription'),
            mockArticle('Twitter integrates blockchain-based verification system')
          ],
          techUpdates3: [
            mockArticle('Augmented reality glasses enter consumer market'),
            mockArticle('Brain-computer interfaces enable paralyzed patients to communicate'),
            mockArticle('3D printing technology creates functional human organs'),
            mockArticle('Renewable energy storage systems achieve grid-scale deployment')
          ],
          ai3: [
            mockArticle('Autonomous robots perform complex manufacturing tasks'),
            mockArticle('AI tutoring systems personalize education for millions')
          ],
          blockchain3: [
            mockArticle('Digital identity solutions protect user privacy online'),
            mockArticle('Cryptocurrency adoption reaches mainstream acceptance')
          ],
          hardware3: [
            mockArticle('Neuromorphic chips mimic human brain processing'),
            mockArticle('Quantum sensors enable unprecedented measurement precision')
          ],
          startups3: [
            mockArticle('Space technology startup plans commercial moon missions'),
            mockArticle('Robotics company develops humanoid assistants for healthcare')
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
          <p>Loading technology news...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="home__container">
        {/* World News Section */}
        <section id="world-news-section" className="world-section">
          <div id="world-cards-container" className="world-cards">
            
            {newsData.worldNews.map((article, index) => (
              <article key={index} id={`world-card-${index + 1}`} className="world-card">
                <span className="id-label">{`world-card-${index + 1}`}</span>
                <div className="world-card-image">
                  <img 
                    src={article.urlToImage || "/ttttttt.jpg"} 
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

        {/* Tech Updates Section */}
        <section id="tech-section" className="crypto-section">
          <div id="tech-cards-container" className="crypto-cards">
            
            {newsData.techUpdates.map((article, index) => (
              <article key={index} id={`tech-card-${index + 1}`} className="crypto-card">
                <span className="id-label">{`tech-card-${index + 1}`}</span>
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories-section" className="categories-section">
          <span className="id-label">categories-section</span>
          <div className="categories-grid">
            {/* AI Column */}
            <div id="ai-column" className="category-column">
              <span className="id-label">ai-column</span>
              <h2 id="ai-header" className="category-header">
                <span className="id-label">ai-header</span>
                <a href="/ai" className="category-link">Artificial Intelligence</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.ai.map((article: NewsArticle, index: number) => (
                <article key={index} id={`ai-card-${index + 1}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  <span className="id-label">{`ai-card-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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

            {/* Blockchain Column */}
            <div id="blockchain-column" className="category-column">
              <span className="id-label">blockchain-column</span>
              <h2 id="blockchain-header" className="category-header">
                <span className="id-label">blockchain-header</span>
                <a href="/blockchain" className="category-link">Blockchain</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.blockchain.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`blockchain-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`blockchain-card-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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

            {/* Hardware Column */}
            <div id="hardware-column" className="category-column">
              <span className="id-label">hardware-column</span>
              <h2 id="hardware-header" className="category-header">
                <span className="id-label">hardware-header</span>
                <a href="/hardware" className="category-link">Hardware</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.hardware.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`hardware-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`hardware-card-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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

            {/* Startups Column */}
            <div id="startups-column" className="category-column">
              <span className="id-label">startups-column</span>
              <h2 id="startups-header" className="category-header">
                <span className="id-label">startups-header</span>
                <a href="/startups" className="category-link">Startups</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.startups.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`startups-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`startups-card-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
        <section id="world-news-section-2" className="world-section">
          
          <div id="world-cards-container-2" className="world-cards">
            <span className="id-label">world-cards-container-2</span>
            
            {newsData.worldNews2.map((article: NewsArticle, index: number) => (
              <article key={index} id={`world-card-2-${index + 1}`} className="world-card">
                <span className="id-label">{`world-card-2-${index + 1}`}</span>
                <div className="world-card-image">
                  <img 
                    src={article.urlToImage || "/ttttttt.jpg"} 
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
        <section id="crypto-section-2" className="crypto-section">
          
          <div id="crypto-cards-container-2" className="crypto-cards">
            <span className="id-label">crypto-cards-container-2</span>
            
            {newsData.techUpdates2.map((article: NewsArticle, index: number) => (
              <article key={index} id={`crypto-card-2-${index + 1}`} className="crypto-card">
                <span className="id-label">{`crypto-card-2-${index + 1}`}</span>
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DUPLICATE SET 1 - Categories Section */}
        <section id="categories-section-2" className="categories-section">
          <span className="id-label">categories-section-2</span>
          <div className="categories-grid">
            {/* Bitcoin Column */}
            <div id="bitcoin-column-2" className="category-column">
              <span className="id-label">bitcoin-column-2</span>
              <h2 id="bitcoin-header-2" className="category-header">
                <span className="id-label">bitcoin-header-2</span>
                <a href="/bitcoin" className="category-link">Bitcoin</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.ai2.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`bitcoin-card-2-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`bitcoin-card-2-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="ethereum-column-2" className="category-column">
              <span className="id-label">ethereum-column-2</span>
              <h2 id="ethereum-header-2" className="category-header">
                <span className="id-label">ethereum-header-2</span>
                <a href="/ethereum" className="category-link">Ethereum</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.blockchain2.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`ethereum-card-2-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`ethereum-card-2-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="defi-column-2" className="category-column">
              <span className="id-label">defi-column-2</span>
              <h2 id="defi-header-2" className="category-header">
                <span className="id-label">defi-header-2</span>
                <a href="/defi" className="category-link">DeFi</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.hardware2.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`defi-card-2-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`defi-card-2-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="nfts-column-2" className="category-column">
              <span className="id-label">nfts-column-2</span>
              <h2 id="nfts-header-2" className="category-header">
                <span className="id-label">nfts-header-2</span>
                <a href="/nfts" className="category-link">NFTs</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.startups2.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`nfts-card-2-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`nfts-card-2-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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

        {/* DUPLICATE SET 2 - World News Section */}
        <section id="world-news-section-3" className="world-section">
          
          <div id="world-cards-container-3" className="world-cards">
            <span className="id-label">world-cards-container-3</span>
            
            {newsData.worldNews3.map((article: NewsArticle, index: number) => (
              <article key={index} id={`world-card-3-${index + 1}`} className="world-card">
                <span className="id-label">{`world-card-3-${index + 1}`}</span>
                <div className="world-card-image">
                  <img 
                    src={article.urlToImage || "/ttttttt.jpg"} 
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
        <section id="crypto-section-3" className="crypto-section">
          
          <div id="crypto-cards-container-3" className="crypto-cards">
            <span className="id-label">crypto-cards-container-3</span>
            
            {newsData.techUpdates3.map((article: NewsArticle, index: number) => (
              <article key={index} id={`crypto-card-3-${index + 1}`} className="crypto-card">
                <span className="id-label">{`crypto-card-3-${index + 1}`}</span>
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
                  <p className="crypto-card-time">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DUPLICATE SET 2 - Categories Section */}
        <section id="categories-section-3" className="categories-section">
          <span className="id-label">categories-section-3</span>
          <div className="categories-grid">
            {/* Bitcoin Column */}
            <div id="bitcoin-column-3" className="category-column">
              <span className="id-label">bitcoin-column-3</span>
              <h2 id="bitcoin-header-3" className="category-header">
                <span className="id-label">bitcoin-header-3</span>
                <a href="/bitcoin" className="category-link">Bitcoin</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.ai3.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`bitcoin-card-3-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`bitcoin-card-3-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="ethereum-column-3" className="category-column">
              <span className="id-label">ethereum-column-3</span>
              <h2 id="ethereum-header-3" className="category-header">
                <span className="id-label">ethereum-header-3</span>
                <a href="/ethereum" className="category-link">Ethereum</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.blockchain3.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`ethereum-card-3-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`ethereum-card-3-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="defi-column-3" className="category-column">
              <span className="id-label">defi-column-3</span>
              <h2 id="defi-header-3" className="category-header">
                <span className="id-label">defi-header-3</span>
                <a href="/defi" className="category-link">DeFi</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.hardware3.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`defi-card-3-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`defi-card-3-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            <div id="nfts-column-3" className="category-column">
              <span className="id-label">nfts-column-3</span>
              <h2 id="nfts-header-3" className="category-header">
                <span className="id-label">nfts-header-3</span>
                <a href="/nfts" className="category-link">NFTs</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.startups3.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`nfts-card-3-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
                  <span className="id-label">{`nfts-card-3-${index + 1}`}</span>
                  {index === 0 && (
                    <div className="category-card-image">
                      <img 
                        src={article.urlToImage || "/ttttttt.jpg"} 
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
            id={`additional-news-section-${sectionIndex + 1}`} 
            className="world-section"
          >
            <div id={`additional-cards-container-${sectionIndex + 1}`} className="world-cards">
              {sectionArticles.map((article: NewsArticle, articleIndex: number) => (
                <article 
                  key={articleIndex} 
                  id={`additional-card-${sectionIndex + 1}-${articleIndex + 1}`} 
                  className="world-card"
                >
                  <span className="id-label">{`additional-card-${sectionIndex + 1}-${articleIndex + 1}`}</span>
                  <div className="world-card-image">
                    <img 
                      src={article.urlToImage || "/ttttttt.jpg"} 
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

export default Technology;