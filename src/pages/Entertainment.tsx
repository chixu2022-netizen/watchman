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
  entertainmentUpdates: NewsArticle[];
  movies: NewsArticle[];
  music: NewsArticle[];
  gaming: NewsArticle[];
  celebrities: NewsArticle[];
  // Duplicate sections
  worldNews2: NewsArticle[];
  entertainmentUpdates2: NewsArticle[];
  movies2: NewsArticle[];
  music2: NewsArticle[];
  gaming2: NewsArticle[];
  celebrities2: NewsArticle[];
  worldNews3: NewsArticle[];
  entertainmentUpdates3: NewsArticle[];
  movies3: NewsArticle[];
  music3: NewsArticle[];
  gaming3: NewsArticle[];
  celebrities3: NewsArticle[];
}

const Entertainment: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    worldNews: [],
    entertainmentUpdates: [],
    movies: [],
    music: [],
    gaming: [],
    celebrities: [],
    // Duplicate sections
    worldNews2: [],
    entertainmentUpdates2: [],
    movies2: [],
    music2: [],
    gaming2: [],
    celebrities2: [],
    worldNews3: [],
    entertainmentUpdates3: [],
    movies3: [],
    music3: [],
    gaming3: [],
    celebrities3: []
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
        mockArticle('Breaking: Hollywood announces major blockbuster'),
        mockArticle('Music festival lineup revealed for summer'),
        mockArticle('Gaming industry reaches new revenue record'),
        mockArticle('Celebrity news dominates social media trends')
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
        title,
        urlToImage: imageUrl,
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        url: "#"
      });

      setTimeout(() => {
        setNewsData({
          worldNews: [
            mockArticle('Hollywood blockbuster breaks opening weekend box office records', '/wm01.jpeg'),
            mockArticle('Streaming wars intensify as platforms launch exclusive content', '/placeholders/placeholder1.svg'),
            mockArticle('Major music festival announces star-studded lineup for 2025', '/ttttttt.jpg'),
            mockArticle('Gaming industry reaches $200 billion in global revenue', '/placeholders/placeholder2.svg')
          ],
          entertainmentUpdates: [
            mockArticle('Netflix announces 10 new original series for fall season', '/wm01.jpeg'),
            mockArticle('Disney+ subscriber count surpasses 150 million worldwide', '/ttttttt.jpg'),
            mockArticle('Virtual reality gaming experiences revolutionize entertainment', '/placeholders/placeholder1.svg'),
            mockArticle('Social media platforms introduce new content creator programs', '/placeholders/placeholder2.svg')
          ],
          movies: [
            mockArticle('Award season predictions dominate entertainment headlines', '/wm01.jpeg'),
            mockArticle('Celebrity endorsements drive billion-dollar brand partnerships', '/ttttttt.jpg')
          ],
          music: [
            mockArticle('Movie theaters adapt with premium experiences and dining', '/placeholders/placeholder1.svg'),
            mockArticle('Podcast industry sees 300% growth in advertising revenue', '/placeholders/placeholder2.svg')
          ],
          gaming: [
            mockArticle('Interactive entertainment startup raises $100M Series B funding', '/wm01.jpeg'),
            mockArticle('AI-powered content creation platform disrupts media industry', '/ttttttt.jpg')
          ],
          celebrities: [
            mockArticle('Live entertainment venues report record attendance numbers', '/placeholders/placeholder1.svg'),
            mockArticle('Streaming subscription services reach saturation point', '/placeholders/placeholder2.svg')
          ],
          // Duplicate sections with slight variations
          worldNews2: [
            mockArticle('Manufacturing sector embraces automation and AI technologies', '/ttttttt.jpg'),
            mockArticle('Global logistics networks optimize for sustainability goals', '/wm01.jpeg'),
            mockArticle('Corporate ESG initiatives drive long-term value creation', '/placeholders/placeholder1.svg'),
            mockArticle('Cross-border partnerships accelerate innovation cycles', '/placeholders/placeholder2.svg')
          ],
          entertainmentUpdates2: [
            mockArticle('Retail giants transform stores into omnichannel experiences', '/wm01.jpeg'),
            mockArticle('Banking sector adopts blockchain for secure transactions', '/ttttttt.jpg'),
            mockArticle('Healthcare companies pioneer personalized medicine solutions', '/placeholders/placeholder1.svg'),
            mockArticle('Energy sector transitions to clean technology alternatives', '/placeholders/placeholder2.svg')
          ],
          movies2: [
            mockArticle('Commodity prices stabilize as global demand normalizes', '/placeholders/placeholder1.svg'),
            mockArticle('Real estate movies show strong fundamentals in urban areas', '/wm01.jpeg')
          ],
          music2: [
            mockArticle('Investment funds allocate billions to sustainable projects', '/ttttttt.jpg'),
            mockArticle('Corporate bonds offer attractive yields for income investors', '/placeholders/placeholder2.svg')
          ],
          gaming2: [
            mockArticle('Health tech startup develops breakthrough medical devices', '/placeholders/placeholder1.svg'),
            mockArticle('EdTech platform reaches 10 million active learners globally', '/wm01.jpeg')
          ],
          celebrities2: [
            mockArticle('Consumer confidence index reaches five-year peak levels', '/ttttttt.jpg'),
            mockArticle('Small business optimism drives entrepreneurship boom', '/placeholders/placeholder2.svg')
          ],
          worldNews3: [
            mockArticle('International corporations commit to carbon neutral operations', '/wm01.jpeg'),
            mockArticle('Trade partnerships foster economic cooperation between nations', '/placeholders/placeholder1.svg'),
            mockArticle('Digital transformation accelerates across traditional industries', '/ttttttt.jpg'),
            mockArticle('Workforce development programs address skills gap challenges', '/placeholders/placeholder2.svg')
          ],
          entertainmentUpdates3: [
            mockArticle('Aerospace industry launches next-generation satellite networks', '/placeholders/placeholder1.svg'),
            mockArticle('Food tech companies innovate sustainable protein alternatives', '/wm01.jpeg'),
            mockArticle('Automotive sector accelerates electric vehicle production', '/ttttttt.jpg'),
            mockArticle('Pharmaceutical giants collaborate on global health initiatives', '/placeholders/placeholder2.svg')
          ],
          movies3: [
            mockArticle('Currency movies adapt to changing monetary policy landscapes', '/wm01.jpeg'),
            mockArticle('Infrastructure investments create long-term economic value', '/placeholders/placeholder1.svg')
          ],
          music3: [
            mockArticle('Insurance industry leverages AI for risk assessment accuracy', '/ttttttt.jpg'),
            mockArticle('Pension funds diversify portfolios with alternative investments', '/placeholders/placeholder2.svg')
          ],
          gaming3: [
            mockArticle('Climate tech startup secures funding for carbon capture solutions', '/placeholders/placeholder1.svg'),
            mockArticle('Logistics startup optimizes last-mile delivery with drones', '/wm01.jpeg')
          ],
          celebrities3: [
            mockArticle('Regional economies benefit from infrastructure modernization', '/ttttttt.jpg'),
            mockArticle('Innovation hubs attract talent and investment capital globally', '/placeholders/placeholder2.svg')
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
          <p>Loading entertainment news...</p>
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

        {/* Entertainment Updates Section */}
        <section id="business-section" className="crypto-section">          
          <div id="business-cards-container" className="crypto-cards">            
            {newsData.entertainmentUpdates.map((article, index) => (
              <article key={index} id={`business-card-${index + 1}`} className="crypto-card">
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
          <div className="categories-grid">
            {/* Markets Column */}
            <div id="movies-column" className="category-column">
              <h2 id="movies-header" className="category-header">
                <a href="/movies" className="category-link">Markets</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.movies.map((article: NewsArticle, index: number) => (
                <article key={index} id={`movies-card-${index + 1}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
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

            {/* Finance Column */}
            <div id="music-column" className="category-column">
              <h2 id="music-header" className="category-header">
                <a href="/music" className="category-link">Finance</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.music.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`music-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
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
            <div id="gaming-column" className="category-column">
              <h2 id="gaming-header" className="category-header">
                <a href="/gaming" className="category-link">Startups</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.gaming.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`gaming-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
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

            {/* Economy Column */}
            <div id="celebrities-column" className="category-column">
              <h2 id="celebrities-header" className="category-header">
                <a href="/celebrities" className="category-link">Economy</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {newsData.celebrities.map((article: NewsArticle, index: number) => (
                <article 
                  key={index} 
                  id={`celebrities-card-${index + 1}`} 
                  className={`category-card ${index === 0 ? 'featured' : ''}`}
                >
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
            {newsData.worldNews2.map((article: NewsArticle, index: number) => (
              <article key={index} id={`world-card-2-${index + 1}`} className="world-card">
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

        {/* DUPLICATE SET 1 - Entertainment Updates Section */}
        <section id="business-section-2" className="crypto-section">          
          <div id="business-cards-container-2" className="crypto-cards">            
            {newsData.entertainmentUpdates2.map((article: NewsArticle, index: number) => (
              <article key={index} id={`business-card-2-${index + 1}`} className="crypto-card">
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
              
              <article id="bitcoin-card-2-1" className="category-card featured">
                <span className="id-label">bitcoin-card-2-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Bitcoin layer 2 development" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Bitcoin Layer 2 solutions process 1M transactions daily</h3>
                  <p className="category-card-time">40 mins ago</p>
                </div>
              </article>

              <article id="bitcoin-card-2-2" className="category-card">
                <span className="id-label">bitcoin-card-2-2</span>
                <h3 className="category-card-title">Taproot adoption reaches 80% among Bitcoin nodes</h3>
                <p className="category-card-time">1.5 hours ago</p>
              </article>
            </div>

            {/* Ethereum Column */}
            <div id="ethereum-column-2" className="category-column">
              <span className="id-label">ethereum-column-2</span>
              <h2 id="ethereum-header-2" className="category-header">
                <span className="id-label">ethereum-header-2</span>
                <a href="/ethereum" className="category-link">Ethereum</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ethereum-card-2-1" className="category-card featured">
                <span className="id-label">ethereum-card-2-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Ethereum sharding upgrade" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Ethereum sharding testnet achieves 100,000 TPS milestone</h3>
                  <p className="category-card-time">55 mins ago</p>
                </div>
              </article>

              <article id="ethereum-card-2-2" className="category-card">
                <span className="id-label">ethereum-card-2-2</span>
                <h3 className="category-card-title">EIP-4844 reduces transaction costs by 90% on rollups</h3>
                <p className="category-card-time">2.5 hours ago</p>
              </article>
            </div>

            {/* DeFi Column */}
            <div id="defi-column-2" className="category-column">
              <span className="id-label">defi-column-2</span>
              <h2 id="defi-header-2" className="category-header">
                <span className="id-label">defi-header-2</span>
                <a href="/defi" className="category-link">DeFi</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="defi-card-2-1" className="category-card featured">
                <span className="id-label">defi-card-2-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Cross-chain DeFi protocol" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Cross-chain DeFi protocol enables seamless asset bridging</h3>
                  <p className="category-card-time">1.2 hours ago</p>
                </div>
              </article>

              <article id="defi-card-2-2" className="category-card">
                <span className="id-label">defi-card-2-2</span>
                <h3 className="category-card-title">Algorithmic stablecoin maintains perfect peg for 6 months</h3>
                <p className="category-card-time">3.5 hours ago</p>
              </article>
            </div>

            {/* NFTs Column */}
            <div id="nfts-column-2" className="category-column">
              <span className="id-label">nfts-column-2</span>
              <h2 id="nfts-header-2" className="category-header">
                <span className="id-label">nfts-header-2</span>
                <a href="/nfts" className="category-link">NFTs</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="nfts-card-2-1" className="category-card featured">
                <span className="id-label">nfts-card-2-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Dynamic NFT marketplace" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Dynamic NFTs change based on real-world data feeds</h3>
                  <p className="category-card-time">1.8 hours ago</p>
                </div>
              </article>

              <article id="nfts-card-2-2" className="category-card">
                <span className="id-label">nfts-card-2-2</span>
                <h3 className="category-card-title">Music NFTs generate $50M in royalties for artists</h3>
                <p className="category-card-time">4.2 hours ago</p>
              </article>
            </div>
          </div>
        </section>

        {/* DUPLICATE SET 2 - World News Section */}
        <section id="world-news-section-3" className="world-section">
          
          <div id="world-cards-container-3" className="world-cards">
            <span className="id-label">world-cards-container-3</span>
            
            <article id="world-card-3-1" className="world-card">
              <span className="id-label">world-card-3-1</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Crypto staking rewards" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Proof-of-stake networks offer 12% average staking rewards</h3>
                <p className="world-card-time">4 hours ago</p>
              </div>
            </article>

            <article id="world-card-3-2" className="world-card">
              <span className="id-label">world-card-3-2</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Decentralized identity" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Decentralized identity platform reaches 5M verified users</h3>
                <p className="world-card-time">6 hours ago</p>
              </div>
            </article>

            <article id="world-card-3-3" className="world-card">
              <span className="id-label">world-card-3-3</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Crypto derivatives market" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Crypto derivatives market surpasses $3 trillion in volume</h3>
                <p className="world-card-time">8 hours ago</p>
              </div>
            </article>

            <article id="world-card-3-4" className="world-card">
              <span className="id-label">world-card-3-4</span>
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
        <section id="crypto-section-3" className="crypto-section">
          
          <div id="crypto-cards-container-3" className="crypto-cards">
            <span className="id-label">crypto-cards-container-3</span>
            
            <article id="crypto-card-3-1" className="crypto-card">
              <span className="id-label">crypto-card-3-1</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Cosmos ecosystem introduces interchain security for 50 zones</h3>
                <p className="crypto-card-time">35 mins ago</p>
              </div>
            </article>

            <article id="crypto-card-3-2" className="crypto-card">
              <span className="id-label">crypto-card-3-2</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Arbitrum One becomes fastest growing Layer 2 with 2M users</h3>
                <p className="crypto-card-time">1 hour ago</p>
              </div>
            </article>

            <article id="crypto-card-3-3" className="crypto-card">
              <span className="id-label">crypto-card-3-3</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Polkadot parachain auctions raise $2B for ecosystem projects</h3>
                <p className="crypto-card-time">1.8 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-3-4" className="crypto-card">
              <span className="id-label">crypto-card-3-4</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Binance Smart Chain upgrades consensus mechanism for efficiency</h3>
                <p className="crypto-card-time">2.8 hours ago</p>
              </div>
            </article>
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
              
              <article id="bitcoin-card-3-1" className="category-card featured">
                <span className="id-label">bitcoin-card-3-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Bitcoin ordinals growth" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Bitcoin Ordinals marketplace sees 500% growth in collections</h3>
                  <p className="category-card-time">50 mins ago</p>
                </div>
              </article>

              <article id="bitcoin-card-3-2" className="category-card">
                <span className="id-label">bitcoin-card-3-2</span>
                <h3 className="category-card-title">RGB protocol enables smart contracts on Bitcoin network</h3>
                <p className="category-card-time">1.8 hours ago</p>
              </article>
            </div>

            {/* Ethereum Column */}
            <div id="ethereum-column-3" className="category-column">
              <span className="id-label">ethereum-column-3</span>
              <h2 id="ethereum-header-3" className="category-header">
                <span className="id-label">ethereum-header-3</span>
                <a href="/ethereum" className="category-link">Ethereum</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ethereum-card-3-1" className="category-card featured">
                <span className="id-label">ethereum-card-3-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Ethereum validators growth" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Ethereum validator count reaches 1 million active nodes</h3>
                  <p className="category-card-time">1.1 hours ago</p>
                </div>
              </article>

              <article id="ethereum-card-3-2" className="category-card">
                <span className="id-label">ethereum-card-3-2</span>
                <h3 className="category-card-title">Account abstraction wallets gain 2M users in one month</h3>
                <p className="category-card-time">2.8 hours ago</p>
              </article>
            </div>

            {/* DeFi Column */}
            <div id="defi-column-3" className="category-column">
              <span className="id-label">defi-column-3</span>
              <h2 id="defi-header-3" className="category-header">
                <span className="id-label">defi-header-3</span>
                <a href="/defi" className="category-link">DeFi</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="defi-card-3-1" className="category-card featured">
                <span className="id-label">defi-card-3-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="DeFi insurance protocol" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">DeFi insurance protocol covers $10B in smart contract risks</h3>
                  <p className="category-card-time">1.5 hours ago</p>
                </div>
              </article>

              <article id="defi-card-3-2" className="category-card">
                <span className="id-label">defi-card-3-2</span>
                <h3 className="category-card-title">Automated market makers process $50B weekly volume</h3>
                <p className="category-card-time">3.8 hours ago</p>
              </article>
            </div>

            {/* NFTs Column */}
            <div id="nfts-column-3" className="category-column">
              <span className="id-label">nfts-column-3</span>
              <h2 id="nfts-header-3" className="category-header">
                <span className="id-label">nfts-header-3</span>
                <a href="/nfts" className="category-link">NFTs</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="nfts-card-3-1" className="category-card featured">
                <span className="id-label">nfts-card-3-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="NFT fractionalization" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">NFT fractionalization enables shared ownership of rare assets</h3>
                  <p className="category-card-time">2.1 hours ago</p>
                </div>
              </article>

              <article id="nfts-card-3-2" className="category-card">
                <span className="id-label">nfts-card-3-2</span>
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

export default Entertainment;