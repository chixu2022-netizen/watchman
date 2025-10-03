import { fastNewsService } from './fastNews';

// Test the database and news fetching system
export const testDatabaseSetup = async () => {
  console.log('🧪 Testing Database Setup...');
  
  try {
    // Initialize database
    await fastNewsService.initialize();
    
    // Test fetching news for each category
    const categories = ['politics', 'health', 'sports', 'technology', 'business', 'entertainment'];
    
    for (const category of categories) {
      console.log(`\n📰 Testing ${category} news...`);
      const articles = await fastNewsService.getNewsByCategory(category, 5);
      console.log(`✅ ${category}: ${articles.length} articles loaded`);
      
      // Show first article title
      if (articles.length > 0) {
        console.log(`   📄 Sample: "${articles[0].title}"`);
      }
    }
    
    // Show database stats
    console.log('\n📊 Database Statistics:');
    const stats = await fastNewsService.getStats();
    console.log(stats);
    
    console.log('\n✅ Database setup test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup test failed:', error);
  }
};

// Quick test for a single category
export const testSingleCategory = async (category: string) => {
  console.log(`🧪 Testing ${category} news...`);
  
  try {
    const articles = await fastNewsService.getNewsByCategory(category, 10);
    console.log(`✅ Loaded ${articles.length} ${category} articles`);
    
    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
    });
    
  } catch (error) {
    console.error(`❌ Error testing ${category}:`, error);
  }
};