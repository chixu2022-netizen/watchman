// Archived: NewsCard component (moved from src/components)
import React from 'react';
import './NewsCard.css';

type Story = { id?: number; source: string; title: string; excerpt?: string; time?: string; author?: string };

type Props = { article: Story };

const NewsCard: React.FC<Props> = ({ article }) => {
    const { title, source, excerpt, time, author } = article;

    return (
        <article className="news-card news-card-horizontal">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <img
                    src={'/placeholders/placeholder1.svg'}
                    alt={title || 'news image'}
                    className="news-image"
                    loading="lazy"
                />

                <div className="news-content">
                    <div className="news-source">
                        <div className="source-icon" />
                        <span className="source-name">{source}</span>
                    </div>

                    <h3 className="news-title">{title}</h3>

                    {excerpt && <p className="news-excerpt">{excerpt}</p>}

                    <div className="news-meta">
                        <span className="meta-item">{time}</span>
                        {author && <span className="meta-item">• By {author}</span>}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default NewsCard;
