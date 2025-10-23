# 🚀 Watchman - Production Deployment Checklist

## Pre-Deployment Security ✅

- [ ] **Remove all hardcoded API keys** from source code
- [ ] **Verify `.gitignore`** includes `.env` and `vercel.json`
- [ ] **Check git history** for accidentally committed secrets
  ```bash
  git log --all --full-history -- .env
  ```
- [ ] **Rotate exposed keys** if any were committed previously
- [ ] **Review all console.log statements** - remove sensitive data logging

---

## Environment Configuration ✅

### Development Environment
- [ ] `.env` file created locally
- [ ] All required variables set:
  - `REACT_APP_NEWSDATA_API_KEY`
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`
  - `REACT_APP_ENABLE_TESTING_DASHBOARD=true`

### Production Environment
- [ ] Vercel environment variables configured
- [ ] `REACT_APP_ENABLE_TESTING_DASHBOARD=false` in production
- [ ] API keys verified and working
- [ ] Database credentials verified

---

## Database Setup ✅

- [ ] Supabase project created
- [ ] `news_articles` table created
- [ ] Indexes created (category, published_at, is_active)
- [ ] RLS (Row Level Security) enabled
- [ ] Public read/write policies configured
- [ ] Test insert successful
- [ ] Test query successful

---

## Build & Test ✅

### Local Testing
- [ ] `npm install` completes without errors
- [ ] `npm start` runs successfully
- [ ] All pages load without errors
- [ ] Testing dashboard shows in dev mode
- [ ] Images lazy load correctly
- [ ] Cache system works (check console)
- [ ] API quota tracking works

### Production Build
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build size is reasonable (<5MB)
- [ ] Check build output in `build/` folder

---

## Performance Optimization ✅

- [ ] Lazy loading enabled for routes
- [ ] Image lazy loading implemented
- [ ] React Error Boundaries in place
- [ ] Smart caching system active
- [ ] API request deduplication working
- [ ] LocalStorage cache functioning

---

## Vercel Deployment ✅

### Initial Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged in (`vercel login`)
- [ ] Project linked (`vercel link`)

### Configuration
- [ ] `vercel.json` created from template
- [ ] Cron jobs configured (6 categories × different intervals)
- [ ] Environment variables set in Vercel dashboard
- [ ] Build settings correct:
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Install Command: `npm install`

### Deployment
- [ ] Preview deployment successful (`vercel`)
- [ ] Preview URL tested and working
- [ ] All pages accessible
- [ ] No console errors
- [ ] Production deployment successful (`vercel --prod`)
- [ ] Production URL working

---

## Post-Deployment Verification ✅

### Functionality Tests
- [ ] Homepage loads all sections
- [ ] All category pages work
- [ ] Navigation menu functional
- [ ] Search works (if implemented)
- [ ] Articles open in new tab
- [ ] Mobile responsiveness confirmed

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images load progressively
- [ ] No memory leaks (check DevTools)
- [ ] Lighthouse score > 80

### API & Caching Tests
- [ ] API requests tracked correctly
- [ ] Cache working (check Network tab)
- [ ] Database fallback works
- [ ] Quota tracking accurate
- [ ] Stale cache fallback works

### Error Handling Tests
- [ ] Testing dashboard hidden in production
- [ ] Error boundaries catch errors
- [ ] Fallback content shows when API fails
- [ ] Broken images handled gracefully
- [ ] Network errors handled

---

## Monitoring Setup ✅

### Vercel Analytics
- [ ] Vercel Analytics enabled (if available)
- [ ] Check Web Vitals data
- [ ] Monitor page views

### Error Tracking (Optional)
- [ ] Sentry/LogRocket integrated (if desired)
- [ ] Error alerts configured
- [ ] Source maps uploaded

### Database Monitoring
- [ ] Check Supabase dashboard
- [ ] Monitor database size
- [ ] Check query performance
- [ ] Review RLS policy hits

---

## Cron Jobs Verification ✅

- [ ] Cron endpoints accessible:
  - `/api/fetch-news?category=politics`
  - `/api/fetch-news?category=health`
  - `/api/fetch-news?category=technology`
  - `/api/fetch-news?category=business`
  - `/api/fetch-news?category=sports`
  - `/api/fetch-news?category=entertainment`

- [ ] Cron jobs scheduled correctly (check Vercel dashboard)
- [ ] First execution successful
- [ ] Database updating from crons
- [ ] No quota exceeded errors

---

## Documentation ✅

- [ ] README.md updated
- [ ] SETUP_GUIDE.md complete
- [ ] Environment variables documented
- [ ] API limits documented
- [ ] Deployment process documented

---

## Security Final Check ✅

- [ ] No API keys in source code
- [ ] No API keys in git history
- [ ] `.env` not committed
- [ ] `vercel.json` not committed (or sanitized)
- [ ] HTTPS enabled
- [ ] No exposed credentials in console logs
- [ ] Database RLS enabled
- [ ] CORS properly configured

---

## Post-Launch ✅

### Week 1
- [ ] Monitor API quota usage daily
- [ ] Check error rates
- [ ] Review user feedback (if any)
- [ ] Monitor database growth
- [ ] Check cron job execution logs

### Week 2-4
- [ ] Review performance metrics
- [ ] Optimize slow pages
- [ ] Fix reported bugs
- [ ] Consider upgrading API tier if needed

---

## Common Issues & Solutions 🐛

### Issue: API Quota Exceeded Quickly

**Solution:**
- Increase cache TTL to 2-3 hours
- Reduce cron job frequency
- Upgrade to paid API tier

### Issue: Database Growing Too Fast

**Solution:**
- Run cleanup more frequently
- Reduce articles per category
- Archive old articles

### Issue: Slow Page Load

**Solution:**
- Check Network tab for slow requests
- Increase cache usage
- Optimize images
- Enable Vercel Edge Caching

### Issue: Cron Jobs Failing

**Solution:**
- Check Vercel logs
- Verify API key still valid
- Check database connection
- Verify endpoint URLs

---

## Emergency Rollback Plan 🚨

If something goes wrong:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific version
vercel --prod --force
```

---

## Success Metrics 📊

After deployment, your app should:
- ✅ Load in < 3 seconds
- ✅ Handle 100+ concurrent users
- ✅ Stay within API quota (< 200 req/day)
- ✅ 99% uptime
- ✅ Zero security vulnerabilities
- ✅ Mobile responsive (100%)
- ✅ Lighthouse score > 80

---

## Next Steps 🎯

After successful deployment:
1. Set up monitoring alerts
2. Plan feature updates
3. Gather user feedback
4. Optimize based on analytics
5. Consider API tier upgrade if traffic grows

---

**🎉 Congratulations on your deployment!**
