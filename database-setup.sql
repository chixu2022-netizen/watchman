-- Create news_articles table for Watchman News Aggregator
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

-- Add indexes for better performance
CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_news_published_at ON news_articles(published_at DESC);
CREATE INDEX idx_news_is_active ON news_articles(is_active);
CREATE INDEX idx_news_category_active ON news_articles(category, is_active);

-- Add RLS (Row Level Security) policies
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for your website)
CREATE POLICY "Allow public read access" ON news_articles
  FOR SELECT USING (true);

-- Allow public insert/update (for your news fetcher)
CREATE POLICY "Allow public insert" ON news_articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON news_articles
  FOR UPDATE USING (true);

-- Test the table
INSERT INTO news_articles (
  id, title, description, image_url, published_at, url, source, category
) VALUES (
  'test-1',
  'Test Article: Database Connection Working',
  'This is a test article to verify database connectivity',
  '/ttttttt.jpg',
  NOW(),
  '#',
  'Test Source',
  'politics'
);

-- Verify the insert worked
SELECT * FROM news_articles WHERE id = 'test-1';