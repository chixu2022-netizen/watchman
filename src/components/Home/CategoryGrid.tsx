import React from 'react';
import { NewsArticle } from '../../types/news';

interface CategoryGridProps {
  categories: {
    name: string;
    articles: NewsArticle[];
    link: string;
  }[];
  sectionClass?: string;
  gridClass?: string;
  columnClass?: string;
  loading?: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  sectionClass = 'categories-section',
  gridClass = 'categories-grid',
  columnClass = 'category-column',
  loading = false
}) => {
  const formatTimeAgo = (dateString: string): string => {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <section className={sectionClass}>
      <div className={gridClass}>
        {categories.map((category, catIndex) => (
          <div key={catIndex} className={columnClass}>
            <h2 className={`${columnClass.replace('-column', '-header')}`}>
              <a href={category.link} className={`${columnClass.replace('-column', '-link')}`}>
                {category.name}
              </a>
              <span className="arrow-symbol">›</span>
            </h2>
            
            {loading ? (
              <div className="loading-placeholder">
                Loading {category.name.toLowerCase()} news...
              </div>
            ) : category.articles.length > 0 ? (
              category.articles.slice(0, 2).map((article, index) => (
                <article 
                  key={article.id || index} 
                  className={`${columnClass.replace('-column', '-card')} ${index === 0 ? 'featured' : ''}`}
                >
                  {index === 0 && (
                    <div className={`${columnClass.replace('-column', '-card')}-image`}>
                      <img 
                        src={article.imageUrl || '/ttttttt.jpg'} 
                        alt={article.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/ttttttt.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className={`${columnClass.replace('-column', '-card')}-content`}>
                    <h3 className={`${columnClass.replace('-column', '-card')}-title`}>
                      {article.title}
                    </h3>
                    <p className={`${columnClass.replace('-column', '-card')}-time`}>
                      {formatTimeAgo(article.publishedAt)}
                    </p>
                  </div>
                </article>
              ))
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
