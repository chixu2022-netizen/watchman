# 🤖 Cron Job API Usage Analysis

## Current Configuration

### Cron Schedule
**File:** `vercel.json`
```json
{
  "schedule": "*/15 * * * *"
}
```
**Translation:** Runs **every 15 minutes**

---

## API Calls Per Day Calculation

### Runs Per Day
```
24 hours × 4 runs per hour = 96 runs per day
```

### Categories Fetched Per Run
```javascript
const categories = [
  'world',          // 1 API call
  'crypto',         // 1 API call
  'technology',     // 1 API call
  'business',       // 1 API call
  'sports',         // 1 API call
  'entertainment',  // 1 API call
  'health',         // 1 API call
  'politics',       // 1 API call
  'local'           // 1 API call
];
// Total: 9 API calls per run
```

### Articles Per Category
```javascript
fetchNewsData(category, 10) // 10 articles per category
```

---

## **TOTAL API USAGE PER DAY**

### NewsData.io API Calls:
```
96 runs/day × 9 categories = 864 API calls per day ⚠️
```

### Articles Fetched Daily:
```
864 API calls × 10 articles each = 8,640 articles per day
```

---

## ⚠️ **PROBLEM: API LIMIT EXCEEDED!**

### Your Free Tier Limits:
| API Provider | Daily Limit | Your Usage | Status |
|--------------|-------------|------------|--------|
| NewsData.io | **200 calls/day** | **864 calls/day** | ❌ **EXCEEDED by 664!** |
| NewsAPI.org | 100 calls/day | Not used yet | ✅ Available |
| GNews.io | 100 calls/day | Not used yet | ✅ Available |

### Cost Breakdown:
```
NewsData.io Free Tier:    200 calls/day
Your Current Usage:       864 calls/day
Overage:                  664 calls/day (432% over limit!)

⚠️ After 200 calls, your API will be blocked or you'll be charged!
```

---

## 🔴 **URGENT: You Need to Reduce API Calls!**

### Current Problem:
1. **Every 15 minutes** = Too frequent
2. **9 categories each time** = Too many
3. **864 calls/day** = Way over limit
4. **API will stop working** after 200 calls

---

## ✅ **SOLUTION OPTIONS**

### Option 1: Reduce Frequency (RECOMMENDED)
Change from every 15 minutes to every 3-4 hours:

**File:** `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/cron-fetch-news",
      "schedule": "0 */4 * * *"  // Every 4 hours
    }
  ]
}
```

**Result:**
```
6 runs/day × 9 categories = 54 API calls per day ✅
Still under 200 limit!
```

---

### Option 2: Stagger Categories
Rotate which categories fetch each time:

**Schedule:** Every 30 minutes, but only 2-3 categories

```javascript
// Group A (even hours): world, technology, business
// Group B (odd hours): sports, entertainment, health
// Group C (other times): politics, local, crypto
```

**Result:**
```
48 runs/day × 3 categories = 144 API calls per day ✅
```

---

### Option 3: Multi-Provider Rotation
Use different APIs on rotation:

```javascript
// Run 1: NewsData.io for world, tech, business
// Run 2: NewsAPI.org for sports, entertainment
// Run 3: GNews.io for health, politics, local
```

**Total Available:**
```
NewsData.io:  200 calls/day
NewsAPI.org:  100 calls/day
GNews.io:     100 calls/day
MediaStack:   100 calls/day
TOTAL:        500 calls/day combined ✅
```

---

### Option 4: Smart Scheduling by Priority
Different intervals for different categories:

**File:** `api/cron-fetch-news.js`
```javascript
const schedules = {
  high_priority: ['world', 'politics', 'technology'],  // Every 2 hours
  medium_priority: ['business', 'sports'],             // Every 4 hours
  low_priority: ['entertainment', 'health', 'local', 'crypto'] // Every 6 hours
};
```

