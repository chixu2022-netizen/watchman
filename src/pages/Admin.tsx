import React, { useState, useEffect } from 'react';
import { supabaseDatabaseService } from '../services/supabaseDatabase';
import { newsFetcherService } from '../services/newsFetcher';
import { NewsArticle } from '../types/news';
i          <button
            onClick={() => fetchRealNews('politics')}
            disabled={loading}
            style={{
              background: '#00c851',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🚀 Fetch REAL Politics News
          </button>

          <button
            onClick={() => fetchCategoryNews('politics')}
            disabled={loading}
            style={{
              background: '#7c4dff',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🏛️ Fetch Mock Politics News
          </button>s';

const Admin: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [testArticles, setTestArticles] = useState<NewsArticle[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  // Test database connection
  const testConnection = async () => {
    setLoading(true);
    addLog('Testing database connection...');
    
    try {
      const connected = await supabaseDatabaseService.testConnection();
      setIsConnected(connected);
      
      if (connected) {
        addLog('✅ Database connection successful!');
        
        // Get stats
        const currentStats = await supabaseDatabaseService.getArticleStats();
        setStats(currentStats);
        addLog(`📊 Database stats: ${JSON.stringify(currentStats)}`);
      } else {
        addLog('❌ Database connection failed');
      }
    } catch (error) {
      addLog(`❌ Connection error: ${error}`);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch fresh news using serverless function (REAL NEWS!)
  const fetchRealNews = async (category: string) => {
    setLoading(true);
    addLog(`🚀 Fetching REAL ${category} news from serverless function...`);
    
    try {
      // Try serverless function first (for deployed version)
      let response;
      try {
        response = await fetch(`/api/fetch-news?category=${category}`);
      } catch (e) {
        // Fallback to mock articles for local development
        addLog(`⚠️ Serverless function not available (local dev), using mock data`);
        const articles = await newsFetcherService.fetchCategoryNews(category);
        
        if (articles.length > 0) {
          await supabaseDatabaseService.insertNewsArticles(articles);
          addLog(`✅ Stored ${articles.length} mock ${category} articles`);
        }
        return;
      }
      
      if (response.ok) {
        const result = await response.json();
        addLog(`✅ ${result.message}`);
        
        // Update stats
        const currentStats = await supabaseDatabaseService.getArticleStats();
        setStats(currentStats);
        
        // Refresh articles display
        const articles = await supabaseDatabaseService.getNewsByCategory(category, 5);
        if (category === 'politics') {
          setTestArticles(articles);
        }
      } else {
        throw new Error(`Serverless function failed: ${response.status}`);
      }
    } catch (error) {
      addLog(`❌ Error fetching real ${category} news: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Fallback: Fetch fresh news for specific category (mock data)
  const fetchCategoryNews = async (category: string) => {
    setLoading(true);
    addLog(`🔄 Fetching fresh ${category} news...`);
    
    try {
      const articles = await newsFetcherService.fetchCategoryNews(category);
      
      if (articles.length > 0) {
        // Store in database
        await supabaseDatabaseService.insertNewsArticles(articles);
        addLog(`✅ Fetched and stored ${articles.length} ${category} articles`);
        
        // Update stats
        const currentStats = await supabaseDatabaseService.getArticleStats();
        setStats(currentStats);
        
        if (category === 'politics') {
          setTestArticles(articles.slice(0, 5));
        }
      } else {
        addLog(`⚠️ No ${category} articles fetched`);
      }
    } catch (error) {
      addLog(`❌ Error fetching ${category}: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchAllNews = async () => {
    setLoading(true);
    addLog('🚀 Fetching ALL news categories...');
    
    try {
      await newsFetcherService.fetchAndStoreAllNews();
      addLog('✅ All categories fetched successfully!');
      
      // Update stats
      const currentStats = await supabaseDatabaseService.getArticleStats();
      setStats(currentStats);
      addLog(`📊 Updated stats: ${JSON.stringify(currentStats)}`);
    } catch (error) {
      addLog(`❌ Error fetching all news: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Test politics page data
  const testPoliticsPage = async () => {
    setLoading(true);
    addLog('🏛️ Testing Politics page data...');
    
    try {
      const articles = await supabaseDatabaseService.getNewsByCategory('politics', 10);
      setTestArticles(articles);
      addLog(`✅ Politics page: ${articles.length} articles loaded`);
      
      if (articles.length > 0) {
        addLog(`📄 First article: "${articles[0].title}"`);
      }
    } catch (error) {
      addLog(`❌ Politics page test failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Clean old articles
  const cleanOldArticles = async () => {
    setLoading(true);
    addLog('🗑️ Cleaning old articles...');
    
    try {
      await supabaseDatabaseService.cleanOldArticles();
      addLog('✅ Old articles cleaned');
      
      // Update stats
      const currentStats = await supabaseDatabaseService.getArticleStats();
      setStats(currentStats);
    } catch (error) {
      addLog(`❌ Error cleaning articles: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addLog('🎯 Admin panel loaded. Test database connection first.');
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1>🛠️ Watchman News - Admin Panel</h1>
          <p>Backend control for your news aggregator</p>
          <div style={{ 
            display: 'inline-block',
            background: isConnected === true ? '#28a745' : isConnected === false ? '#dc3545' : '#6c757d',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '14px',
            marginTop: '10px'
          }}>
            Database: {isConnected === true ? '🟢 Connected' : isConnected === false ? '🔴 Disconnected' : '⚪ Unknown'}
          </div>
        </div>

        {/* Control Panel */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginBottom: '30px'
        }}>
          <button
            onClick={testConnection}
            disabled={loading}
            style={{
              background: '#007bff',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🔌 Test Database Connection
          </button>

          <button
            onClick={() => fetchCategoryNews('politics')}
            disabled={loading}
            style={{
              background: '#28a745',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🏛️ Fetch Politics News
          </button>

          <button
            onClick={fetchAllNews}
            disabled={loading}
            style={{
              background: '#fd7e14',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🚀 Fetch ALL News
          </button>

          <button
            onClick={testPoliticsPage}
            disabled={loading}
            style={{
              background: '#6f42c1',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🧪 Test Politics Page
          </button>

          <button
            onClick={cleanOldArticles}
            disabled={loading}
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🗑️ Clean Old Articles
          </button>
        </div>

        {/* Statistics */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3>📊 Database Statistics</h3>
          {Object.keys(stats).length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {Object.entries(stats).map(([category, count]) => (
                <div key={category} style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  border: '1px solid #dee2e6'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{count}</div>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>{category}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No data yet. Test database connection first.</p>
          )}
        </div>

        {/* Activity Logs */}
        <div style={{
          background: '#000',
          color: '#00ff00',
          padding: '20px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginBottom: '30px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>📋 Activity Logs</h3>
          {logs.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No activity yet...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '5px', fontSize: '13px' }}>
                {log}
              </div>
            ))
          )}
        </div>

        {/* Test Articles Preview */}
        {testArticles.length > 0 && (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3>📰 Test Articles Preview</h3>
            {testArticles.map((article, index) => (
              <div key={article.id} style={{
                padding: '15px',
                borderBottom: index < testArticles.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <img 
                  src={article.imageUrl || '/ttttttt.jpg'} 
                  alt={article.title}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/ttttttt.jpg'; }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', lineHeight: '1.4' }}>{article.title}</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                    {article.source.name} • {new Date(article.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 1000
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
            <div>Processing...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;