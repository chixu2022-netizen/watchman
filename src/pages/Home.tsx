import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import { HomepageNewsData, NewsArticle } from '../types/news';
import { newsAPI } from '../services/newsAPI'; // Using real NewsAPI for dynamic content
import { mockNewsAPI } from '../services/mockNewsData'; // Fallback only
import './Home.css';

function Home() {
  const [newsData, setNewsData] = useState<HomepageNewsData | null>(null);
  const [dynamicNews, setDynamicNews] = useState<{[key: string]: NewsArticle[]}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageNews = async () => {
      try {
        console.log('🚀 Fetching dynamic news from NewsAPI for all categories...');
        
        // Fetch dynamic news for all categories
        const allCategoriesNews = await newsAPI.getAllCategoriesNews();
        console.log('📰 Dynamic news data received:', allCategoriesNews);
        setDynamicNews(allCategoriesNews);
        
        // Also fetch the homepage structure (for fallback)
        const data = await mockNewsAPI.getHomepageNews();
        setNewsData(data);
        
      } catch (error) {
        console.error('❌ Error fetching dynamic news, using fallback:', error);
        // Use mock data as fallback
        const data = await mockNewsAPI.getHomepageNews();
        setNewsData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageNews();
  }, []);

  // Use dynamic news data when available, fallback to mock data
  const worldNews = dynamicNews.world || newsData?.worldNews || [];
  const cryptoNews = dynamicNews.crypto || newsData?.categoryNews || [];
  const technologyNews = dynamicNews.technology || newsData?.categories?.technology || [];
  const businessNews = dynamicNews.business || newsData?.categories?.business || [];
  const sportsNews = dynamicNews.sports || newsData?.categories?.sports || [];
  const entertainmentNews = dynamicNews.entertainment || newsData?.categories?.entertainment || [];
  const healthNews = dynamicNews.health || [];
  const politicsNews = dynamicNews.politics || [];
  const localNews = dynamicNews.local || [];
  const aiNews = dynamicNews['artificial-intelligence'] || [];

  // Debug info for testing  
  const hasDynamicData = Object.keys(dynamicNews).length > 0;
  const debugInfo = `Dynamic API Status: ${hasDynamicData ? '🔥 LIVE NEWS' : loading ? 'LOADING...' : 'FALLBACK'} | Categories: ${Object.keys(dynamicNews).length} | World: ${worldNews.length} | Updated: ${new Date().toLocaleTimeString()}`;
  
  // Enhanced debugging
  console.log('🔍 Homepage Debug - DYNAMIC NEWS from each category:', {
    loading,
    hasDynamicData,
    dynamicCategories: Object.keys(dynamicNews),
    worldNewsCount: worldNews.length,
    cryptoNewsCount: cryptoNews.length,
    technologyNewsCount: technologyNews.length,
    businessNewsCount: businessNews.length,
    sportsNewsCount: sportsNews.length,
    entertainmentNewsCount: entertainmentNews.length,
    healthNewsCount: healthNews.length,
    politicsNewsCount: politicsNews.length,
    topStoriesLogic: 'Homepage shows LIVE hottest news from each category via NewsAPI'
  });
  
  return (
    <div className="home">
      <StockTicker />
      <div className="home__container">
        {/* Duplicated Technology Section with Sidebar Layout - NEW AT TOP */}
        <div className="tech-sidebar-layout">
          
          {/* Technology Section - DUPLICATED */}
          <section className="technology-section">
            <div className="technology-header">
              <h2 className="technology-title">
              </h2>
            </div>
            
            <div className="technology-cards">
              
              <article className="featured-article">
                <div className="featured-content">
                  <h1 className="featured-headline">
                    Revolutionary AI breakthrough transforms quantum computing capabilities
                  </h1>
                  <p className="featured-description">
                    Scientists at MIT have developed a new quantum-AI hybrid system that can process complex calculations 1000x faster than traditional supercomputers, opening new possibilities for drug discovery and climate modeling.
                  </p>
                  <p className="featured-date">September 27, 2025</p>
                </div>
                <div className="featured-image">
                  <img 
                    src="/ttttttt.jpg" 
                    alt="Revolutionary AI breakthrough transforms quantum computing capabilities"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </article>
            </div>
          </section>

          {/* Sidebar - 30% width - DUPLICATED */}
          <aside className="tech-sidebar">
            
            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time">2 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time">8 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time">9 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* World News Section */}
        <section className="world-section">
          <div className="world-header">
            <h2 className="world-title">
              <a href="/world" className="world-link">World &gt;</a>
            </h2>
          </div>
          
          <div className="world-cards">
            
            {loading ? (
              // Loading state
              <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
                Loading latest news...
              </div>
            ) : worldNews.length > 0 ? (() => {
              // Ensure we always have 4 articles by combining API and fallback data
              const fallbackArticles = [
                {
                  id: 'fallback-world-1',
                  title: 'Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact',
                  description: 'Saudi Arabia and Pakistan have signed a mutual defense agreement.',
                  url: '#',
                  imageUrl: '/ttttttt.jpg',
                  publishedAt: new Date(Date.now() - 7200000).toISOString(),
                  source: { name: 'News Source' },
                  category: 'world'
                },
                {
                  id: 'fallback-world-2',
                  title: 'Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome',
                  description: 'High-level diplomatic discussions continue.',
                  url: '#',
                  imageUrl: '/ttttttt.jpg',
                  publishedAt: new Date(Date.now() - 7200000).toISOString(),
                  source: { name: 'News Source' },
                  category: 'world'
                },
                {
                  id: 'fallback-world-3',
                  title: 'France gears up for protests, strikes over budget cuts',
                  description: 'Economic tensions rise across European nations.',
                  url: '#',
                  imageUrl: '/ttttttt.jpg',
                  publishedAt: new Date(Date.now() - 420000).toISOString(),
                  source: { name: 'News Source' },
                  category: 'world'
                },
                {
                  id: 'fallback-world-4',
                  title: 'Beetle that threatens Australia\'s grains industry found in imported nappies',
                  description: 'Agricultural security measures under review.',
                  url: '#',
                  imageUrl: '/ttttttt.jpg',
                  publishedAt: new Date(Date.now() - 10800000).toISOString(),
                  source: { name: 'News Source' },
                  category: 'world'
                }
              ];
              
              const combinedArticles = [...worldNews];
              
              // Add fallback articles to reach 4 total
              while (combinedArticles.length < 4 && fallbackArticles.length > 0) {
                const fallbackArticle = fallbackArticles[combinedArticles.length - worldNews.length];
                if (fallbackArticle) {
                  combinedArticles.push(fallbackArticle);
                }
              }
              
              return combinedArticles.slice(0, 4);
            })().map((article, index) => (
              <article key={article.id} id={`world-card-${index + 1}`} className="world-card">
                <div className="world-card-image">
                  <img src={article.imageUrl || '/ttttttt.jpg'} alt={article.title} />
                </div>
                <div className="world-card-content">
                  <h3 className="world-card-title">{article.title}</h3>
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
            )) : (
              // Fallback static content
              <>
                <article className="world-card">
                  <div className="world-card-image">
                    <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                    <p className="world-card-time">2 hours ago</p>
                  </div>
                </article>

                <article className="world-card">
                  <div className="world-card-image">
                    <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                    <p className="world-card-time">2 hours ago</p>
                  </div>
                </article>

                <article className="world-card">
                  <div className="world-card-image">
                    <img src="/ttttttt.jpg" alt="France protests strikes" />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">France gears up for protests, strikes over budget cuts</h3>
                    <p className="world-card-time">7 mins ago</p>
                  </div>
                </article>

                <article className="world-card">
                  <div className="world-card-image">
                    <img src="/ttttttt.jpg" alt="Australia grain industry beetle threat" />
                  </div>
                  <div className="world-card-content">
                    <h3 className="world-card-title">Beetle that threatens Australia&apos;s grains industry found in imported nappies</h3>
                    <p className="world-card-time">3 hours ago</p>
                  </div>
                </article>
              </>
            )}
          </div>
        </section>

        {/* Crypto Section - NOW DYNAMIC */}
        <section className="crypto-section">
          <div className="crypto-header">
            <h2 className="crypto-title">
              <a href="/crypto" className="crypto-link">Crypto &gt;</a>
            </h2>
          </div>
          
          <div className="crypto-cards">
            
            {loading ? (
              <div style={{textAlign: 'center', padding: '1rem', color: '#666'}}>
                Loading crypto news...
              </div>
            ) : cryptoNews.length > 0 ? cryptoNews.slice(0, 4).map((article, index) => (
              <article key={article.id} id={`crypto-card-${index + 1}`} className="crypto-card">
                <div className="crypto-card-content">
                  <h3 className="crypto-card-title">{article.title}</h3>
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
            )) : (
              // Static fallback - only show if no API data
              <>
                <article className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">Bitcoin Reaches New All-Time High Amid Institutional Adoption</h3>
                    <p className="crypto-card-time">1 hour ago</p>
                  </div>
                </article>

                <article className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">Ethereum 2.0 Upgrade Shows Promising Results</h3>
                    <p className="crypto-card-time">3 hours ago</p>
                  </div>
                </article>

                <article className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">Central Bank Digital Currencies Gain Global Momentum</h3>
                    <p className="crypto-card-time">5 hours ago</p>
                  </div>
                </article>

                <article className="crypto-card">
                  <div className="crypto-card-content">
                    <h3 className="crypto-card-title">DeFi Protocol Launches Revolutionary Yield Farming Solution</h3>
                    <p className="crypto-card-time">8 hours ago</p>
                  </div>
                </article>
              </>
            )}
          </div>
        </section>

        {/* Technology Section with Sidebar Layout */}
        <div className="tech-sidebar-layout">
          
          {/* Technology Section - NOW DYNAMIC */}
          <section className="technology-section">
            <div className="technology-header">
              <h2 className="technology-title">
                <a href="/technology" className="technology-link">Technology &gt;</a>
              </h2>
            </div>
            
            <div className="technology-cards">
              
              <article className="featured-article">
                <div className="featured-content">
                  <h1 className="featured-headline">
                    Revolutionary AI breakthrough transforms quantum computing capabilities
                  </h1>
                  <p className="featured-description">
                    Scientists at MIT have developed a new quantum-AI hybrid system that can process complex calculations 1000x faster than traditional supercomputers, opening new possibilities for drug discovery and climate modeling.
                  </p>
                  <p className="featured-date">September 27, 2025</p>
                </div>
                <div className="featured-image">
                  <img 
                    src="/ttttttt.jpg" 
                    alt="Revolutionary AI breakthrough transforms quantum computing capabilities"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </article>
            </div>
          </section>

          {/* Sidebar - 30% width */}
          <aside className="tech-sidebar">
            
            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time">2 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time">8 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time">9 hours ago</p>
            </article>

            <article className="sidebar-news-item">
              <h3 className="sidebar-news-title">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="categories-grid">
            {/* Business Column */}
            <div className="category-column">
              <h2 className="category-header">
                <a href="/business" className="category-link">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading business news...
                </div>
              ) : businessNews.length > 0 ? businessNews.slice(0, 2).map((article, index) => (
                <article key={article.id} id={`business-card-${index + 1}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if no API data
                <>
                  <article className="category-card featured">
                    <div className="category-card-image">
                      <img src="/ttttttt.jpg" alt="Luxury brands challenge" />
                    </div>
                    <div className="category-card-content">
                      <h3 className="category-card-title">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                      <p className="category-card-time">7 mins ago</p>
                    </div>
                  </article>

                  <article className="category-card">
                    <h3 className="category-card-title">UK retail sales rise by more than expected in August, ONS says</h3>
                    <p className="category-card-time">10 hours ago</p>
                  </article>
                </>
              )}
            </div>

            {/* Sports Column */}
            <div className="category-column">
              <h2 className="category-header">
                <a href="/sports" className="category-link">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading sports news...
                </div>
              ) : sportsNews.length > 0 ? sportsNews.slice(0, 2).map((article, index) => (
                <article key={article.id} id={`sports-card-${index + 1}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if no API data
                <>
                  <article className="category-card featured">
                    <div className="category-card-image">
                      <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                    </div>
                    <div className="category-card-content">
                      <h3 className="category-card-title">How Canada&apos;s Haisla became the world&apos;s first Indigenous LNG owners</h3>
                      <p className="category-card-time">6 hours ago</p>
                    </div>
                  </article>

                  <article className="category-card">
                    <h3 className="category-card-title">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                    <p className="category-card-time">10 hours ago</p>
                  </article>
                </>
              )}
            </div>

            {/* AI Column */}
            <div className="category-column">
              <h2 className="category-header">
                <a href="/ai" className="category-link">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card featured">
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Apple AI blood pressure" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Apple used AI to uncover new blood pressure notification feature in Watch</h3>
                  <p className="category-card-time">2 hours ago</p>
                </div>
              </article>

              <article className="category-card">
                <h3 className="category-card-title">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column */}
            <div className="category-column">
              <h2 className="category-header">
                <a href="/entertainment" className="category-link">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading entertainment news...
                </div>
              ) : entertainmentNews.length > 0 ? entertainmentNews.slice(0, 2).map((article, index) => (
                <article key={article.id} id={`entertainment-card-${index + 1}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content">
                    <h3 className="category-card-title">{article.title}</h3>
                    <p className="category-card-time">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if no API data
                <>
                  <article className="category-card featured">
                    <div className="category-card-image">
                      <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                    </div>
                    <div className="category-card-content">
                      <h3 className="category-card-title">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                      <p className="category-card-time">September 18, 2025</p>
                    </div>
                  </article>

                  <article className="category-card">
                    <h3 className="category-card-title">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                    <p className="category-card-time">September 18, 2025</p>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Crypto Section 2 */}
        <section className="crypto-section-2">
          <div className="crypto-header-2">
            <h2 className="crypto-title-2">
              <a href="/crypto" className="crypto-link-2">Crypto &gt;</a>
            </h2>
          </div>
          
          <div className="crypto-cards-2">
            
            <article className="crypto-card-2">
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-2">31 mins ago</p>
              </div>
            </article>

            <article className="crypto-card-2">
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-2">7 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-2">
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-2">
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-2">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Categories Section 2 */}
        <section className="categories-section-2">
          <div className="categories-grid-2">
            
            {/* Business Column 2 */}
            <div className="category-column-2">
              <h2 className="category-header-2">
                <a href="/business" className="category-link-2">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading more business news...
                </div>
              ) : businessNews.length > 2 ? businessNews.slice(2, 4).map((article, index) => (
                <article key={article.id} id={`business-card-2-${index + 1}`} className={`category-card-2 ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image-2">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content-2">
                    <h3 className="category-card-title-2">{article.title}</h3>
                    <p className="category-card-time-2">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if not enough API data
                <>
                  <article className="category-card-2 featured">
                    <div className="category-card-image-2">
                      <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                    </div>
                    <div className="category-card-content-2">
                      <h3 className="category-card-title-2">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                      <p className="category-card-time-2">7 mins ago</p>
                    </div>
                  </article>

                  <article className="category-card-2">
                    <h3 className="category-card-title-2">UK retail sales rise by more than expected in August, ONS says</h3>
                    <p className="category-card-time-2">10 hours ago</p>
                  </article>
                </>
              )}
            </div>

            {/* Sports Column 2 */}
            <div className="category-column-2">
              <h2 className="category-header-2">
                <a href="/sports" className="category-link-2">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading more sports news...
                </div>
              ) : sportsNews.length > 2 ? sportsNews.slice(2, 4).map((article, index) => (
                <article key={article.id} id={`sports-card-2-${index + 1}`} className={`category-card-2 ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image-2">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content-2">
                    <h3 className="category-card-title-2">{article.title}</h3>
                    <p className="category-card-time-2">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if not enough API data
                <>
                  <article className="category-card-2 featured">
                    <div className="category-card-image-2">
                      <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                    </div>
                    <div className="category-card-content-2">
                      <h3 className="category-card-title-2">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                      <p className="category-card-time-2">6 hours ago</p>
                    </div>
                  </article>

                  <article className="category-card-2">
                    <h3 className="category-card-title-2">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                    <p className="category-card-time-2">10 hours ago</p>
                  </article>
                </>
              )}
            </div>

            {/* AI Column 2 */}
            <div className="category-column-2">
              <h2 className="category-header-2">
                <a href="/ai" className="category-link-2">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-2 featured">
                <div className="category-card-image-2">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-2">
                  <h3 className="category-card-title-2">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-2">2 hours ago</p>
                </div>
              </article>

              <article className="category-card-2">
                <h3 className="category-card-title-2">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-2">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 2 */}
            <div className="category-column-2">
              <h2 className="category-header-2">
                <a href="/entertainment" className="category-link-2">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              {loading ? (
                <div className="loading-placeholder">
                  Loading more entertainment news...
                </div>
              ) : (newsData?.categories?.entertainment?.length || 0) > 2 ? newsData!.categories!.entertainment!.slice(2, 4).map((article, index) => (
                <article key={article.id} id={`entertainment-card-2-${index + 1}`} className={`category-card-2 ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && (
                    <div className="category-card-image-2">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt={article.title} />
                      ) : (
                        <img src="/ttttttt.jpg" alt={article.title} />
                      )}
                    </div>
                  )}
                  <div className="category-card-content-2">
                    <h3 className="category-card-title-2">{article.title}</h3>
                    <p className="category-card-time-2">
                      {(() => {
                        const publishedDate = new Date(article.publishedAt);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
                        
                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} mins ago`;
                        } else if (diffInMinutes < 1440) {
                          return `${Math.floor(diffInMinutes / 60)} hours ago`;
                        } else {
                          return `${Math.floor(diffInMinutes / 1440)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                </article>
              )) : (
                // Static fallback - only show if not enough API data
                <>
                  <article className="category-card-2 featured">
                    <div className="category-card-image-2">
                      <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                    </div>
                    <div className="category-card-content-2">
                      <h3 className="category-card-title-2">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                      <p className="category-card-time-2">September 18, 2025</p>
                    </div>
                  </article>

                  <article className="category-card-2">
                    <h3 className="category-card-title-2">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                    <p className="category-card-time-2">September 18, 2025</p>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Technology Section with Sidebar Layout 2 */}
        <div className="tech-sidebar-layout-2">
          
          {/* Technology Section 2 - 2x2 Grid */}
          <section className="technology-section-2">
            <div className="technology-header-2">
              <h2 className="technology-title-2">
                <a href="/technology" className="technology-link-2">Technology &gt;</a>
              </h2>
            </div>
            
            <div className="technology-cards-2">
              
              <article className="featured-article-2">
                <div className="featured-content-2">
                  <h1 className="featured-headline-2">
                    Holy war: How Russia recruited Orthodox priests to sway Moldova&apos;s voters
                  </h1>
                  <p className="featured-description-2">
                    Russia gave them debit cards loaded with hundreds of dollars on their return from Moscow excursions. The priests then created Telegram channels to promote traditional values over &quot;gay Europe.&quot;
                  </p>
                  <p className="featured-date-2">September 26, 2025</p>
                </div>
                <div className="featured-image-2">
                  <img 
                    src="/ttttttt.jpg" 
                    alt="Holy war: How Russia recruited Orthodox priests to sway Moldova's voters"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </article>
            </div>
          </section>

          {/* Sidebar 2 - 30% width */}
          <aside className="tech-sidebar-2">
            
            <article className="sidebar-news-item-2">
              <h3 className="sidebar-news-title-2">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time-2">2 hours ago</p>
            </article>

            <article className="sidebar-news-item-2">
              <h3 className="sidebar-news-title-2">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time-2">8 hours ago</p>
            </article>

            <article className="sidebar-news-item-2">
              <h3 className="sidebar-news-title-2">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time-2">9 hours ago</p>
            </article>

            <article className="sidebar-news-item-2">
              <h3 className="sidebar-news-title-2">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time-2">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Crypto Section 3 */}
        <section className="crypto-section-3">
          <div className="crypto-header-3">
            <h2 className="crypto-title-3">
              <a href="/crypto" className="crypto-link-3">Crypto &gt;</a>
            </h2>
          </div>
          
          <div className="crypto-cards-3">
            
            <article className="crypto-card-3">
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-3">31 mins ago</p>
              </div>
            </article>

            <article className="crypto-card-3">
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-3">7 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-3">
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-3">
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-3">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Categories Section 3 */}
        <section className="categories-section-3">
          <div className="categories-grid-3">
            
            {/* Business Column 3 */}
            <div className="category-column-3">
              <h2 className="category-header-3">
                <a href="/business" className="category-link-3">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-3 featured">
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time-3">7 mins ago</p>
                </div>
              </article>

              <article className="category-card-3">
                <h3 className="category-card-title-3">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time-3">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column 3 */}
            <div className="category-column-3">
              <h2 className="category-header-3">
                <a href="/sports" className="category-link-3">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-3 featured">
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                  <p className="category-card-time-3">6 hours ago</p>
                </div>
              </article>

              <article className="category-card-3">
                <h3 className="category-card-title-3">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time-3">10 hours ago</p>
              </article>
            </div>

            {/* AI Column 3 */}
            <div className="category-column-3">
              <h2 className="category-header-3">
                <a href="/ai" className="category-link-3">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-3 featured">
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-3">2 hours ago</p>
                </div>
              </article>

              <article className="category-card-3">
                <h3 className="category-card-title-3">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-3">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 3 */}
            <div className="category-column-3">
              <h2 className="category-header-3">
                <a href="/entertainment" className="category-link-3">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-3 featured">
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time-3">September 18, 2025</p>
                </div>
              </article>

              <article className="category-card-3">
                <h3 className="category-card-title-3">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time-3">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* World News Section 2 */}
        <section className="world-section-2">
          <div className="world-header-2">
            <h2 className="world-title-2">
              <a href="/world" className="world-link-2">World &gt;</a>
            </h2>
          </div>
          
          <div className="world-cards-2">
            
            <article className="world-card-2">
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                <p className="world-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article className="world-card-2">
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                <p className="world-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article className="world-card-2">
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="France protests strikes" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">France gears up for protests, strikes over budget cuts</h3>
                <p className="world-card-time-2">7 mins ago</p>
              </div>
            </article>

            <article className="world-card-2">
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="Australia grain industry beetle threat" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">Beetle that threatens Australia&apos;s grains industry found in imported nappies</h3>
                <p className="world-card-time-2">3 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Crypto Section 4 */}
        <section className="crypto-section-4">
          <div className="crypto-header-4">
            <h2 className="crypto-title-4">
              <a href="/crypto" className="crypto-link-4">Crypto &gt;</a>
            </h2>
          </div>
          
          <div className="crypto-cards-4">
            
            <article className="crypto-card-4">
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-4">31 mins ago</p>
              </div>
            </article>

            <article className="crypto-card-4">
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-4">7 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-4">
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-4">2 hours ago</p>
              </div>
            </article>

            <article className="crypto-card-4">
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-4">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Technology Section with Sidebar Layout 3 */}
        <div className="tech-sidebar-layout-3">
          
          {/* Technology Section 3 - 2x2 Grid */}
          <section className="technology-section-3">
            <div className="technology-header-3">
              <h2 className="technology-title-3">
                <a href="/technology" className="technology-link-3">Technology &gt;</a>
              </h2>
            </div>
            
            <div className="technology-cards-3">
              
              <article className="featured-article-3">
                <div className="featured-content-3">
                  <h1 className="featured-headline-3">
                    Climate technology summit announces $50 billion investment in clean energy solutions
                  </h1>
                  <p className="featured-description-3">
                    World leaders and tech giants commit to unprecedented funding for renewable energy infrastructure, promising to accelerate the global transition to sustainable power sources by 2030.
                  </p>
                  <p className="featured-date-3">September 26, 2025</p>
                </div>
                <div className="featured-image-3">
                  <img 
                    src="/ttttttt.jpg" 
                    alt="Climate technology summit announces $50 billion investment in clean energy solutions"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </article>
            </div>
          </section>

          {/* Sidebar 3 - 30% width */}
          <aside className="tech-sidebar-3">
            
            <article className="sidebar-news-item-3">
              <h3 className="sidebar-news-title-3">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time-3">2 hours ago</p>
            </article>

            <article className="sidebar-news-item-3">
              <h3 className="sidebar-news-title-3">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time-3">8 hours ago</p>
            </article>

            <article className="sidebar-news-item-3">
              <h3 className="sidebar-news-title-3">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time-3">9 hours ago</p>
            </article>

            <article className="sidebar-news-item-3">
              <h3 className="sidebar-news-title-3">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time-3">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Categories Section 4 */}
        <section className="categories-section-4">
          <div className="categories-grid-4">
            
            {/* Business Column 4 */}
            <div className="category-column-4">
              <h2 className="category-header-4">
                <a href="/business" className="category-link-4">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-4 featured">
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time-4">7 mins ago</p>
                </div>
              </article>

              <article className="category-card-4">
                <h3 className="category-card-title-4">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time-4">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column 4 */}
            <div className="category-column-4">
              <h2 className="category-header-4">
                <a href="/sports" className="category-link-4">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-4 featured">
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                  <p className="category-card-time-4">6 hours ago</p>
                </div>
              </article>

              <article className="category-card-4">
                <h3 className="category-card-title-4">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time-4">10 hours ago</p>
              </article>
            </div>

            {/* AI Column 4 */}
            <div className="category-column-4">
              <h2 className="category-header-4">
                <a href="/ai" className="category-link-4">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-4 featured">
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-4">2 hours ago</p>
                </div>
              </article>

              <article className="category-card-4">
                <h3 className="category-card-title-4">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-4">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 4 */}
            <div className="category-column-4">
              <h2 className="category-header-4">
                <a href="/entertainment" className="category-link-4">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="category-card-4 featured">
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time-4">September 18, 2025</p>
                </div>
              </article>

              <article className="category-card-4">
                <h3 className="category-card-title-4">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time-4">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* World News Section 3 */}
        <section className="world-section-3">
          <div className="world-header-3">
            <h2 className="world-title-3">
              <a href="/world" className="world-link-3">World &gt;</a>
            </h2>
          </div>
          
          <div className="world-cards-3">
            
            <article className="world-card-3">
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                <p className="world-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article className="world-card-3">
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                <p className="world-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article className="world-card-3">
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="France protests strikes" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">France gears up for protests, strikes over budget cuts</h3>
                <p className="world-card-time-3">7 mins ago</p>
              </div>
            </article>

            <article className="world-card-3">
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="Australia grain industry beetle threat" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">Beetle that threatens Australia&apos;s grains industry found in imported nappies</h3>
                <p className="world-card-time-3">3 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Entertainment Section 5 (Duplicated from Crypto Section 4) */}
        <section className="entertainment-section-5">
          <div className="entertainment-header-5">
            <h2 className="entertainment-title-5">
              <a href="/entertainment" className="entertainment-link-5">Entertainment &gt;</a>
            </h2>
          </div>
          
          <div className="entertainment-cards-5">
            
            <article className="entertainment-card-5">
              <div className="entertainment-card-content-5">
                <h3 className="entertainment-card-title-5">New Marvel movie breaks box office records in opening weekend</h3>
                <p className="entertainment-card-time-5">31 mins ago</p>
              </div>
            </article>

            <article className="entertainment-card-5">
              <div className="entertainment-card-content-5">
                <h3 className="entertainment-card-title-5">Taylor Swift announces surprise album during concert tour</h3>
                <p className="entertainment-card-time-5">7 hours ago</p>
              </div>
            </article>

            <article className="entertainment-card-5">
              <div className="entertainment-card-content-5">
                <h3 className="entertainment-card-title-5">Netflix original series wins Emmy for best drama</h3>
                <p className="entertainment-card-time-5">2 hours ago</p>
              </div>
            </article>

            <article className="entertainment-card-5">
              <div className="entertainment-card-content-5">
                <h3 className="entertainment-card-title-5">Hollywood actors reach new contract agreement after negotiations</h3>
                <p className="entertainment-card-time-5">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Local News Section 4 (Duplicated from World News Section 3) */}
        <section className="local-section-4">
          <div className="local-header-4">
            <h2 className="local-title-4">
              <a href="/local" className="local-link-4">Local &gt;</a>
            </h2>
          </div>
          
          <div className="local-cards-4">
            
            <article className="local-card-4">
              <div className="local-card-image-4">
                <img src="/ttttttt.jpg" alt="City council budget meeting" />
              </div>
              <div className="local-card-content-4">
                <h3 className="local-card-title-4">City council approves new budget for infrastructure improvements</h3>
                <p className="local-card-time-4">2 hours ago</p>
              </div>
            </article>

            <article className="local-card-4">
              <div className="local-card-image-4">
                <img src="/ttttttt.jpg" alt="Local school district announcement" />
              </div>
              <div className="local-card-content-4">
                <h3 className="local-card-title-4">School district announces new STEM programs for fall semester</h3>
                <p className="local-card-time-4">2 hours ago</p>
              </div>
            </article>

            <article className="local-card-4">
              <div className="local-card-image-4">
                <img src="/ttttttt.jpg" alt="Community park renovation" />
              </div>
              <div className="local-card-content-4">
                <h3 className="local-card-title-4">Downtown park renovation project begins next month</h3>
                <p className="local-card-time-4">7 mins ago</p>
              </div>
            </article>

            <article className="local-card-4">
              <div className="local-card-image-4">
                <img src="/ttttttt.jpg" alt="Local business expansion" />
              </div>
              <div className="local-card-content-4">
                <h3 className="local-card-title-4">Local tech startup expands operations with new downtown office</h3>
                <p className="local-card-time-4">3 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Health Categories Section 5 (Duplicated from Categories Section 4) */}
        <section className="health-categories-section-5">
          <div className="health-categories-grid-5">
            
            {/* Health Column 5 */}
            <div className="health-category-column-5">
              <h2 className="health-category-header-5">
                <a href="/health" className="health-category-link-5">Health</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-5 featured">
                <div className="health-category-card-image-5">
                  <img src="/ttttttt.jpg" alt="Medical breakthrough research" />
                </div>
                <div className="health-category-card-content-5">
                  <h3 className="health-category-card-title-5">New cancer treatment shows 95% success rate in clinical trials</h3>
                  <p className="health-category-card-time-5">7 mins ago</p>
                </div>
              </article>

              <article className="health-category-card-5">
                <h3 className="health-category-card-title-5">CDC updates vaccination guidelines for fall season</h3>
                <p className="health-category-card-time-5">10 hours ago</p>
              </article>
            </div>

            {/* Politics Column 5 */}
            <div className="health-category-column-5">
              <h2 className="health-category-header-5">
                <a href="/politics" className="health-category-link-5">Politics</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-5 featured">
                <div className="health-category-card-image-5">
                  <img src="/ttttttt.jpg" alt="Congressional hearing session" />
                </div>
                <div className="health-category-card-content-5">
                  <h3 className="health-category-card-title-5">Congress passes bipartisan infrastructure bill in key vote</h3>
                  <p className="health-category-card-time-5">6 hours ago</p>
                </div>
              </article>

              <article className="health-category-card-5">
                <h3 className="health-category-card-title-5">Senate committee reviews new climate policy proposals</h3>
                <p className="health-category-card-time-5">10 hours ago</p>
              </article>
            </div>

            {/* Business Column 5 */}
            <div className="health-category-column-5">
              <h2 className="health-category-header-5">
                <a href="/business" className="health-category-link-5">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-5 featured">
                <div className="health-category-card-image-5">
                  <img src="/ttttttt.jpg" alt="Stock market trends" />
                </div>
                <div className="health-category-card-content-5">
                  <h3 className="health-category-card-title-5">Tech stocks surge following quarterly earnings reports</h3>
                  <p className="health-category-card-time-5">2 hours ago</p>
                </div>
              </article>

              <article className="health-category-card-5">
                <h3 className="health-category-card-title-5">Federal Reserve considers interest rate adjustments next quarter</h3>
                <p className="health-category-card-time-5">4 hours ago</p>
              </article>
            </div>

            {/* Technology Column 5 */}
            <div className="health-category-column-5">
              <h2 className="health-category-header-5">
                <a href="/technology" className="health-category-link-5">Technology</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-5 featured">
                <div className="health-category-card-image-5">
                  <img src="/ttttttt.jpg" alt="AI innovation showcase" />
                </div>
                <div className="health-category-card-content-5">
                  <h3 className="health-category-card-title-5">Apple unveils revolutionary AI-powered features in latest update</h3>
                  <p className="health-category-card-time-5">September 18, 2025</p>
                </div>
              </article>

              <article className="health-category-card-5">
                <h3 className="health-category-card-title-5">Google announces breakthrough in quantum computing development</h3>
                <p className="health-category-card-time-5">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* Your fresh body content goes here */}
        <div className="home__grid">
          {/* Ready to build something new! */}
        </div>

        {/* Health Categories Section 6 (Duplicated from Health Categories Section 5) */}
        <section className="health-categories-section-6">
          <div className="health-categories-grid-6">
            
            {/* Health Column 6 */}
            <div className="health-category-column-6">
              <h2 className="health-category-header-6">
                <a href="/health" className="health-category-link-6">Health</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-6 featured">
                <div className="health-category-card-image-6">
                  <img src="/ttttttt.jpg" alt="Medical breakthrough research" />
                </div>
                <div className="health-category-card-content-6">
                  <h3 className="health-category-card-title-6">New cancer treatment shows 95% success rate in clinical trials</h3>
                  <p className="health-category-card-time-6">7 mins ago</p>
                </div>
              </article>

              <article className="health-category-card-6">
                <h3 className="health-category-card-title-6">CDC updates vaccination guidelines for fall season</h3>
                <p className="health-category-card-time-6">10 hours ago</p>
              </article>
            </div>

            {/* Politics Column 6 */}
            <div className="health-category-column-6">
              <h2 className="health-category-header-6">
                <a href="/politics" className="health-category-link-6">Politics</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-6 featured">
                <div className="health-category-card-image-6">
                  <img src="/ttttttt.jpg" alt="Congressional hearing session" />
                </div>
                <div className="health-category-card-content-6">
                  <h3 className="health-category-card-title-6">Congress passes bipartisan infrastructure bill in key vote</h3>
                  <p className="health-category-card-time-6">6 hours ago</p>
                </div>
              </article>

              <article className="health-category-card-6">
                <h3 className="health-category-card-title-6">Senate committee reviews new climate policy proposals</h3>
                <p className="health-category-card-time-6">10 hours ago</p>
              </article>
            </div>

            {/* Business Column 6 */}
            <div className="health-category-column-6">
              <h2 className="health-category-header-6">
                <a href="/business" className="health-category-link-6">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-6 featured">
                <div className="health-category-card-image-6">
                  <img src="/ttttttt.jpg" alt="Stock market trends" />
                </div>
                <div className="health-category-card-content-6">
                  <h3 className="health-category-card-title-6">Tech stocks surge following quarterly earnings reports</h3>
                  <p className="health-category-card-time-6">2 hours ago</p>
                </div>
              </article>

              <article className="health-category-card-6">
                <h3 className="health-category-card-title-6">Federal Reserve considers interest rate adjustments next quarter</h3>
                <p className="health-category-card-time-6">4 hours ago</p>
              </article>
            </div>

            {/* Technology Column 6 */}
            <div className="health-category-column-6">
              <h2 className="health-category-header-6">
                <a href="/technology" className="health-category-link-6">Technology</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article className="health-category-card-6 featured">
                <div className="health-category-card-image-6">
                  <img src="/ttttttt.jpg" alt="AI innovation showcase" />
                </div>
                <div className="health-category-card-content-6">
                  <h3 className="health-category-card-title-6">Apple unveils revolutionary AI-powered features in latest update</h3>
                  <p className="health-category-card-time-6">September 18, 2025</p>
                </div>
              </article>

              <article className="health-category-card-6">
                <h3 className="health-category-card-title-6">Google announces breakthrough in quantum computing development</h3>
                <p className="health-category-card-time-6">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Home;