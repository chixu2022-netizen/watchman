import { simpleNewsService } from '../services/simpleNews';

// Add this to any page temporarily to test the news service
export const TestNewsButton = () => {
  const testNews = async () => {
    console.log('🧪 Testing news service...');
    
    try {
      // Test fetching politics news
      const articles = await simpleNewsService.getNewsByCategory('politics', 5);
      console.log('✅ News service test successful!', articles);
      alert(`News service working! Loaded ${articles.length} articles\n\nFirst article: "${articles[0]?.title}"`);
      
      // Show cache stats
      const stats = simpleNewsService.getStats();
      console.log('📊 Cache stats:', stats);
      
    } catch (error) {
      console.error('❌ News service test failed:', error);
      alert('News service test failed - check console');
    }
  };

  const preloadAll = async () => {
    console.log('🚀 Preloading all categories...');
    alert('Preloading all news categories... Check console for progress');
    
    try {
      await simpleNewsService.preloadAllCategories();
      alert('✅ All categories preloaded! Your site will now be super fast!');
    } catch (error) {
      console.error('❌ Preload failed:', error);
      alert('Preload failed - check console');
    }
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <button 
        onClick={testNews}
        style={{
          background: '#28a745',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        🧪 Test News Service
      </button>
      
      <button 
        onClick={preloadAll}
        style={{
          background: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        🚀 Preload All News
      </button>
    </div>
  );
};