// Simple test to check if we can fetch news in browser
async function testNewsAPI() {
  try {
    const url = 'https://newsdata.io/api/1/news?apikey=pub_d46b571620df42fe81341ffb2f6c8236&category=politics&size=3&language=en';
    const response = await fetch(url);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('CORS/Network Error:', error);
    return null;
  }
}

// Test it
testNewsAPI();