**Result:**
```
High:   12 runs × 3 categories = 36 calls
Medium: 6 runs × 2 categories  = 12 calls
Low:    4 runs × 4 categories  = 16 calls
TOTAL:                           64 API calls per day ✅
```

---

## 📊 **RECOMMENDED CONFIGURATION**

### Best Balance: Every 4 Hours

**Change `vercel.json` to:**
```json
{
  "crons": [
    {
      "path": "/api/cron-fetch-news",
      "schedule": "0 */4 * * *"
    }
  ]
}
```

### Why This Works:
- ✅ **6 runs per day** (at 12am, 4am, 8am, 12pm, 4pm, 8pm)
- ✅ **9 categories each run**
- ✅ **54 API calls per day**
- ✅ **Well under 200 limit**
- ✅ **Still fresh** (updates every 4 hours)
- ✅ **Saves 146 API calls** for user requests

### API Usage Breakdown:
```
Cron Jobs:        54 calls/day
User Requests:    ~50 calls/day (with caching)
Buffer:           96 calls/day
TOTAL:           ~104 calls/day ✅
```

---

## 🔧 **IMPLEMENTATION**

### Step 1: Update Cron Schedule
```bash
# Edit vercel.json
{
  "crons": [
    {
      "path": "/api/cron-fetch-news",
      "schedule": "0 */4 * * *"  // ← Change this
    }
  ]
}
```

### Step 2: Redeploy
```bash
vercel --prod
```

### Step 3: Monitor Usage
Check logs to verify:
```bash
vercel logs --follow
```

---

## 📈 **Comparison Chart**

| Schedule | Runs/Day | Categories | Total Calls | Status |
|----------|----------|------------|-------------|--------|
| **Every 15 min (CURRENT)** | 96 | 9 | **864** | ❌ **WAY OVER** |
| Every 30 min | 48 | 9 | 432 | ❌ Over limit |
| Every 1 hour | 24 | 9 | 216 | ⚠️ Slightly over |
| Every 2 hours | 12 | 9 | 108 | ✅ Safe |
| **Every 4 hours (RECOMMENDED)** | 6 | 9 | **54** | ✅ **BEST** |
| Every 6 hours | 4 | 9 | 36 | ✅ Very safe |

---

## ⏰ **Cron Schedule Syntax Guide**

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0=Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

### Common Schedules:
```bash
"*/15 * * * *"     # Every 15 minutes (96/day) ← CURRENT
"0 */4 * * *"      # Every 4 hours (6/day) ← RECOMMENDED
"0 0,6,12,18 * * *" # At 12am, 6am, 12pm, 6pm (4/day)
"0 9,17 * * *"     # At 9am and 5pm only (2/day)
```

---

## 🎯 **Action Items**

### Immediate (Critical):
- [ ] Change schedule from `*/15` to `0 */4` 
- [ ] Redeploy to Vercel
- [ ] Monitor API usage

### Short-term (This Week):
- [ ] Implement multi-provider fallback
- [ ] Add API quota monitoring
- [ ] Set up alerts for quota

### Long-term (Optional):
- [ ] Smart scheduling by category priority
- [ ] User-triggered refresh option
- [ ] Upgrade to paid tier if needed

---

## 📊 **Current vs Recommended**

### CURRENT (Every 15 min):
```
❌ 864 API calls per day
❌ 432% over limit
❌ API will block you
❌ Wastes API quota
❌ Too frequent (unnecessary)
```

### RECOMMENDED (Every 4 hours):
```
✅ 54 API calls per day
✅ 73% under limit
✅ Stays within free tier
✅ Saves quota for users
✅ Still fresh enough
```

---

## 🚨 **SUMMARY**

**Your cron job is currently calling the API 864 times per day, which is 432% over your 200 daily limit!**

**FIX:** Change schedule to every 4 hours → Reduces to 54 calls/day ✅

**Would you like me to update the cron schedule now?**
