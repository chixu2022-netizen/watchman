# 🚀 Watchman Deployment Guide

## Prerequisites

- Node.js 18+
- Vercel account (free tier works)
- NewsData.io API key ([Get one here](https://newsdata.io/))
- Supabase account ([Sign up](https://supabase.com/))

---

## Environment Variables

You'll need these environment variables for deployment:

```env
REACT_APP_NEWSDATA_API_KEY=your_newsdata_api_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_ENABLE_TESTING_DASHBOARD=false  # true for development
REACT_APP_USE_DATABASE_CACHE=true
```

---

## Local Development

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd watchman
npm install
```

### 2. Setup Environment

Create `.env` file in root:

```bash
cp .env.template .env
# Edit .env with your credentials
```

### 3. Setup Database

1. Go to your Supabase project
2. Open SQL Editor
3. Run the contents of `database-setup.sql`
4. Verify table creation:
   ```sql
   SELECT * FROM news_articles LIMIT 1;
   ```

### 4. Run Development Server

```bash
npm start
```

Visit `http://localhost:3000`

### 5. Test Build

```bash
npm run build
```

Should complete without errors.

---

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure project:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Click "Deploy"

---

## Configure Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development**:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `REACT_APP_NEWSDATA_API_KEY` | Your API key | From newsdata.io |
| `REACT_APP_SUPABASE_URL` | Your project URL | From Supabase dashboard |
| `REACT_APP_SUPABASE_ANON_KEY` | Your anon key | From Supabase dashboard |
| `REACT_APP_ENABLE_TESTING_DASHBOARD` | `false` | Set to `true` only for development |
| `REACT_APP_USE_DATABASE_CACHE` | `true` | Enable database caching |

4. After adding variables, redeploy:
   ```bash
   vercel --prod
   ```

---

## Optional: Configure Cron Jobs

To automatically fetch news every few hours, set up Vercel Cron Jobs:

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Cron Jobs**
3. Add these jobs:

| Endpoint | Schedule | Description |
|----------|----------|-------------|
| `/api/fetch-news?category=politics` | `0 */3 * * *` | Every 3 hours |
| `/api/fetch-news?category=technology` | `30 */3 * * *` | Every 3 hours (offset) |
| `/api/fetch-news?category=health` | `0 */4 * * *` | Every 4 hours |
| `/api/fetch-news?category=business` | `30 */4 * * *` | Every 4 hours (offset) |

**Note**: Stagger schedules to avoid hitting API rate limits.

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at production URL
- [ ] All 11 category pages work:
  - [ ] Home
  - [ ] Politics
  - [ ] Health
  - [ ] Sports
  - [ ] Technology
  - [ ] AI
  - [ ] Business
  - [ ] Entertainment
  - [ ] World
  - [ ] Local
  - [ ] Crypto
- [ ] Images load correctly
- [ ] No console errors (press F12)
- [ ] Testing Dashboard is hidden (should not see it in production)
- [ ] Articles open in new tabs when clicked
- [ ] Mobile responsive design works

---

## Monitoring

### Check API Quota Usage

Monitor your API usage to stay within free tier (200 req/day):

```javascript
// In browser console on your live site:
// This data is visible in the Testing Dashboard (dev mode only)
```

Expected usage with smart caching: **10-20 requests/day**

### Check Logs

```bash
# View deployment logs
vercel logs

# Filter for errors
vercel logs --follow
```

### Database Health

In Supabase dashboard:
1. Go to **Table Editor**
2. Check `news_articles` table has data
3. Run analytics:
   ```sql
   SELECT 
     category, 
     COUNT(*) as article_count,
     MAX(created_at) as last_updated
   FROM news_articles 
   WHERE is_active = true
   GROUP BY category;
   ```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json build
npm install
npm run build
```

### Environment Variables Not Working

1. Verify variables are set in Vercel Dashboard
2. Check variable names start with `REACT_APP_`
3. Redeploy after adding variables:
   ```bash
   vercel --prod
   ```

### API Quota Exceeded

1. Check your newsdata.io dashboard
2. Verify caching is working (check console logs)
3. Consider upgrading API tier

### Database Connection Issues

1. Verify Supabase project is active
2. Check credentials in environment variables
3. Ensure RLS (Row Level Security) policies are set correctly
4. Test connection in Supabase SQL Editor

---

## Performance Tips

1. **Enable Caching**: Always set `REACT_APP_USE_DATABASE_CACHE=true`
2. **Monitor Quota**: Check API usage daily for first week
3. **Optimize Images**: Consider using a CDN for images
4. **Database Cleanup**: Old articles auto-cleanup after 30 days

---

## Rollback

If something goes wrong:

```bash
# View deployment history
vercel ls

# Rollback to previous deployment
vercel rollback
```

---

## Support

- **Documentation**: Check `README.md` for project overview
- **Setup Guide**: See `SETUP_GUIDE.md` for detailed setup
- **Archived Docs**: See `docs/archive/` for historical documentation

---

## Success! 🎉

Your Watchman news aggregator is now live! Share your deployment URL and start aggregating news!

**Production URL**: `https://your-project.vercel.app`
