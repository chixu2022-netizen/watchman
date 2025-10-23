import React, { useState } from 'react';
import { optimizedNewsService } from '../services/optimizedNewsService';
import { NewsArticle } from '../types/news';
import { ENV } from '../config/environment';

// Only show in development mode
if (!ENV.enableTestingDashboard) {
  console.log('🔒 Testing Dashboard disabled in production');
}

export const TestingDashboard: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  // Don't render in production (after hooks)
  if (!ENV.enableTestingDashboard) {
    return null;
  }

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Test individual category
  const testCategory = async (category: string) => {
    setCurrentTest(`Testing ${category}...`);
    addResult(`🧪 Testing ${category} category`);
    
    try {
      const startTime = Date.now();
      const articles = await optimizedNewsService.getNewsByCategory(category, 10);
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      addResult(`✅ ${category}: ${articles.length} articles loaded in ${loadTime}ms`);
      
      if (articles.length > 0) {
        addResult(`   📄 Sample: "${articles[0].title}"`);
        addResult(`   📍 Source: ${articles[0].source.name}`);
        addResult(`   🔗 URL: ${articles[0].url}`);
      }
      
      return { category, articles: articles.length, loadTime, success: true };
    } catch (error) {
      addResult(`❌ ${category} failed: ${error}`);
      return { category, articles: 0, loadTime: 0, success: false };
    }
  };

  // Test all categories
  const testAllCategories = async () => {
    setIsRunning(true);
    setCurrentTest('Running comprehensive tests...');
    addResult('🚀 Starting comprehensive news service test');
    
    const categories = ['politics', 'health', 'technology', 'business', 'sports', 'entertainment'];
    const results = [];
    
    for (const category of categories) {
      const result = await testCategory(category);
      results.push(result);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Summary
    addResult('📊 TEST SUMMARY:');
    const successful = results.filter(r => r.success).length;
    addResult(`✅ Successful: ${successful}/${results.length} categories`);
    
    const totalArticles = results.reduce((sum, r) => sum + r.articles, 0);
    addResult(`📰 Total articles loaded: ${totalArticles}`);
    
    const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;
    addResult(`⚡ Average load time: ${Math.round(avgLoadTime)}ms`);
    
    // Cache stats
    const stats = optimizedNewsService.getStats();
    const cacheStats = stats.cache;
    const quotaStatus = stats.quota;
    addResult('💾 Cache Statistics:');
    Object.entries(cacheStats).forEach(([cat, info]: [string, any]) => {
      addResult(`   ${cat}: ${info.articles} articles (${info.age} old)`);
    });
    
    addResult('📊 API Quota Status:');
    addResult(`   Used: ${quotaStatus.used}/${quotaStatus.limit}`);
    addResult(`   Remaining: ${quotaStatus.remaining}`);
    addResult(`   Resets in: ${quotaStatus.resetIn} hours`);
    
    setCurrentTest('Tests completed!');
    setIsRunning(false);
  };

  // Preload all categories
  const preloadAll = async () => {
    setIsRunning(true);
    setCurrentTest('Preloading all categories...');
    addResult('🔄 Starting preload of all categories');
    
    try {
      await optimizedNewsService.preloadCriticalCategories();
      addResult('✅ All categories preloaded successfully!');
      addResult('🚀 Your site will now be super fast!');
      
      const finalStats = optimizedNewsService.getStats();
      addResult('💾 Final cache status:');
      Object.entries(finalStats.cache).forEach(([cat, info]: [string, any]) => {
        addResult(`   ${cat}: ${info.articles} articles ready`);
      });
      
      addResult('📊 API Quota:');
      addResult(`   Remaining: ${finalStats.quota.remaining}/${finalStats.quota.limit}`);
      
    } catch (error) {
      addResult(`❌ Preload failed: ${error}`);
    }
    
    setCurrentTest('Preload completed!');
    setIsRunning(false);
  };

  // Clear cache
  const clearCache = () => {
    optimizedNewsService.clearCache();
    addResult('🗑️ Cache cleared - next requests will fetch fresh data');
  };

  const testAPI = async () => {
    setCurrentTest('Testing NewsData.io API...');
    addResult('📡 Testing direct API connection');
    
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_d46b571620df42fe81341ffb2f6c8236&category=politics&size=1&language=en`);
      
      if (response.ok) {
        const data = await response.json();
        addResult('✅ API connection successful!');
        addResult(`📊 API Status: ${data.status}`);
        addResult(`📰 Sample article: "${data.results?.[0]?.title || 'No title'}"`);
      } else {
        addResult(`❌ API Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      addResult(`❌ API Connection failed: ${error}`);
    }
    
    setCurrentTest('API test completed');
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '400px',
      maxHeight: '80vh',
      background: 'white',
      border: '2px solid #007bff',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      fontSize: '12px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
        🧪 News Service Testing Dashboard
      </h3>
      
      {currentTest && (
        <div style={{ 
          background: '#e3f2fd', 
          padding: '8px', 
          borderRadius: '5px', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {currentTest}
        </div>
      )}
      
      <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          onClick={testAPI}
          disabled={isRunning}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          📡 Test API
        </button>
        
        <button 
          onClick={() => testCategory('politics')}
          disabled={isRunning}
          style={{
            background: '#6f42c1',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          🏛️ Test Politics
        </button>
        
        <button 
          onClick={testAllCategories}
          disabled={isRunning}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          🧪 Test All
        </button>
        
        <button 
          onClick={preloadAll}
          disabled={isRunning}
          style={{
            background: '#fd7e14',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          🚀 Preload All
        </button>
        
        <button 
          onClick={clearCache}
          disabled={isRunning}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          🗑️ Clear Cache
        </button>
        
        <button 
          onClick={clearResults}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Clear Log
        </button>
      </div>
      
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #dee2e6'
      }}>
        {testResults.length === 0 ? (
          <p style={{ margin: 0, color: '#6c757d', fontStyle: 'italic' }}>
            Click a test button to see results here...
          </p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '5px', 
                fontFamily: 'monospace',
                fontSize: '11px',
                lineHeight: '1.3'
              }}
            >
              {result}
            </div>
          ))
        )}
      </div>
    </div>
  );
};