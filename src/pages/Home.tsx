import React from 'react';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        {/* World News Section */}
        <section id="world-news-section" className="world-section">
          <div className="world-header">
            <h2 id="world-title" className="world-title">
              <a href="/world" className="world-link">World &gt;</a>
              <span className="id-label">world-title</span>
            </h2>
          </div>
          
          <div id="world-cards-container" className="world-cards">
            <span className="id-label">world-cards-container</span>
            
            <article id="world-card-1" className="world-card">
              <span className="id-label">world-card-1</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                <p className="world-card-time">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-2" className="world-card">
              <span className="id-label">world-card-2</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                <p className="world-card-time">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-3" className="world-card">
              <span className="id-label">world-card-3</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="France protests strikes" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">France gears up for protests, strikes over budget cuts</h3>
                <p className="world-card-time">7 mins ago</p>
              </div>
            </article>

            <article id="world-card-4" className="world-card">
              <span className="id-label">world-card-4</span>
              <div className="world-card-image">
                <img src="/ttttttt.jpg" alt="Australia grain industry beetle threat" />
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">Beetle that threatens Australia&apos;s grains industry found in imported nappies</h3>
                <p className="world-card-time">3 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Crypto Section */}
        <section id="crypto-section" className="crypto-section">
          <div className="crypto-header">
            <h2 id="crypto-title" className="crypto-title">
              <a href="/crypto" className="crypto-link">Crypto &gt;</a>
              <span className="id-label">crypto-title</span>
            </h2>
          </div>
          
          <div id="crypto-cards-container" className="crypto-cards">
            <span className="id-label">crypto-cards-container</span>
            
            <article id="crypto-card-1" className="crypto-card">
              <span className="id-label">crypto-card-1</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time">31 mins ago</p>
              </div>
            </article>

            <article id="crypto-card-2" className="crypto-card">
              <span className="id-label">crypto-card-2</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time">7 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-3" className="crypto-card">
              <span className="id-label">crypto-card-3</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time">2 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-4" className="crypto-card">
              <span className="id-label">crypto-card-4</span>
              <div className="crypto-card-content">
                <h3 className="crypto-card-title">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Technology Section with Sidebar Layout */}
        <div id="tech-sidebar-layout" className="tech-sidebar-layout">
          <span className="id-label">tech-sidebar-layout</span>
          
          {/* Technology Section - 2x2 Grid */}
          <section id="technology-news-section" className="technology-section">
            <div className="technology-header">
              <h2 id="technology-title" className="technology-title">
                <a href="/technology" className="technology-link">Technology &gt;</a>
                <span className="id-label">technology-title</span>
              </h2>
            </div>
            
            <div id="technology-cards-container" className="technology-cards">
              <span className="id-label">technology-cards-container</span>
              
              <article id="tech-card-1" className="tech-card">
                <span className="id-label">tech-card-1</span>
              </article>

              <article id="tech-card-2" className="tech-card">
                <span className="id-label">tech-card-2</span>
              </article>

              <article id="tech-card-3" className="tech-card">
                <span className="id-label">tech-card-3</span>
              </article>

              <article id="tech-card-4" className="tech-card">
                <span className="id-label">tech-card-4</span>
              </article>
            </div>
          </section>

          {/* Sidebar - 30% width */}
          <aside id="tech-sidebar" className="tech-sidebar">
            <span className="id-label">tech-sidebar</span>
            
            <article id="sidebar-news-1" className="sidebar-news-item">
              <span className="id-label">sidebar-news-1</span>
              <h3 className="sidebar-news-title">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time">2 hours ago</p>
            </article>

            <article id="sidebar-news-2" className="sidebar-news-item">
              <span className="id-label">sidebar-news-2</span>
              <h3 className="sidebar-news-title">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time">8 hours ago</p>
            </article>

            <article id="sidebar-news-3" className="sidebar-news-item">
              <span className="id-label">sidebar-news-3</span>
              <h3 className="sidebar-news-title">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time">9 hours ago</p>
            </article>

            <article id="sidebar-news-4" className="sidebar-news-item">
              <span className="id-label">sidebar-news-4</span>
              <h3 className="sidebar-news-title">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Categories Section */}
        <section id="categories-section" className="categories-section">
          <span className="id-label">categories-section</span>
          <div className="categories-grid">
            {/* Business Column */}
            <div id="business-column" className="category-column">
              <span className="id-label">business-column</span>
              <h2 id="business-header" className="category-header">
                <span className="id-label">business-header</span>
                <a href="/business" className="category-link">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="business-card-1" className="category-card featured">
                <span className="id-label">business-card-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Luxury brands challenge" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time">7 mins ago</p>
                </div>
              </article>

              <article id="business-card-2" className="category-card">
                <span className="id-label">business-card-2</span>
                <h3 className="category-card-title">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column */}
            <div id="sports-column" className="category-column">
              <span className="id-label">sports-column</span>
              <h2 id="sports-header" className="category-header">
                <span className="id-label">sports-header</span>
                <a href="/sports" className="category-link">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="sports-card-1" className="category-card featured">
                <span className="id-label">sports-card-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">How Canada&apos;s Haisla became the world&apos;s first Indigenous LNG owners</h3>
                  <p className="category-card-time">6 hours ago</p>
                </div>
              </article>

              <article id="sports-card-2" className="category-card">
                <span className="id-label">sports-card-2</span>
                <h3 className="category-card-title">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time">10 hours ago</p>
              </article>
            </div>

            {/* AI Column */}
            <div id="ai-column" className="category-column">
              <span className="id-label">ai-column</span>
              <h2 id="ai-header" className="category-header">
                <span className="id-label">ai-header</span>
                <a href="/ai" className="category-link">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ai-card-1" className="category-card featured">
                <span className="id-label">ai-card-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Apple AI blood pressure" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Apple used AI to uncover new blood pressure notification feature in Watch</h3>
                  <p className="category-card-time">2 hours ago</p>
                </div>
              </article>

              <article id="ai-card-2" className="category-card">
                <span className="id-label">ai-card-2</span>
                <h3 className="category-card-title">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column */}
            <div id="entertainment-column" className="category-column">
              <span className="id-label">entertainment-column</span>
              <h2 id="entertainment-header" className="category-header">
                <span className="id-label">entertainment-header</span>
                <a href="/entertainment" className="category-link">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="entertainment-card-1" className="category-card featured">
                <span className="id-label">entertainment-card-1</span>
                <div className="category-card-image">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time">September 18, 2025</p>
                </div>
              </article>

              <article id="entertainment-card-2" className="category-card">
                <span className="id-label">entertainment-card-2</span>
                <h3 className="category-card-title">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* Crypto Section 2 */}
        <section id="crypto-section-2" className="crypto-section-2">
          <div className="crypto-header-2">
            <h2 id="crypto-title-2" className="crypto-title-2">
              <a href="/crypto" className="crypto-link-2">Crypto &gt;</a>
              <span className="id-label">crypto-title-2</span>
            </h2>
          </div>
          
          <div id="crypto-cards-container-2" className="crypto-cards-2">
            <span className="id-label">crypto-cards-container-2</span>
            
            <article id="crypto-card-2-1" className="crypto-card-2">
              <span className="id-label">crypto-card-2-1</span>
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-2">31 mins ago</p>
              </div>
            </article>

            <article id="crypto-card-2-2" className="crypto-card-2">
              <span className="id-label">crypto-card-2-2</span>
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-2">7 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-2-3" className="crypto-card-2">
              <span className="id-label">crypto-card-2-3</span>
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-2-4" className="crypto-card-2">
              <span className="id-label">crypto-card-2-4</span>
              <div className="crypto-card-content-2">
                <h3 className="crypto-card-title-2">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-2">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Categories Section 2 */}
        <section id="categories-section-2" className="categories-section-2">
          <span className="id-label">categories-section-2</span>
          <div id="categories-grid-2" className="categories-grid-2">
            <span className="id-label">categories-grid-2</span>
            
            {/* Business Column 2 */}
            <div id="business-column-2" className="category-column-2">
              <span className="id-label">business-column-2</span>
              <h2 id="business-header-2" className="category-header-2">
                <span className="id-label">business-header-2</span>
                <a href="/business" className="category-link-2">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="business-card-2-1" className="category-card-2 featured">
                <span className="id-label">business-card-2-1</span>
                <div className="category-card-image-2">
                  <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                </div>
                <div className="category-card-content-2">
                  <h3 className="category-card-title-2">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time-2">7 mins ago</p>
                </div>
              </article>

              <article id="business-card-2-2" className="category-card-2">
                <span className="id-label">business-card-2-2</span>
                <h3 className="category-card-title-2">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time-2">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column 2 */}
            <div id="sports-column-2" className="category-column-2">
              <span className="id-label">sports-column-2</span>
              <h2 id="sports-header-2" className="category-header-2">
                <span className="id-label">sports-header-2</span>
                <a href="/sports" className="category-link-2">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="sports-card-2-1" className="category-card-2 featured">
                <span className="id-label">sports-card-2-1</span>
                <div className="category-card-image-2">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content-2">
                  <h3 className="category-card-title-2">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                  <p className="category-card-time-2">6 hours ago</p>
                </div>
              </article>

              <article id="sports-card-2-2" className="category-card-2">
                <span className="id-label">sports-card-2-2</span>
                <h3 className="category-card-title-2">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time-2">10 hours ago</p>
              </article>
            </div>

            {/* AI Column 2 */}
            <div id="ai-column-2" className="category-column-2">
              <span className="id-label">ai-column-2</span>
              <h2 id="ai-header-2" className="category-header-2">
                <span className="id-label">ai-header-2</span>
                <a href="/ai" className="category-link-2">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ai-card-2-1" className="category-card-2 featured">
                <span className="id-label">ai-card-2-1</span>
                <div className="category-card-image-2">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-2">
                  <h3 className="category-card-title-2">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-2">2 hours ago</p>
                </div>
              </article>

              <article id="ai-card-2-2" className="category-card-2">
                <span className="id-label">ai-card-2-2</span>
                <h3 className="category-card-title-2">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-2">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 2 */}
            <div id="entertainment-column-2" className="category-column-2">
              <span className="id-label">entertainment-column-2</span>
              <h2 id="entertainment-header-2" className="category-header-2">
                <span className="id-label">entertainment-header-2</span>
                <a href="/entertainment" className="category-link-2">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="entertainment-card-2-1" className="category-card-2 featured">
                <span className="id-label">entertainment-card-2-1</span>
                <div className="category-card-image-2">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content-2">
                  <h3 className="category-card-title-2">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time-2">September 18, 2025</p>
                </div>
              </article>

              <article id="entertainment-card-2-2" className="category-card-2">
                <span className="id-label">entertainment-card-2-2</span>
                <h3 className="category-card-title-2">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time-2">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* Technology Section with Sidebar Layout 2 */}
        <div id="tech-sidebar-layout-2" className="tech-sidebar-layout-2">
          <span className="id-label">tech-sidebar-layout-2</span>
          
          {/* Technology Section 2 - 2x2 Grid */}
          <section id="technology-news-section-2" className="technology-section-2">
            <div className="technology-header-2">
              <h2 id="technology-title-2" className="technology-title-2">
                <a href="/technology" className="technology-link-2">Technology &gt;</a>
                <span className="id-label">technology-title-2</span>
              </h2>
            </div>
            
            <div id="technology-cards-container-2" className="technology-cards-2">
              <span className="id-label">technology-cards-container-2</span>
              
              <article id="tech-card-2-1" className="tech-card-2">
                <span className="id-label">tech-card-2-1</span>
              </article>

              <article id="tech-card-2-2" className="tech-card-2">
                <span className="id-label">tech-card-2-2</span>
              </article>

              <article id="tech-card-2-3" className="tech-card-2">
                <span className="id-label">tech-card-2-3</span>
              </article>

              <article id="tech-card-2-4" className="tech-card-2">
                <span className="id-label">tech-card-2-4</span>
              </article>
            </div>
          </section>

          {/* Sidebar 2 - 30% width */}
          <aside id="tech-sidebar-2" className="tech-sidebar-2">
            <span className="id-label">tech-sidebar-2</span>
            
            <article id="sidebar-news-2-1" className="sidebar-news-item-2">
              <span className="id-label">sidebar-news-2-1</span>
              <h3 className="sidebar-news-title-2">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time-2">2 hours ago</p>
            </article>

            <article id="sidebar-news-2-2" className="sidebar-news-item-2">
              <span className="id-label">sidebar-news-2-2</span>
              <h3 className="sidebar-news-title-2">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time-2">8 hours ago</p>
            </article>

            <article id="sidebar-news-2-3" className="sidebar-news-item-2">
              <span className="id-label">sidebar-news-2-3</span>
              <h3 className="sidebar-news-title-2">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time-2">9 hours ago</p>
            </article>

            <article id="sidebar-news-2-4" className="sidebar-news-item-2">
              <span className="id-label">sidebar-news-2-4</span>
              <h3 className="sidebar-news-title-2">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time-2">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Crypto Section 3 */}
        <section id="crypto-section-3" className="crypto-section-3">
          <div className="crypto-header-3">
            <h2 id="crypto-title-3" className="crypto-title-3">
              <a href="/crypto" className="crypto-link-3">Crypto &gt;</a>
              <span className="id-label">crypto-title-3</span>
            </h2>
          </div>
          
          <div id="crypto-cards-container-3" className="crypto-cards-3">
            <span className="id-label">crypto-cards-container-3</span>
            
            <article id="crypto-card-3-1" className="crypto-card-3">
              <span className="id-label">crypto-card-3-1</span>
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-3">31 mins ago</p>
              </div>
            </article>

            <article id="crypto-card-3-2" className="crypto-card-3">
              <span className="id-label">crypto-card-3-2</span>
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-3">7 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-3-3" className="crypto-card-3">
              <span className="id-label">crypto-card-3-3</span>
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-3-4" className="crypto-card-3">
              <span className="id-label">crypto-card-3-4</span>
              <div className="crypto-card-content-3">
                <h3 className="crypto-card-title-3">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-3">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Categories Section 3 */}
        <section id="categories-section-3" className="categories-section-3">
          <span className="id-label">categories-section-3</span>
          <div id="categories-grid-3" className="categories-grid-3">
            <span className="id-label">categories-grid-3</span>
            
            {/* Business Column 3 */}
            <div id="business-column-3" className="category-column-3">
              <span className="id-label">business-column-3</span>
              <h2 id="business-header-3" className="category-header-3">
                <span className="id-label">business-header-3</span>
                <a href="/business" className="category-link-3">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="business-card-3-1" className="category-card-3 featured">
                <span className="id-label">business-card-3-1</span>
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time-3">7 mins ago</p>
                </div>
              </article>

              <article id="business-card-3-2" className="category-card-3">
                <span className="id-label">business-card-3-2</span>
                <h3 className="category-card-title-3">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time-3">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column 3 */}
            <div id="sports-column-3" className="category-column-3">
              <span className="id-label">sports-column-3</span>
              <h2 id="sports-header-3" className="category-header-3">
                <span className="id-label">sports-header-3</span>
                <a href="/sports" className="category-link-3">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="sports-card-3-1" className="category-card-3 featured">
                <span className="id-label">sports-card-3-1</span>
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                  <p className="category-card-time-3">6 hours ago</p>
                </div>
              </article>

              <article id="sports-card-3-2" className="category-card-3">
                <span className="id-label">sports-card-3-2</span>
                <h3 className="category-card-title-3">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time-3">10 hours ago</p>
              </article>
            </div>

            {/* AI Column 3 */}
            <div id="ai-column-3" className="category-column-3">
              <span className="id-label">ai-column-3</span>
              <h2 id="ai-header-3" className="category-header-3">
                <span className="id-label">ai-header-3</span>
                <a href="/ai" className="category-link-3">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ai-card-3-1" className="category-card-3 featured">
                <span className="id-label">ai-card-3-1</span>
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-3">2 hours ago</p>
                </div>
              </article>

              <article id="ai-card-3-2" className="category-card-3">
                <span className="id-label">ai-card-3-2</span>
                <h3 className="category-card-title-3">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-3">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 3 */}
            <div id="entertainment-column-3" className="category-column-3">
              <span className="id-label">entertainment-column-3</span>
              <h2 id="entertainment-header-3" className="category-header-3">
                <span className="id-label">entertainment-header-3</span>
                <a href="/entertainment" className="category-link-3">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="entertainment-card-3-1" className="category-card-3 featured">
                <span className="id-label">entertainment-card-3-1</span>
                <div className="category-card-image-3">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content-3">
                  <h3 className="category-card-title-3">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time-3">September 18, 2025</p>
                </div>
              </article>

              <article id="entertainment-card-3-2" className="category-card-3">
                <span className="id-label">entertainment-card-3-2</span>
                <h3 className="category-card-title-3">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time-3">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* World News Section 2 */}
        <section id="world-news-section-2" className="world-section-2">
          <div className="world-header-2">
            <h2 id="world-title-2" className="world-title-2">
              <a href="/world" className="world-link-2">World &gt;</a>
              <span className="id-label">world-title-2</span>
            </h2>
          </div>
          
          <div id="world-cards-container-2" className="world-cards-2">
            <span className="id-label">world-cards-container-2</span>
            
            <article id="world-card-2-1" className="world-card-2">
              <span className="id-label">world-card-2-1</span>
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                <p className="world-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-2-2" className="world-card-2">
              <span className="id-label">world-card-2-2</span>
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                <p className="world-card-time-2">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-2-3" className="world-card-2">
              <span className="id-label">world-card-2-3</span>
              <div className="world-card-image-2">
                <img src="/ttttttt.jpg" alt="France protests strikes" />
              </div>
              <div className="world-card-content-2">
                <h3 className="world-card-title-2">France gears up for protests, strikes over budget cuts</h3>
                <p className="world-card-time-2">7 mins ago</p>
              </div>
            </article>

            <article id="world-card-2-4" className="world-card-2">
              <span className="id-label">world-card-2-4</span>
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
        <section id="crypto-section-4" className="crypto-section-4">
          <div className="crypto-header-4">
            <h2 id="crypto-title-4" className="crypto-title-4">
              <a href="/crypto" className="crypto-link-4">Crypto &gt;</a>
              <span className="id-label">crypto-title-4</span>
            </h2>
          </div>
          
          <div id="crypto-cards-container-4" className="crypto-cards-4">
            <span className="id-label">crypto-cards-container-4</span>
            
            <article id="crypto-card-4-1" className="crypto-card-4">
              <span className="id-label">crypto-card-4-1</span>
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Wall St steadies with indexes on track for weekly gains; FedEx jumps</h3>
                <p className="crypto-card-time-4">31 mins ago</p>
              </div>
            </article>

            <article id="crypto-card-4-2" className="crypto-card-4">
              <span className="id-label">crypto-card-4-2</span>
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Pound, gilts hit by surge in UK borrowing</h3>
                <p className="crypto-card-time-4">7 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-4-3" className="crypto-card-4">
              <span className="id-label">crypto-card-4-3</span>
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">EU ministers reach &apos;compromise&apos; on digital euro roadmap</h3>
                <p className="crypto-card-time-4">2 hours ago</p>
              </div>
            </article>

            <article id="crypto-card-4-4" className="crypto-card-4">
              <span className="id-label">crypto-card-4-4</span>
              <div className="crypto-card-content-4">
                <h3 className="crypto-card-title-4">Adani Group stocks rise as SEBI&apos;s dismissal signals end to Hindenburg overhang</h3>
                <p className="crypto-card-time-4">4 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Technology Section with Sidebar Layout 3 */}
        <div id="tech-sidebar-layout-3" className="tech-sidebar-layout-3">
          <span className="id-label">tech-sidebar-layout-3</span>
          
          {/* Technology Section 3 - 2x2 Grid */}
          <section id="technology-news-section-3" className="technology-section-3">
            <div className="technology-header-3">
              <h2 id="technology-title-3" className="technology-title-3">
                <a href="/technology" className="technology-link-3">Technology &gt;</a>
                <span className="id-label">technology-title-3</span>
              </h2>
            </div>
            
            <div id="technology-cards-container-3" className="technology-cards-3">
              <span className="id-label">technology-cards-container-3</span>
              
              <article id="tech-card-3-1" className="tech-card-3">
                <span className="id-label">tech-card-3-1</span>
              </article>

              <article id="tech-card-3-2" className="tech-card-3">
                <span className="id-label">tech-card-3-2</span>
              </article>

              <article id="tech-card-3-3" className="tech-card-3">
                <span className="id-label">tech-card-3-3</span>
              </article>

              <article id="tech-card-3-4" className="tech-card-3">
                <span className="id-label">tech-card-3-4</span>
              </article>
            </div>
          </section>

          {/* Sidebar 3 - 30% width */}
          <aside id="tech-sidebar-3" className="tech-sidebar-3">
            <span className="id-label">tech-sidebar-3</span>
            
            <article id="sidebar-news-3-1" className="sidebar-news-item-3">
              <span className="id-label">sidebar-news-3-1</span>
              <h3 className="sidebar-news-title-3">Hollywood comes to Kimmel&apos;s defense after ABC pulls late-night show</h3>
              <p className="sidebar-news-time-3">2 hours ago</p>
            </article>

            <article id="sidebar-news-3-2" className="sidebar-news-item-3">
              <span className="id-label">sidebar-news-3-2</span>
              <h3 className="sidebar-news-title-3">Unresolved questions hang over case against Charlie Kirk&apos;s accused killer</h3>
              <p className="sidebar-news-time-3">8 hours ago</p>
            </article>

            <article id="sidebar-news-3-3" className="sidebar-news-item-3">
              <span className="id-label">sidebar-news-3-3</span>
              <h3 className="sidebar-news-title-3">White House readies executive order on political violence as liberal groups sound warning</h3>
              <p className="sidebar-news-time-3">9 hours ago</p>
            </article>

            <article id="sidebar-news-3-4" className="sidebar-news-item-3">
              <span className="id-label">sidebar-news-3-4</span>
              <h3 className="sidebar-news-title-3">Markets respond to Federal Reserve&apos;s latest interest rate decision</h3>
              <p className="sidebar-news-time-3">10 hours ago</p>
            </article>
          </aside>
        </div>

        {/* Categories Section 4 */}
        <section id="categories-section-4" className="categories-section-4">
          <span className="id-label">categories-section-4</span>
          <div id="categories-grid-4" className="categories-grid-4">
            <span className="id-label">categories-grid-4</span>
            
            {/* Business Column 4 */}
            <div id="business-column-4" className="category-column-4">
              <span className="id-label">business-column-4</span>
              <h2 id="business-header-4" className="category-header-4">
                <span className="id-label">business-header-4</span>
                <a href="/business" className="category-link-4">Business</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="business-card-4-1" className="category-card-4 featured">
                <span className="id-label">business-card-4-1</span>
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">Luxury brands&apos; big challenge: figuring out Gen Z</h3>
                  <p className="category-card-time-4">7 mins ago</p>
                </div>
              </article>

              <article id="business-card-4-2" className="category-card-4">
                <span className="id-label">business-card-4-2</span>
                <h3 className="category-card-title-4">UK retail sales rise by more than expected in August, ONS says</h3>
                <p className="category-card-time-4">10 hours ago</p>
              </article>
            </div>

            {/* Sports Column 4 */}
            <div id="sports-column-4" className="category-column-4">
              <span className="id-label">sports-column-4</span>
              <h2 id="sports-header-4" className="category-header-4">
                <span className="id-label">sports-header-4</span>
                <a href="/sports" className="category-link-4">Sports</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="sports-card-4-1" className="category-card-4 featured">
                <span className="id-label">sports-card-4-1</span>
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Canada Haisla LNG" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">How Canada&apos;s Haisla became the world&apos;s first indigenous LNG owners</h3>
                  <p className="category-card-time-4">6 hours ago</p>
                </div>
              </article>

              <article id="sports-card-4-2" className="category-card-4">
                <span className="id-label">sports-card-4-2</span>
                <h3 className="category-card-title-4">Exclusive: China snaps up Australian canola after trade spat with Canada</h3>
                <p className="category-card-time-4">10 hours ago</p>
              </article>
            </div>

            {/* AI Column 4 */}
            <div id="ai-column-4" className="category-column-4">
              <span className="id-label">ai-column-4</span>
              <h2 id="ai-header-4" className="category-header-4">
                <span className="id-label">ai-header-4</span>
                <a href="/ai" className="category-link-4">AI</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="ai-card-4-1" className="category-card-4 featured">
                <span className="id-label">ai-card-4-1</span>
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="OpenAI notification feature" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">OpenAI introduces new notification feature in Watch</h3>
                  <p className="category-card-time-4">2 hours ago</p>
                </div>
              </article>

              <article id="ai-card-4-2" className="category-card-4">
                <span className="id-label">ai-card-4-2</span>
                <h3 className="category-card-title-4">China&apos;s Huawei co-develops DeepSeek model, improves censoring</h3>
                <p className="category-card-time-4">4 hours ago</p>
              </article>
            </div>

            {/* Entertainment Column 4 */}
            <div id="entertainment-column-4" className="category-column-4">
              <span className="id-label">entertainment-column-4</span>
              <h2 id="entertainment-header-4" className="category-header-4">
                <span className="id-label">entertainment-header-4</span>
                <a href="/entertainment" className="category-link-4">Entertainment</a>
                <span className="arrow-symbol">›</span>
              </h2>
              
              <article id="entertainment-card-4-1" className="category-card-4 featured">
                <span className="id-label">entertainment-card-4-1</span>
                <div className="category-card-image-4">
                  <img src="/ttttttt.jpg" alt="Taiwan arms show" />
                </div>
                <div className="category-card-content-4">
                  <h3 className="category-card-title-4">Taiwan&apos;s spending bonanza draws more foreign firms to its largest arms show</h3>
                  <p className="category-card-time-4">September 18, 2025</p>
                </div>
              </article>

              <article id="entertainment-card-4-2" className="category-card-4">
                <span className="id-label">entertainment-card-4-2</span>
                <h3 className="category-card-title-4">Small US defense stocks soar on rush for next-gen battlefield tech</h3>
                <p className="category-card-time-4">September 18, 2025</p>
              </article>
            </div>
          </div>
        </section>

        {/* World News Section 3 */}
        <section id="world-news-section-3" className="world-section-3">
          <div className="world-header-3">
            <h2 id="world-title-3" className="world-title-3">
              <a href="/world" className="world-link-3">World &gt;</a>
              <span className="id-label">world-title-3</span>
            </h2>
          </div>
          
          <div id="world-cards-container-3" className="world-cards-3">
            <span className="id-label">world-cards-container-3</span>
            
            <article id="world-card-3-1" className="world-card-3">
              <span className="id-label">world-card-3-1</span>
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="Saudi Arabia Pakistan defense meeting" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">Saudi Arabia, nuclear-armed Pakistan sign mutual defence pact</h3>
                <p className="world-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-3-2" className="world-card-3">
              <span className="id-label">world-card-3-2</span>
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="Starmer Trump meeting" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">Starmer and Trump to discuss foreign affairs, investment after pomp-filled royal welcome</h3>
                <p className="world-card-time-3">2 hours ago</p>
              </div>
            </article>

            <article id="world-card-3-3" className="world-card-3">
              <span className="id-label">world-card-3-3</span>
              <div className="world-card-image-3">
                <img src="/ttttttt.jpg" alt="France protests strikes" />
              </div>
              <div className="world-card-content-3">
                <h3 className="world-card-title-3">France gears up for protests, strikes over budget cuts</h3>
                <p className="world-card-time-3">7 mins ago</p>
              </div>
            </article>

            <article id="world-card-3-4" className="world-card-3">
              <span className="id-label">world-card-3-4</span>
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

        {/* Your fresh body content goes here */}
        <div className="home__grid">
          {/* Ready to build something new! */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;