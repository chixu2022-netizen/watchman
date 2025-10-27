import React, { useState, useEffect } from 'react';
import StatsCard from '../components/Admin/StatsCard';
import ActivityLogs from '../components/Admin/ActivityLogs';
import ArticleTable from '../components/Admin/ArticleTable';
import AnalyticsDashboard from '../components/Admin/AnalyticsDashboard';
import AdminAuth from '../components/AdminAuth';
import { adminService, AdminStats } from '../services/adminService';
import { NewsArticle } from '../types/news';
import Footer from '../components/Footer';

const AdminNew: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'analytics' | 'system'>('dashboard');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const authToken = sessionStorage.getItem('watchman_admin_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
    
    // Prevent auto-scroll on mount
    window.scrollTo(0, 0);
    
    // Prevent scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Load initial stats (only when authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Load articles when switching to articles tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'articles' && articles.length === 0) {
      loadArticles();
    }
    
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isAuthenticated]);

  // Handle authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('watchman_admin_auth');
    setIsAuthenticated(false);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthentication} />;
  }

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    setArticlesLoading(true);
    try {
      const data = await adminService.getFilteredArticles({ limit: 100 });
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const handleFetchCategory = async (category: string) => {
    setLoading(true);
    try {
      await adminService.fetchCategoryNews(category, 20);
      await loadStats();
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAll = async () => {
    setLoading(true);
    try {
      await adminService.fetchAllCategories();
      await loadStats();
    } catch (error) {
      console.error('Error fetching all:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    if (window.confirm('Clear all caches? This will force fresh API calls.')) {
      adminService.clearAllCaches();
      loadStats();
    }
  };

  const handleCleanOld = async () => {
    if (window.confirm('Clean articles older than 7 days?')) {
      setLoading(true);
      try {
        await adminService.cleanOldArticles(7);
        await loadStats();
      } catch (error) {
        console.error('Error cleaning:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRefreshCategory = async (category: string) => {
    setLoading(true);
    try {
      await adminService.refreshCategory(category);
      await loadStats();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await adminService.deleteArticle(articleId);
      // Reload articles
      await loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const categories = [
    'politics', 'health', 'sports', 'technology',
    'business', 'entertainment', 'world', 'crypto'
  ];

  const quotaPercentage = stats ? adminService.getQuotaPercentage() : 0;
  const cacheHitRate = stats ? adminService.getCacheHitRate() : 0;

  return (
    <div className="home" style={{ overflowX: 'hidden' }}>
      <div className="home__container" style={{ padding: '20px', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '40px 30px',
          borderRadius: '16px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 700 }}>
                🛠️ Watchman Admin Dashboard
              </h1>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
                Complete control center for your news aggregator
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: stats?.databaseConnected ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                border: `2px solid ${stats?.databaseConnected ? '#28a745' : '#dc3545'}`
              }}>
                {stats?.databaseConnected ? '🟢 Database Connected' : '🔴 Database Offline'}
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(220, 53, 69, 0.2)',
                  color: 'white',
                  border: '2px solid #dc3545',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  marginRight: '8px'
                }}
              >
                🔓 Logout
              </button>
              
              <button
                onClick={loadStats}
                disabled={loading}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)'
                }}
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '30px',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '0'
        }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'articles', label: '📰 Articles', icon: '📰' },
            { id: 'analytics', label: '📈 Analytics', icon: '📈' },
            { id: 'system', label: '⚙️ System', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#667eea' : '#666',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 600,
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <StatsCard
                title="Total Articles"
                value={stats?.totalArticles || 0}
                icon="📰"
                color="#667eea"
                subtitle="In database"
                loading={loading}
              />
              
              <StatsCard
                title="API Quota Used"
                value={`${quotaPercentage}%`}
                icon="📊"
                color={quotaPercentage > 80 ? '#dc3545' : quotaPercentage > 50 ? '#ffc107' : '#28a745'}
                subtitle={`${stats?.quotaStatus.remaining || 0} / ${stats?.quotaStatus.limit || 200} remaining`}
                loading={loading}
              />
              
              <StatsCard
                title="Cache Hit Rate"
                value={`${cacheHitRate}%`}
                icon="⚡"
                color="#17a2b8"
                subtitle="Categories cached"
                loading={loading}
              />
              
              <StatsCard
                title="Active Categories"
                value={stats ? Object.keys(stats.articlesByCategory).length : 0}
                icon="📂"
                color="#fd7e14"
                subtitle="With articles"
                loading={loading}
              />
            </div>

            {/* Category Breakdown */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
                📂 Articles by Category
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {stats && Object.entries(stats.articlesByCategory).map(([category, count]) => (
                  <div
                    key={category}
                    style={{
                      background: '#f8f9fa',
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid #e0e0e0',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        color: '#495057'
                      }}>
                        {category}
                      </span>
                      <span style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700
                      }}>
                        {count}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleRefreshCategory(category)}
                      disabled={loading}
                      style={{
                        width: '100%',
                        background: 'white',
                        color: '#667eea',
                        border: '1px solid #667eea',
                        padding: '6px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 600
                      }}
                    >
                      🔄 Refresh
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Logs */}
            <ActivityLogs autoRefresh={true} refreshInterval={2000} />
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <ArticleTable
              articles={articles}
              loading={articlesLoading}
              onDelete={handleDeleteArticle}
              onRefresh={loadArticles}
            />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard stats={stats} />
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div>
            {/* Quick Actions */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
                ⚡ Quick Actions
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                <button
                  onClick={handleFetchAll}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  🚀 Fetch All Categories
                </button>

                <button
                  onClick={handleClearCache}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)'
                  }}
                >
                  🗑️ Clear All Caches
                </button>

                <button
                  onClick={handleCleanOld}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(250, 112, 154, 0.3)'
                  }}
                >
                  🧹 Clean Old Articles
                </button>

                <button
                  onClick={loadStats}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    color: '#333',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(168, 237, 234, 0.3)'
                  }}
                >
                  🔄 Refresh Dashboard
                </button>
              </div>
            </div>

            {/* Fetch by Category */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
                📡 Fetch News by Category
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px'
              }}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleFetchCategory(category)}
                    disabled={loading}
                    style={{
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#667eea';
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Cache Status */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
                💾 Cache Status
              </h3>
              
              {stats && Object.keys(stats.cacheStats).length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  {Object.entries(stats.cacheStats).map(([category, info]) => (
                    <div
                      key={category}
                      style={{
                        background: '#f8f9fa',
                        padding: '14px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        marginBottom: '6px',
                        color: '#495057'
                      }}>
                        {category}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {info.articles} articles • Age: {info.age}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  No cache data available
                </div>
              )}
            </div>

            {/* Activity Logs */}
            <ActivityLogs autoRefresh={true} refreshInterval={2000} />
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                animation: 'spin 2s linear infinite'
              }}>
                ⏳
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#333'
              }}>
                Processing...
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Add spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default AdminNew;
