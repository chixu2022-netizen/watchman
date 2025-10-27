-- Additional indexes for better performance
-- Run these in your Supabase SQL Editor

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

-- Verify indexes
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'news_articles';
