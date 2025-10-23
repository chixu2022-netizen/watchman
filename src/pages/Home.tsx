import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import NewsSection from '../components/Home/NewsSection';
import CategoryGrid from '../components/Home/CategoryGrid';
import TechWithSidebar from '../components/Home/TechWithSidebar';
import LazySection from '../components/Home/LazySection';
import { optimizedNewsService } from '../services/optimizedNewsService';
import { NewsArticle } from '../types/news';
import './Home.css';

function Home() {
  const [newsData, setNewsData] = useState<{[key: string]: NewsArticle[]}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        console.log('🚀 Fetching news for homepage...');
        
        // Fetch all categories at once using optimized service
        const categories = [
          'world', 'crypto', 'technology', 'business',
          'sports', 'entertainment', 'health', 'politics',
          'local'
        ];

        const newsPromises = categories.map(category =>
          optimizedNewsService.getNewsByCategory(category, 10)
            .then(articles => ({ category, articles }))
            .catch(error => {
              console.error(`Error fetching ${category}:`, error);
              return { category, articles: [] };
            })
        );

        const results = await Promise.all(newsPromises);
        
        const allNews: {[key: string]: NewsArticle[]} = {};
        results.forEach(({ category, articles }) => {
          allNews[category] = articles;
        });

        setNewsData(allNews);
        console.log('✅ Homepage news loaded:', Object.keys(allNews));
        
      } catch (error) {
        console.error('❌ Error fetching homepage news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  // Helper to get articles safely
  const getArticles = (category: string, count: number = 4): NewsArticle[] => {
    return (newsData[category] || []).slice(0, count);
  };

  return (
    <div className="home">
      <StockTicker />
      
      <div className="home__container">
        
        {/* Featured Tech Section with Sidebar - Loads First */}
        <TechWithSidebar
          featuredArticle={getArticles('technology', 1)[0] || {
            id: 'featured',
            title: 'Latest Technology News',
            description: 'Stay updated with the latest tech innovations and breakthroughs.',
            imageUrl: '/ttttttt.jpg',
            publishedAt: new Date().toISOString(),
            url: '#',
            source: { name: 'Tech News' },
            category: 'technology'
          }}
          sidebarArticles={getArticles('world', 4)}
          showHeader={false}
        />

        {/* World News Section */}
        <NewsSection
          articles={getArticles('world', 4)}
          title="World"
          link="/world"
          sectionClass="world-section"
          headerClass="world-header"
          cardsClass="world-cards"
          cardClass="world-card"
          showImages={true}
          loading={loading}
        />

        {/* Crypto Section */}
        <LazySection>
          <NewsSection
            articles={getArticles('crypto', 4)}
            title="Crypto"
            link="/crypto"
            sectionClass="crypto-section"
            headerClass="crypto-header"
            cardsClass="crypto-cards"
            cardClass="crypto-card"
            showImages={false}
            loading={loading}
          />
        </LazySection>

        {/* Technology Section with Sidebar */}
        <LazySection>
          <TechWithSidebar
            featuredArticle={getArticles('technology', 2)[1] || getArticles('technology', 1)[0] || {
              id: 'tech-featured',
              title: 'Technology Innovation',
              description: 'Discover the latest in technology and innovation.',
              imageUrl: '/ttttttt.jpg',
              publishedAt: new Date().toISOString(),
              url: '#',
              source: { name: 'Tech Source' },
              category: 'technology'
            }}
            sidebarArticles={getArticles('business', 4)}
            showHeader={true}
          />
        </LazySection>

        {/* Categories Grid 1: Business, Sports, Entertainment, Health */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Business', articles: getArticles('business', 2), link: '/business' },
              { name: 'Sports', articles: getArticles('sports', 2), link: '/sports' },
              { name: 'Entertainment', articles: getArticles('entertainment', 2), link: '/entertainment' },
              { name: 'Health', articles: getArticles('health', 2), link: '/health' }
            ]}
            sectionClass="categories-section"
            loading={loading}
          />
        </LazySection>

        {/* Crypto Section 2 */}
        <LazySection>
          <NewsSection
            articles={getArticles('crypto', 4).slice(4, 8)}
            title="Crypto"
            link="/crypto"
            sectionClass="crypto-section-2"
            headerClass="crypto-header-2"
            cardsClass="crypto-cards-2"
            cardClass="crypto-card-2"
            showImages={false}
          />
        </LazySection>

        {/* Categories Grid 2: Business, Sports, Entertainment, Health (More Articles) */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Business', articles: getArticles('business', 4).slice(2, 4), link: '/business' },
              { name: 'Sports', articles: getArticles('sports', 4).slice(2, 4), link: '/sports' },
              { name: 'Entertainment', articles: getArticles('entertainment', 4).slice(2, 4), link: '/entertainment' },
              { name: 'Health', articles: getArticles('health', 4).slice(2, 4), link: '/health' }
            ]}
            sectionClass="categories-section-2"
            gridClass="categories-grid-2"
            columnClass="category-column-2"
          />
        </LazySection>

        {/* Technology with Sidebar 2 */}
        <LazySection>
          <TechWithSidebar
            featuredArticle={getArticles('technology', 3)[2] || getArticles('technology', 1)[0] || {
              id: 'tech-2',
              title: 'Tech Updates',
              description: 'Latest technology developments and trends.',
              imageUrl: '/ttttttt.jpg',
              publishedAt: new Date().toISOString(),
              url: '#',
              source: { name: 'Tech News' },
              category: 'technology'
            }}
            sidebarArticles={getArticles('sports', 4)}
            layoutClass="tech-sidebar-layout-2"
            sectionClass="technology-section-2"
            sidebarClass="tech-sidebar-2"
          />
        </LazySection>

        {/* Crypto Section 3 */}
        <LazySection>
          <NewsSection
            articles={getArticles('business', 4)}
            title="Crypto"
            link="/crypto"
            sectionClass="crypto-section-3"
            headerClass="crypto-header-3"
            cardsClass="crypto-cards-3"
            cardClass="crypto-card-3"
            showImages={false}
          />
        </LazySection>

        {/* Categories Grid 3 */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Business', articles: getArticles('business', 6).slice(4, 6), link: '/business' },
              { name: 'Sports', articles: getArticles('sports', 6).slice(4, 6), link: '/sports' },
              { name: 'Entertainment', articles: getArticles('entertainment', 6).slice(4, 6), link: '/entertainment' },
              { name: 'Health', articles: getArticles('health', 6).slice(4, 6), link: '/health' }
            ]}
            sectionClass="categories-section-3"
            gridClass="categories-grid-3"
            columnClass="category-column-3"
          />
        </LazySection>

        {/* World Section 2 */}
        <LazySection>
          <NewsSection
            articles={getArticles('world', 8).slice(4, 8)}
            title="World"
            link="/world"
            sectionClass="world-section-2"
            headerClass="world-header-2"
            cardsClass="world-cards-2"
            cardClass="world-card-2"
            showImages={true}
          />
        </LazySection>

        {/* Politics Section */}
        <LazySection>
          <NewsSection
            articles={getArticles('politics', 4)}
            title="Politics"
            link="/politics"
            sectionClass="crypto-section-4"
            headerClass="crypto-header-4"
            cardsClass="crypto-cards-4"
            cardClass="crypto-card-4"
            showImages={false}
          />
        </LazySection>

        {/* Technology with Sidebar 3 */}
        <LazySection>
          <TechWithSidebar
            featuredArticle={getArticles('technology', 4)[3] || getArticles('technology', 1)[0] || {
              id: 'tech-3',
              title: 'Technology Trends',
              description: 'Explore emerging technology trends and innovations.',
              imageUrl: '/ttttttt.jpg',
              publishedAt: new Date().toISOString(),
              url: '#',
              source: { name: 'Tech Source' },
              category: 'technology'
            }}
            sidebarArticles={getArticles('entertainment', 4)}
            layoutClass="tech-sidebar-layout-3"
            sectionClass="technology-section-3"
            sidebarClass="tech-sidebar-3"
          />
        </LazySection>

        {/* Categories Grid 4 */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Business', articles: getArticles('business', 8).slice(6, 8), link: '/business' },
              { name: 'Sports', articles: getArticles('sports', 8).slice(6, 8), link: '/sports' },
              { name: 'Entertainment', articles: getArticles('entertainment', 8).slice(6, 8), link: '/entertainment' },
              { name: 'Health', articles: getArticles('health', 8).slice(6, 8), link: '/health' }
            ]}
            sectionClass="categories-section-4"
            gridClass="categories-grid-4"
            columnClass="category-column-4"
          />
        </LazySection>

        {/* World Section 3 */}
        <LazySection>
          <NewsSection
            articles={getArticles('world', 10).slice(8, 12) || getArticles('world', 4)}
            title="World"
            link="/world"
            sectionClass="world-section-3"
            headerClass="world-header-3"
            cardsClass="world-cards-3"
            cardClass="world-card-3"
            showImages={true}
          />
        </LazySection>

        {/* Entertainment Section */}
        <LazySection>
          <NewsSection
            articles={getArticles('entertainment', 8).slice(4, 8) || getArticles('entertainment', 4)}
            title="Entertainment"
            link="/entertainment"
            sectionClass="entertainment-section-5"
            headerClass="entertainment-header-5"
            cardsClass="entertainment-cards-5"
            cardClass="entertainment-card-5"
            showImages={false}
          />
        </LazySection>

        {/* Local News Section */}
        <LazySection>
          <NewsSection
            articles={getArticles('local', 4)}
            title="Local"
            link="/local"
            sectionClass="local-section-4"
            headerClass="local-header-4"
            cardsClass="local-cards-4"
            cardClass="local-card-4"
            showImages={true}
          />
        </LazySection>

        {/* Health/Politics/Business/Tech Grid */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Health', articles: getArticles('health', 10).slice(8, 10), link: '/health' },
              { name: 'Politics', articles: getArticles('politics', 6).slice(4, 6), link: '/politics' },
              { name: 'Business', articles: getArticles('business', 10).slice(8, 10), link: '/business' },
              { name: 'Technology', articles: getArticles('technology', 8).slice(6, 8), link: '/technology' }
            ]}
            sectionClass="health-categories-section-5"
            gridClass="health-categories-grid-5"
            columnClass="health-category-column-5"
          />
        </LazySection>

        {/* Final Mixed Categories Grid */}
        <LazySection>
          <CategoryGrid
            categories={[
              { name: 'Health', articles: getArticles('health', 12).slice(10, 12) || getArticles('health', 2), link: '/health' },
              { name: 'Politics', articles: getArticles('politics', 8).slice(6, 8) || getArticles('politics', 2), link: '/politics' },
              { name: 'Business', articles: getArticles('business', 12).slice(10, 12) || getArticles('business', 2), link: '/business' },
              { name: 'Technology', articles: getArticles('technology', 10).slice(8, 10) || getArticles('technology', 2), link: '/technology' }
            ]}
            sectionClass="health-categories-section-6"
            gridClass="health-categories-grid-6"
            columnClass="health-category-column-6"
          />
        </LazySection>

      </div>

      <Footer />
    </div>
  );
}

export default Home;
