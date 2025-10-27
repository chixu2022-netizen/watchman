import React, { useState } from 'react';
import { NewsArticle } from '../../types/news';
import { NEWS_IMAGE_PLACEHOLDER } from '../../constants/images';

interface ArticleTableProps {
  articles: NewsArticle[];
  loading?: boolean;
  onDelete?: (articleId: string) => void;
  onRefresh?: () => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ 
  articles, 
  loading = false,
  onDelete,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Get unique categories
  const uniqueCategories = new Set(articles.map(a => a.category));
  const categories = ['all', ...Array.from(uniqueCategories)];

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
          📰 Articles Management
        </h3>
        
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🔄 Refresh
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="🔍 Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Results count */}
      <div style={{
        fontSize: '14px',
        color: '#666',
        marginBottom: '12px'
      }}>
        Showing {filteredArticles.length} of {articles.length} articles
      </div>

      {/* Table */}
      <div style={{ 
        overflowX: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      }}>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px',
            color: '#666'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
            Loading articles...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px',
            color: '#666'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
            No articles found
          </div>
        ) : (
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Image
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Title
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Category
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Source
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Published
                </th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontSize: '13px', fontWeight: 600 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article, index) => (
                <tr 
                  key={article.id}
                  style={{
                    borderBottom: '1px solid #e0e0e0',
                    background: index % 2 === 0 ? 'white' : '#fafafa'
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <img 
                      src={article.imageUrl || NEWS_IMAGE_PLACEHOLDER}
                      alt={article.title}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid #ddd'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = NEWS_IMAGE_PLACEHOLDER;
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px', maxWidth: '300px' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      marginBottom: '4px',
                      lineHeight: '1.4'
                    }}>
                      {article.title}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.description}
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      {article.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>
                    {article.source.name}
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#666', whiteSpace: 'nowrap' }}>
                    {formatDate(article.publishedAt)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        View
                      </a>
                      {onDelete && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${article.title}"?`)) {
                              onDelete(article.id);
                            }
                          }}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ArticleTable;
