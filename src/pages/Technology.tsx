import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { newsAPI } from '../services/newsAPI';
import { NewsArticle } from '../types/news';
import './Home.css'; // Use the same CSS as Home

// Using NewsArticle from types/news.ts

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
    id: Math.random().toString(),
    title,
    description: 'Technology news description',
    imageUrl: "/ttttttt.jpg",
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    url: "#",
    source: { name: 'Technology News' },
    category: 'technology'
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
      
      // 🔥 NewsAPI Integration (COMMENTED OUT - Ready for activation)
      /*
      try {
        console.log('🚀 Fetching live technology news from NewsAPI...');
        const [
          techGeneral,
          aiNews,
          startupNews,
          hardwareNews,
          softwareNews
        ] = await Promise.all([
          newsAPI.getNewsByCategory('technology', 8),
          newsAPI.getNewsByCategory('artificial-intelligence', 4),
          newsAPI.getNewsByCategory('startup', 4),
          newsAPI.getNewsByCategory('hardware', 4),
          newsAPI.getNewsByCategory('software', 4)
        ]);
        
        setNewsData({
          worldNews: techGeneral.slice(0, 4),
          techUpdates: techGeneral.slice(4, 8),
          ai: aiNews,
          blockchain: hardwareNews, // Using hardware as blockchain substitute
          hardware: hardwareNews,
          startups: startupNews,
          // Duplicate sections with same data
          worldNews2: techGeneral.slice(0, 4),
          techUpdates2: techGeneral.slice(4, 8),
          ai2: aiNews,
          blockchain2: hardwareNews,
          hardware2: hardwareNews,
          startups2: startupNews,
          worldNews3: techGeneral.slice(0, 4),
          techUpdates3: techGeneral.slice(4, 8),
          ai3: aiNews,
          blockchain3: hardwareNews,
          hardware3: hardwareNews,
          startups3: startupNews
        });
      } catch (error) {
        console.error('❌ Error fetching technology news:', error);
        // Fallback to mock data
      }
      */
      
      // Mock data (TEMPORARY - Will be replaced with live news)
      const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({
        id: Math.random().toString(),
        title,
        description: 'Technology news description',
        imageUrl: "/ttttttt.jpg",
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        url: "#",
        source: { name: 'Tech News' },
        category: 'technology'
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

        {/* Tech Updates Section */}
        <section className="crypto-section">
          <div className="crypto-cards">
            
            {newsData.techUpdates.map((article, index) => (
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
            {/* AI Column */}
            <div className="category-column">
              
              {newsData.ai.map((article: NewsArticle, index: number) => (
                <article 
                  key={`ai-1-${index}`}
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                  data-article-id={article.id || `ai-1-${index}`}
                  data-category="ai"
                  data-section="1"
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
                  <span className="dev-label">AI-1-{index + 1}</span>
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Blockchain Column */}
            <div className="category-column">
              
              {newsData.blockchain.map((article: NewsArticle, index: number) => (
                <article 
                  key={`blockchain-1-${index}`}
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                  data-article-id={article.id || `blockchain-1-${index}`}
                  data-category="blockchain"
                  data-section="1"
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
                  <span className="dev-label">BLOCK-1-{index + 1}</span>
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Hardware Column */}
            <div className="category-column">
              
              {newsData.hardware.map((article: NewsArticle, index: number) => (
                <article 
                  key={`hardware-1-${index}`}
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                  data-article-id={article.id || `hardware-1-${index}`}
                  data-category="hardware"
                  data-section="1"
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
                  <span className="dev-label">HW-1-{index + 1}</span>
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Startups Column */}
            <div className="category-column">
              
              {newsData.startups.map((article: NewsArticle, index: number) => (
                <article 
                  key={`tech-startups-1-${index}`}
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                  data-article-id={article.id || `tech-startups-1-${index}`}
                  data-category="tech-startups"
                  data-section="1"
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
                  <span className="dev-label">STARTUP-1-{index + 1}</span>
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
            
            {newsData.techUpdates2.map((article: NewsArticle, index: number) => (
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
              
              {newsData.ai2.map((article: NewsArticle, index: number) => (
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
              
              {newsData.blockchain2.map((article: NewsArticle, index: number) => (
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
              
              {newsData.hardware2.map((article: NewsArticle, index: number) => (
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
              
              {newsData.startups2.map((article: NewsArticle, index: number) => (
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
            
            {newsData.techUpdates3.map((article: NewsArticle, index: number) => (
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
              
              {newsData.ai3.map((article: NewsArticle, index: number) => (
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
              
              {newsData.blockchain3.map((article: NewsArticle, index: number) => (
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
              
              {newsData.hardware3.map((article: NewsArticle, index: number) => (
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
              
              {newsData.startups3.map((article: NewsArticle, index: number) => (
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