import React from 'react';
import { NewsArticle } from '../../types/news';
import { NEWS_IMAGE_PLACEHOLDER } from '../../constants/images';

interface TechWithSidebarProps {
  featuredArticle: NewsArticle;
  sidebarArticles: NewsArticle[];
  layoutClass?: string;
  sectionClass?: string;
  sidebarClass?: string;
  showHeader?: boolean;
}

const TechWithSidebar: React.FC<TechWithSidebarProps> = ({
  featuredArticle,
  sidebarArticles,
  layoutClass = 'tech-sidebar-layout',
  sectionClass = 'technology-section',
  sidebarClass = 'tech-sidebar',
  showHeader = true
}) => {
  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className={layoutClass}>
      {/* Technology Section */}
      <section className={sectionClass}>
        {showHeader && (
          <div className={`${sectionClass}-header`}>
            <h2 className={`${sectionClass}-title`}>
              <a href="/technology" className={`${sectionClass}-link`}>Technology &gt;</a>
            </h2>
          </div>
        )}
        
        <div className={`${sectionClass}-cards`}>
          <article className="featured-article">
            <div className="featured-content">
              <h1 className="featured-headline">
                {featuredArticle.title}
              </h1>
              <p className="featured-description">
                {featuredArticle.description}
              </p>
              <p className="featured-date">
                {formatTimeAgo(featuredArticle.publishedAt)}
              </p>
            </div>
            <div className="featured-image">
              <img 
                src={featuredArticle.imageUrl || NEWS_IMAGE_PLACEHOLDER} 
                alt={featuredArticle.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                }}
              />
            </div>
          </article>
        </div>
      </section>

      {/* Sidebar */}
      <aside className={sidebarClass}>
        {sidebarArticles.slice(0, 4).map((article, index) => (
          <article key={article.id || index} className={`${sidebarClass.replace('tech-sidebar', 'sidebar-news-item')}`}>
            <h3 className={`${sidebarClass.replace('tech-sidebar', 'sidebar-news-title')}`}>
              {article.title}
            </h3>
            <p className={`${sidebarClass.replace('tech-sidebar', 'sidebar-news-time')}`}>
              {formatTimeAgo(article.publishedAt)}
            </p>
          </article>
        ))}
      </aside>
    </div>
  );
};

export default TechWithSidebar;
