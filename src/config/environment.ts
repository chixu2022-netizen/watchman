/**
 * Centralized Environment Configuration
 * All environment variables should be accessed through this file
 */

interface EnvironmentConfig {
  // News API Keys
  newsDataApiKey: string;
  newsApiOrgKey: string;
  gNewsApiKey: string;
  mediaStackApiKey: string;
  
  // Database
  supabaseUrl: string;
  supabaseAnonKey: string;
  
  // Feature Flags
  enableTestingDashboard: boolean;
  useDatabaseCache: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

// Validate required environment variables
const validateEnvVar = (key: string, value: string | undefined, required: boolean = false): string => {
  if (!value) {
    if (required) {
      console.error(`❌ REQUIRED environment variable missing: ${key}`);
    }
    return '';
  }
  return value;
};

// Environment configuration object
export const ENV: EnvironmentConfig = {
  // News API Keys (at least one required)
  newsDataApiKey: validateEnvVar(
    'REACT_APP_NEWSDATA_API_KEY',
    process.env.REACT_APP_NEWSDATA_API_KEY,
    true // Required
  ),
  
  newsApiOrgKey: validateEnvVar(
    'REACT_APP_NEWSAPI_KEY',
    process.env.REACT_APP_NEWSAPI_KEY
  ),
  
  gNewsApiKey: validateEnvVar(
    'REACT_APP_GNEWS_KEY',
    process.env.REACT_APP_GNEWS_KEY
  ),
  
  mediaStackApiKey: validateEnvVar(
    'REACT_APP_MEDIASTACK_KEY',
    process.env.REACT_APP_MEDIASTACK_KEY
  ),

  // Supabase Database (required)
  supabaseUrl: validateEnvVar(
    'REACT_APP_SUPABASE_URL',
    process.env.REACT_APP_SUPABASE_URL,
    true
  ),
  
  supabaseAnonKey: validateEnvVar(
    'REACT_APP_SUPABASE_ANON_KEY',
    process.env.REACT_APP_SUPABASE_ANON_KEY,
    true
  ),

  // Feature Flags
  enableTestingDashboard: 
    process.env.REACT_APP_ENABLE_TESTING_DASHBOARD === 'true' ||
    process.env.NODE_ENV === 'development',
  
  useDatabaseCache: 
    process.env.REACT_APP_USE_DATABASE_CACHE !== 'false',

  // Environment Detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// API Configuration
export const API_CONFIG = {
  newsDataBaseUrl: 'https://newsdata.io/api/1',
  requestTimeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

// Cache Configuration
export const CACHE_CONFIG = {
  articleTTL: 3600000, // 1 hour in milliseconds
  maxArticlesPerCategory: 50,
  cleanupInterval: 86400000, // 24 hours
};

// Multi-Provider API limits
export const API_LIMITS = {
  newsData: { dailyLimit: 200, name: 'NewsData.io' },
  newsApiOrg: { dailyLimit: 100, name: 'NewsAPI.org' },
  gNews: { dailyLimit: 100, name: 'GNews.io' },
  mediaStack: { dailyLimit: 100, name: 'MediaStack' },
  totalDaily: 500, // Combined across all providers
  categoriesCount: 11, // All categories
};

// Count available API providers
const availableProviders = [
  ENV.newsDataApiKey && 'NewsData.io',
  ENV.newsApiOrgKey && 'NewsAPI.org',
  ENV.gNewsApiKey && 'GNews.io',
  ENV.mediaStackApiKey && 'MediaStack'
].filter(Boolean);

// Log configuration on startup (only in development)
if (ENV.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    availableProviders: availableProviders.join(', ') || 'NONE',
    providerCount: availableProviders.length,
    estimatedDailyLimit: availableProviders.length * 100 + 100, // rough estimate
    supabaseConfigured: !!(ENV.supabaseUrl && ENV.supabaseAnonKey),
    testingDashboard: ENV.enableTestingDashboard,
    databaseCache: ENV.useDatabaseCache,
    environment: process.env.NODE_ENV,
  });
  
  if (availableProviders.length === 0) {
    console.error('❌ NO API KEYS CONFIGURED! App will use fallback data only.');
  } else if (availableProviders.length === 1) {
    console.warn('⚠️ Only 1 API provider configured. Consider adding more for redundancy.');
  } else {
    console.log(`✅ ${availableProviders.length} API providers configured - good redundancy!`);
  }
}

export default ENV;
