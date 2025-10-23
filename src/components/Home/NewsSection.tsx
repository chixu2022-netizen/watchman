import React from 'react';
import { NewsArticle } from '../../types/news';

interface NewsSectionProps {
  articles: NewsArticle[];
  title?: string;
  link?: string;
  sectionClass?: string;
  headerClass?: string;
  cardsClass?: string;
  cardClass?: string;
  showImages?: boolean;
  loading?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  title,
  link,
  sectionClass = 'world-section',
  headerClass = 'world-header',
  cardsClass = 'world-cards',
  cardClass = 'world-card',
  showImages = true,
  loading = false
}) => {
  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <section className={sectionClass}>
        {title && (
          <div className={headerClass}>
            <h2 className={`${headerClass.replace('-header', '-title')}`}>
              {link ? <a href={link} className={`${headerClass.replace('-header', '-link')}`}>{title} &gt;</a> : title}
            </h2>
          </div>
        )}
        <div className={cardsClass}>
          <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
            Loading latest news...
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className={sectionClass}>
      {title && (
        <div className={headerClass}>
          <h2 className={`${headerClass.replace('-header', '-title')}`}>
            {link ? <a href={link} className={`${headerClass.replace('-header', '-link')}`}>{title} &gt;</a> : title}
          </h2>
        </div>
      )}
      
      <div className={cardsClass}>
        {articles.map((article, index) => (
          <article key={article.id || index} className={cardClass}>
            {showImages && (
              <div className={`${cardClass}-image`}>
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
            <div className={`${cardClass}-content`}>
              <h3 className={`${cardClass}-title`}>{article.title}</h3>
              <p className={`${cardClass}-time`}>
                {formatTimeAgo(article.publishedAt)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
