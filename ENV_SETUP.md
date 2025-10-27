# Environment Variables Setup

## Add these to your `.env` file:

```bash
# NewsData.io (200 req/day)
REACT_APP_NEWSDATA_API_KEY=your_newsdata_key

# NewsAPI.org (100 req/day)
REACT_APP_NEWSAPI_KEY=3bcc9a67c7f94506a6fcd39fc073ec70

# GNews.io (100 req/day)
REACT_APP_GNEWS_KEY=4b752ed8276bc542e12a118f3673502f

# MediaStack (100 req/day)
REACT_APP_MEDIASTACK_KEY=656ff550946fa226eacd30a716e10c5b

# Supabase
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

# Feature Flags
REACT_APP_ENABLE_TESTING_DASHBOARD=true
REACT_APP_USE_DATABASE_CACHE=true
```

## Total Free Tier Capacity:
- NewsData.io: 200 requests/day
- NewsAPI.org: 100 requests/day
- GNews.io: 100 requests/day
- MediaStack: 100 requests/day
- **TOTAL: 500 requests/day** 🎉

With smart caching, this gives you ~50-100K page views/day!
