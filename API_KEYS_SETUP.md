# 🔑 API Keys Setup Guide

## Multi-Provider Configuration

To maximize your daily API quota, configure **multiple news API providers**. The app will automatically use all available providers with intelligent fallback.

### 📊 Available Providers & Limits

| Provider | Daily Limit | Signup URL | Priority |
|----------|------------|-----------|----------|
| **NewsData.io** | 200 requests | https://newsdata.io/register | 1 (Primary) |
| **NewsAPI.org** | 100 requests | https://newsapi.org/register | 2 |
| **GNews.io** | 100 requests | https://gnews.io | 3 |
| **MediaStack** | 100 requests | https://mediastack.com/signup/free | 4 |
| **TOTAL** | **500 requests/day** | - | - |

### ⚙️ Environment Variables

Add these to your `.env` file:

```bash
# ===== NEWS API PROVIDERS =====
# At least ONE is required, more is better for redundancy

# NewsData.io (PRIMARY - 200 req/day) - REQUIRED
REACT_APP_NEWSDATA_API_KEY=your_newsdata_api_key_here

# NewsAPI.org (100 req/day) - OPTIONAL
REACT_APP_NEWSAPI_KEY=your_newsapi_key_here

# GNews.io (100 req/day) - OPTIONAL
REACT_APP_GNEWS_KEY=your_gnews_key_here

# MediaStack (100 req/day) - OPTIONAL
REACT_APP_MEDIASTACK_KEY=your_mediastack_key_here

# ===== DATABASE (REQUIRED) =====
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# ===== FEATURE FLAGS =====
REACT_APP_ENABLE_TESTING_DASHBOARD=false
REACT_APP_USE_DATABASE_CACHE=true
```

### 🎯 Strategy

The app uses **intelligent multi-provider fallback**:

1. **NewsData.io** tries first (highest limit)
2. If it fails, tries **NewsAPI.org**
3. If that fails, tries **GNews.io**
4. If that fails, tries **MediaStack**
5. If all fail, uses cached/database data
6. Last resort: static fallback articles

### ✅ Benefits of Multiple Providers

- **500+ requests/day** instead of 200
- **Automatic failover** if one API is down
- **Load distribution** across providers
- **Better uptime** and reliability

### 📝 Quick Setup Steps

#### 1. NewsData.io (Primary - Required)
```bash
1. Go to: https://newsdata.io/register
2. Sign up for free account
3. Get API key from dashboard
4. Add to .env: REACT_APP_NEWSDATA_API_KEY=your_key
```

#### 2. NewsAPI.org (Optional - +100 req/day)
```bash
1. Go to: https://newsapi.org/register
2. Sign up for developer account
3. Get API key
4. Add to .env: REACT_APP_NEWSAPI_KEY=your_key
```

#### 3. GNews.io (Optional - +100 req/day)
```bash
1. Go to: https://gnews.io
2. Click "Get API Key"
3. Sign up for free
4. Add to .env: REACT_APP_GNEWS_KEY=your_key
```

#### 4. MediaStack (Optional - +100 req/day)
```bash
1. Go to: https://mediastack.com/signup/free
2. Create free account
3. Get API key
4. Add to .env: REACT_APP_MEDIASTACK_KEY=your_key
```

### 🔍 Testing Your Setup

After adding API keys, start the dev server:

```bash
npm start
```

Check the console for provider status:
```
🔧 MultiProvider initialized:
   📊 4/4 providers enabled
   📈 Total daily limit: 500 requests
   ✅ Active: NewsData.io, NewsAPI.org, GNews.io, MediaStack
```

Or with only 1 provider:
```
🔧 MultiProvider initialized:
   📊 1/4 providers enabled
   📈 Total daily limit: 200 requests
   ✅ Active: NewsData.io
   ⚠️  Disabled: NewsAPI.org, GNews.io, MediaStack (missing API keys)
```

### 🚨 Troubleshooting

**"No API providers enabled"**
- Make sure at least `REACT_APP_NEWSDATA_API_KEY` is set
- Check `.env` file exists in project root
- Restart dev server after changing `.env`

**"All providers failed"**
- Check API keys are valid
- Verify not over daily quota
- Check internet connection
- App will use cached/database data automatically

### 💡 Recommended Configuration

**Minimum (Works fine)**
```bash
REACT_APP_NEWSDATA_API_KEY=xxx
```
✅ 200 requests/day

**Recommended (Better redundancy)**
```bash
REACT_APP_NEWSDATA_API_KEY=xxx
REACT_APP_NEWSAPI_KEY=xxx
```
✅ 300 requests/day + failover

**Maximum (Best reliability)**
```bash
REACT_APP_NEWSDATA_API_KEY=xxx
REACT_APP_NEWSAPI_KEY=xxx
REACT_APP_GNEWS_KEY=xxx
REACT_APP_MEDIASTACK_KEY=xxx
```
✅ 500 requests/day + full redundancy

### 📈 Usage Tracking

The app automatically tracks API usage and stays within limits using smart caching:

- **LocalStorage cache**: 1 hour TTL
- **Database cache**: Long-term storage
- **Quota tracking**: Prevents overuse
- **Stale-while-revalidate**: Shows cached content while refreshing

With smart caching, you typically use only **10-20 requests/day** even with 500/day available!

---

**Need help?** Check the main README.md or create an issue.
