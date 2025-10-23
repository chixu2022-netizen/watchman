/**
 * Centralized Environment Configuration
 * All environment variables should be accessed through this file
 */

interface EnvironmentConfig {
  newsDataApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  enableTestingDashboard: boolean;
  useDatabaseCache: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

// Validate required environment variables
const validateEnvVar = (key: string, value: string | undefined): string => {
  if (!value) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
    return '';
  }
  return value;
};

// Environment configuration object
export const ENV: EnvironmentConfig = {
  // NewsData.io API
  newsDataApiKey: validateEnvVar(
    'REACT_APP_NEWSDATA_API_KEY',
    process.env.REACT_APP_NEWSDATA_API_KEY
  ),

  // Supabase Database
  supabaseUrl: validateEnvVar(
    'REACT_APP_SUPABASE_URL',
    process.env.REACT_APP_SUPABASE_URL
  ),
  
  supabaseAnonKey: validateEnvVar(
    'REACT_APP_SUPABASE_ANON_KEY',
    process.env.REACT_APP_SUPABASE_ANON_KEY
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

// Free tier API limits (200 requests/day = ~8 per hour)
export const API_LIMITS = {
  dailyLimit: 200,
  requestsPerHour: 8,
  categoriesCount: 6, // politics, health, sports, tech, business, entertainment
};

// Log configuration on startup (only in development)
if (ENV.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    newsDataApiKeySet: !!ENV.newsDataApiKey,
    supabaseUrlSet: !!ENV.supabaseUrl,
    supabaseKeySet: !!ENV.supabaseAnonKey,
    testingDashboard: ENV.enableTestingDashboard,
    databaseCache: ENV.useDatabaseCache,
    environment: process.env.NODE_ENV,
  });
}

export default ENV;
