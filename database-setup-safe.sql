-- Safe setup script that won't fail if table already exists
-- This will only add missing components

-- Add indexes if they don't exist (these will be ignored if they exist)
CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_active ON news_articles(is_active);
CREATE INDEX IF NOT EXISTS idx_news_category_active ON news_articles(category, is_active);

-- Enable RLS if not already enabled
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow public read access" ON news_articles;
DROP POLICY IF EXISTS "Allow public insert" ON news_articles;
DROP POLICY IF EXISTS "Allow public update" ON news_articles;

-- Create the policies
CREATE POLICY "Allow public read access" ON news_articles
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON news_articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON news_articles
  FOR UPDATE USING (true);

-- Insert test data only if it doesn't exist
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
) ON CONFLICT (id) DO NOTHING;

-- Verify everything is working
SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as total_articles FROM news_articles;
SELECT * FROM news_articles WHERE id = 'test-1';