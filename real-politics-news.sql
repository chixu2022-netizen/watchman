-- Insert real politics news articles for testing
DELETE FROM news_articles WHERE category = 'politics';

INSERT INTO news_articles (
  id, title, description, image_url, published_at, url, source, category
) VALUES 
(
  'politics-1',
  'Senate Passes Major Infrastructure Bill in Bipartisan Vote',
  'The U.S. Senate has approved a comprehensive infrastructure package worth $1.2 trillion, marking a significant legislative achievement with bipartisan support.',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a08b?w=800',
  NOW() - INTERVAL '2 hours',
  'https://example.com/politics-1',
  'Washington Post',
  'politics'
),
(
  'politics-2',
  'Supreme Court to Hear Historic Voting Rights Case',
  'The Supreme Court announced it will review a landmark voting rights case that could reshape election laws across the United States.',
  'https://images.unsplash.com/photo-1586946560795-09c1cc6b7e43?w=800',
  NOW() - INTERVAL '4 hours',
  'https://example.com/politics-2',
  'CNN Politics',
  'politics'
),
(
  'politics-3',
  'President Signs Executive Order on Climate Change',
  'In a major policy shift, the President has signed a comprehensive executive order addressing climate change and clean energy initiatives.',
  'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=800',
  NOW() - INTERVAL '6 hours',
  'https://example.com/politics-3',
  'Reuters',
  'politics'
),
(
  'politics-4',
  'Congressional Budget Office Releases Economic Forecast',
  'The CBO has released its latest economic projections, showing mixed signals for the national economy in the coming fiscal year.',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800',
  NOW() - INTERVAL '8 hours',
  'https://example.com/politics-4',
  'Associated Press',
  'politics'
),
(
  'politics-5',
  'International Trade Agreement Reaches Final Negotiations',
  'Negotiators from multiple countries are putting finishing touches on a major trade agreement that could impact global commerce.',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
  NOW() - INTERVAL '10 hours',
  'https://example.com/politics-5',
  'BBC News',
  'politics'
);