# 🚀 Quick Setup: Add Fallback Image

## ✅ DONE:
- All code updated to use `/fallback.png`
- All hardcoded images removed
- Centralized constant created

## ⚠️ TODO (1 minute):

### Step 1: Add the fallback image
```bash
# In your terminal, run ONE of these commands:

# Option A: Use existing logo (recommended if it's square-ish)
cp public/logo192.png public/fallback.png

# Option B: Use larger logo
cp public/logo512.png public/fallback.png

# Option C: Use SVG (if you prefer)
cp public/watchman-logo.svg public/fallback.png
```

### Step 2: Test it
```bash
npm start
```

### Step 3: Verify
- Visit any news page
- All cards should show images OR your logo
- No broken image icons! ✅

---

## That's it! 🎉

Your site now professionally displays your logo whenever:
- Image URLs are missing from database
- Images fail to load
- API doesn't provide images

**Professional. Branded. Simple.**
