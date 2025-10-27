/**
 * Clear Cache Script
 * Run this to clear all cached news data with old image URLs
 */

console.log('🧹 Clearing localStorage cache...');

// Clear all localStorage items starting with 'watchman_'
const keysToRemove = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && key.startsWith('watchman_')) {
    keysToRemove.push(key);
  }
}

keysToRemove.forEach(key => localStorage.removeItem(key));

console.log(`✅ Cleared ${keysToRemove.length} cache entries`);
console.log('🔄 Please refresh the page to fetch fresh data');

// Instructions
console.log('\n📋 To run this script:');
console.log('1. Open browser console (F12)');
console.log('2. Paste this entire script');
console.log('3. Press Enter');
console.log('4. Refresh page (Ctrl+R or Cmd+R)');
