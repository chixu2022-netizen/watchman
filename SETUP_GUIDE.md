# 🚀 Watchman News Aggregator - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Vercel Deployment](#vercel-deployment)
5. [API Quota Management](#api-quota-management)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- NewsData.io API key (free tier: 200 requests/day)
- Vercel account (for deployment)

---

## 🔧 Environment Setup

### Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd watchman
npm install
```

### Step 2: Create Environment File

Copy the template and fill in your values:

```bash
cp .env.template .env
```

Edit `.env` with your credentials:

```env
# NewsData.io API Key (Get from https://newsdata.io/dashboard)
REACT_APP_NEWSDATA_API_KEY=your_newsdata_api_key_here

# Supabase Configuration (Get from https://supabase.com/dashboard)
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Development Features
REACT_APP_ENABLE_TESTING_DASHBOARD=true
REACT_APP_USE_DATABASE_CACHE=true
```

### Step 3: Verify Configuration

Start the development server:

```bash
npm start
```

Check the console for configuration status:
- ✅ Green checkmarks = everything configured correctly
- ⚠️ Yellow warnings = missing optional features
- ❌ Red errors = missing required configuration

---

## 🗄️ Database Configuration

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the setup script from `database-setup.sql`:

```sql
-- Create news_articles table
CREATE TABLE news_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  url TEXT,
  source TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Add indexes
CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_news_published_at ON news_articles(published_at DESC);
CREATE INDEX idx_news_is_active ON news_articles(is_active);
CREATE INDEX idx_news_category_active ON news_articles(category, is_active);

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON news_articles
  FOR SELECT USING (true);

-- Allow public insert/update
CREATE POLICY "Allow public insert" ON news_articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON news_articles
  FOR UPDATE USING (true);
```

4. Verify table creation:

```sql
SELECT * FROM news_articles LIMIT 5;
```

### Option 2: Using the App (Alternative)

The app will automatically create tables on first run if you have the correct permissions.

---

## 🌐 Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Configure Vercel Project

Create `vercel.json` from template:

```bash
cp vercel.json.template vercel.json
```

**IMPORTANT:** DO NOT commit `vercel.json` with secrets!

### Step 4: Set Environment Variables in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

```
REACT_APP_NEWSDATA_API_KEY = your_api_key
REACT_APP_SUPABASE_URL = your_supabase_url
REACT_APP_SUPABASE_ANON_KEY = your_supabase_key
REACT_APP_ENABLE_TESTING_DASHBOARD = false
```

### Step 5: Deploy

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

### Step 6: Configure Cron Jobs

Vercel cron jobs will automatically fetch news every 3-4 hours:

- Politics: Every 3 hours
- Health: Every 3 hours (offset 15min)
- Technology: Every 3 hours (offset 30min)
- Business: Every 3 hours (offset 45min)
- Sports: Every 4 hours
- Entertainment: Every 4 hours (offset 30min)

These are configured in `vercel.json`.

---

## 📊 API Quota Management (Free Tier)

### Understanding the Limits

NewsData.io free tier:
- **200 requests per day**
- **~8 requests per hour** sustainable rate

### Optimization Strategy

The app implements smart caching to stay within limits:

1. **LocalStorage Cache** (1 hour TTL)
   - Instant loading for repeat visits
   - No API calls needed

2. **Supabase Database Cache**
   - Falls back when localStorage expires
   - Updated by Vercel cron jobs

3. **API Requests** (last resort)
   - Only when both caches miss
   - Automatic quota tracking

4. **Fallback Content**
   - Shows when quota exceeded
   - Prevents app from breaking

### Monitoring Quota Usage

The testing dashboard (dev mode only) shows:
- Current quota usage
- Remaining requests
- Time until reset

```typescript
// Check quota status
import { optimizedNewsService } from './services/optimizedNewsService';

const stats = optimizedNewsService.getStats();
console.log(stats.quota);
// {
//   used: 45,
//   limit: 200,
//   remaining: 155,
//   resetIn: 18 // hours
// }
```

---

## 💻 Development Workflow

### Daily Development

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Check for errors
npm run lint
```

### Testing Features

1. **Testing Dashboard** (dev mode only)
   - Visible at top-right when `REACT_APP_ENABLE_TESTING_DASHBOARD=true`
   - Test API connections
   - Check cache status
   - Monitor quota usage

2. **Manual Testing**
   ```bash
   # Test specific category
   # Open browser console and run:
   optimizedNewsService.getNewsByCategory('politics', 10)
   ```

### Best Practices

1. **Always check quota** before extensive testing
2. **Use cached data** during development
3. **Clear cache** only when testing fresh fetches
4. **Don't commit** `.env` or `vercel.json`

---

## 🐛 Troubleshooting

### Issue: "API key missing" error

**Solution:**
```bash
# Check .env file exists
cat .env

# Verify REACT_APP_NEWSDATA_API_KEY is set
# Restart development server
npm start
```

### Issue: Database connection failed

**Solution:**
1. Verify Supabase credentials in `.env`
2. Check if table exists in Supabase dashboard
3. Verify RLS policies are enabled

### Issue: Images not loading

**Cause:** NewsData.io free tier has limited image support

**Solution:**
- Images will fall back to `/ttttttt.jpg`
- This is expected behavior
- Upgrade to paid tier for better image support

### Issue: "Quota exceeded" message

**Solution:**
```typescript
// Check reset time
const stats = optimizedNewsService.getStats();
console.log(`Resets in ${stats.quota.resetIn} hours`);

// Use cache in the meantime
optimizedNewsService.clearCache(); // Force cache refresh
```

### Issue: Testing dashboard not showing

**Solution:**
```bash
# Set environment variable
echo "REACT_APP_ENABLE_TESTING_DASHBOARD=true" >> .env

# Restart server
npm start
```

### Issue: Build errors with TypeScript

**Solution:**
```bash
# Install missing types
npm install --save-dev @types/node @types/react @types/react-dom

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📞 Support

For issues or questions:
1. Check console for error messages
2. Review this guide
3. Check Supabase logs
4. Check Vercel deployment logs

---

## 🎉 Success Checklist

- [ ] `.env` file created with all credentials
- [ ] Development server starts without errors
- [ ] Testing dashboard visible (dev mode)
- [ ] API quota tracking working
- [ ] Database connection successful
- [ ] Cache working (check console logs)
- [ ] Vercel deployment successful
- [ ] Cron jobs configured
- [ ] Production build completes
- [ ] All pages load without errors

---

**Happy Coding! 🚀**
