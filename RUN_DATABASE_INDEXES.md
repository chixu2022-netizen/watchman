# Run Database Indexes

## Step 1: Open Supabase Dashboard

1. Go to https://supabase.com
2. Select your project
3. Click "SQL Editor" in left sidebar

## Step 2: Run Index Commands

Copy and paste this SQL and click "Run":

```sql
-- Compound index for common queries (category + published date)
CREATE INDEX IF NOT EXISTS idx_news_category_published 
ON news_articles(category, published_at DESC);

-- Index for source filtering
CREATE INDEX IF NOT EXISTS idx_news_source 
ON news_articles(source);

-- Full-text search index (for Phase 4)
CREATE INDEX IF NOT EXISTS idx_news_fulltext 
ON news_articles USING GIN (
  to_tsvector('english', title || ' ' || description)
);
```

## Step 3: Verify Indexes

Run this to see all indexes:

```sql
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'news_articles'
ORDER BY indexname;
```

You should see:
- ✅ idx_news_category
- ✅ idx_news_category_published (NEW)
- ✅ idx_news_fulltext (NEW)
- ✅ idx_news_is_active
- ✅ idx_news_published_at
- ✅ idx_news_source (NEW)

## Done! 🎉

Your database is now optimized for:
- Fast category queries
- Fast date sorting
- Future search functionality
- Better performance at scale
