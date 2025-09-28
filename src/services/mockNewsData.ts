import { NewsArticle, HomepageNewsData, CategoryPageData } from '../types/news';

// Mock data with realistic news images from various sources
const generateMockArticle = (
  title: string, 
  description: string, 
  imageUrl: string, 
  category: string, 
  hoursAgo: number = 1,
  isTopStory: boolean = false,
  author?: string
): NewsArticle => ({
  id: Math.random().toString(36).substr(2, 9),
  title,
  description,
  url: '#',
  imageUrl,
  publishedAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
  source: { name: 'Mock News Source' },
  category,
  isTopStory,
  isNew: hoursAgo <= 2, // Mark as NEW if published within last 2 hours
  author: author || `${category.charAt(0).toUpperCase() + category.slice(1)} Reporter`
});

// Mock news data with real image URLs from Unsplash and other sources
export const getMockHomepageNews = (): HomepageNewsData => {
  const worldNews: NewsArticle[] = [
    generateMockArticle(
      "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
      "World leaders unite on ambitious climate targets for 2030",
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
      "world",
      2,
      true // TOP STORY
    ),
    generateMockArticle(
      "International Trade Relations Show Signs of Recovery",
      "Economic indicators suggest improving global cooperation",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
      "world",
      4
    ),
    generateMockArticle(
      "Breakthrough in Renewable Energy Technology Announced",
      "Scientists develop more efficient solar panel technology",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
      "world",
      6
    ),
    generateMockArticle(
      "Global Health Initiative Launches in Developing Nations",
      "New medical programs aim to improve healthcare access worldwide",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      "world",
      8
    ),
    generateMockArticle(
      "International Space Station Mission Marks New Milestone",
      "Astronauts complete groundbreaking research experiments",
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop",
      "world",
      12
    )
  ];

  const cryptoNews: NewsArticle[] = [
    generateMockArticle(
      "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
      "Major corporations continue to add cryptocurrency to their portfolios",
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop",
      "crypto",
      1,
      true // TOP STORY
    ),
    generateMockArticle(
      "Ethereum 2.0 Upgrade Shows Promising Results",
      "Network efficiency improvements exceed expectations",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      "crypto",
      3
    ),
    generateMockArticle(
      "Central Bank Digital Currencies Gain Global Momentum",
      "Multiple countries announce CBDC pilot programs",
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=400&fit=crop",
      "crypto",
      5
    ),
    generateMockArticle(
      "DeFi Protocols Report Record Trading Volumes",
      "Decentralized finance continues rapid growth trajectory",
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=800&h=400&fit=crop",
      "crypto",
      7
    )
  ];

  const technologyNews: NewsArticle[] = [
    generateMockArticle(
      "AI Breakthrough: New Language Model Surpasses Human Performance",
      "Advanced artificial intelligence shows remarkable problem-solving abilities",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      "technology",
      1,
      true // TOP STORY
    ),
    generateMockArticle(
      "Quantum Computing Makes Major Leap Forward",
      "IBM announces new quantum processor with enhanced capabilities",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      "technology",
      3
    ),
    generateMockArticle(
      "5G Network Expansion Accelerates Globally",
      "Telecommunications companies roll out next-generation infrastructure",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop",
      "technology",
      5
    ),
    generateMockArticle(
      "Virtual Reality Technology Transforms Education",
      "Schools adopt immersive learning experiences",
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=400&fit=crop",
      "technology",
      7
    ),
    generateMockArticle(
      "Autonomous Vehicles Pass Major Safety Milestone",
      "Self-driving cars show significant improvement in accident prevention",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=400&fit=crop",
      "technology",
      9
    )
  ];

  const businessNews: NewsArticle[] = [
    generateMockArticle(
      "Tech Giants Report Record Quarterly Earnings",
      "Major technology companies exceed analyst expectations",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
      "business",
      2,
      true // TOP STORY
    ),
    generateMockArticle(
      "Startup Funding Reaches New Heights in Q3",
      "Venture capital investments show strong growth trajectory",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      "business",
      4
    ),
    generateMockArticle(
      "Supply Chain Innovation Reduces Global Shipping Costs",
      "New logistics technologies improve efficiency and sustainability",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
      "business",
      6
    ),
    generateMockArticle(
      "E-commerce Platform Launches Revolutionary Shopping Experience",
      "AI-powered recommendations drive increased customer satisfaction",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      "business",
      8
    ),
    generateMockArticle(
      "Green Energy Investments Attract Institutional Capital",
      "Renewable energy projects see unprecedented funding levels",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
      "business",
      10
    )
  ];

  const sportsNews: NewsArticle[] = [
    generateMockArticle(
      "Championship Finals Set Record-Breaking Viewership Numbers",
      "Sports fans worldwide tune in for historic matchup",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
      "sports",
      1,
      true // TOP STORY
    ),
    generateMockArticle(
      "Olympic Training Facilities Embrace Advanced Technology",
      "Athletes benefit from cutting-edge performance analytics",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      "sports",
      3
    ),
    generateMockArticle(
      "Professional League Announces Expansion Plans",
      "New teams to join major sports competition next season",
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=400&fit=crop",
      "sports",
      5
    ),
    generateMockArticle(
      "Sports Medicine Breakthrough Reduces Injury Recovery Time",
      "Revolutionary treatment helps athletes return to competition faster",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      "sports",
      7
    ),
    generateMockArticle(
      "Youth Sports Programs See Unprecedented Participation Growth",
      "Community initiatives inspire next generation of athletes",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&h=400&fit=crop",
      "sports",
      9
    )
  ];

  const entertainmentNews: NewsArticle[] = [
    generateMockArticle(
      "Blockbuster Film Breaks Opening Weekend Box Office Records",
      "Hollywood production exceeds all expectations with global audience",
      "https://images.unsplash.com/photo-1489599735188-3fd70739b24b?w=800&h=400&fit=crop",
      "entertainment",
      2,
      true // TOP STORY
    ),
    generateMockArticle(
      "Streaming Platform Announces Major Original Content Expansion",
      "New series and films to debut exclusively on popular service",
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=400&fit=crop",
      "entertainment",
      4
    ),
    generateMockArticle(
      "Music Festival Returns with Stellar Lineup",
      "Top artists confirmed for highly anticipated annual event",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      "entertainment",
      6
    ),
    generateMockArticle(
      "Gaming Industry Reports Record Revenue Growth",
      "Video game sales continue upward trend across all platforms",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
      "entertainment",
      8
    ),
    generateMockArticle(
      "Celebrity Chef Opens Revolutionary Restaurant Concept",
      "Innovative dining experience combines technology with culinary arts",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
      "entertainment",
      10
    )
  ];

  const healthNews: NewsArticle[] = [
    generateMockArticle(
      "Medical Breakthrough: New Cancer Treatment Shows Promising Results",
      "Clinical trials demonstrate significant improvement in patient outcomes",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      "health",
      2
    ),
    generateMockArticle(
      "Mental Health Apps Report Increased Usage Amid Wellness Focus",
      "Digital therapy platforms help millions manage stress and anxiety",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      "health",
      4
    ),
    generateMockArticle(
      "Nutrition Study Reveals Benefits of Mediterranean Diet",
      "Long-term research confirms positive health impacts",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop",
      "health",
      6
    ),
    generateMockArticle(
      "Telemedicine Services Expand Access to Rural Communities",
      "Remote healthcare delivery improves medical care availability",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      "health",
      8
    )
  ];

  console.log('🎭 Mock data generated with realistic images and content');
  console.log('📊 Data counts:', {
    world: worldNews.length,
    crypto: cryptoNews.length,
    technology: technologyNews.length,
    business: businessNews.length,
    sports: sportsNews.length,
    entertainment: entertainmentNews.length,
    health: healthNews.length
  });

  return {
    worldNews,
    categoryNews: cryptoNews,
    categories: {
      technology: technologyNews,
      business: businessNews,
      sports: sportsNews,
      entertainment: entertainmentNews,
      health: healthNews
    }
  };
};

// Get TOP STORIES for homepage - pulls the most important articles from each category
export const getTopStoriesForHomepage = (): HomepageNewsData => {
  const allData = getMockHomepageNews();
  
  // Filter only top stories from each category + some regular articles for variety
  const topWorldNews = [
    ...allData.worldNews.filter(article => article.isTopStory), // Get top stories first
    ...allData.worldNews.filter(article => !article.isTopStory).slice(0, 2) // Add 2 regular articles
  ];
  
  const topCryptoNews = [
    ...allData.categoryNews.filter(article => article.isTopStory), // Get top stories first
    ...allData.categoryNews.filter(article => !article.isTopStory).slice(0, 2) // Add 2 regular articles
  ];
  
  const topCategories = {
    technology: [
      ...allData.categories.technology.filter(article => article.isTopStory),
      ...allData.categories.technology.filter(article => !article.isTopStory).slice(0, 3)
    ],
    business: [
      ...allData.categories.business.filter(article => article.isTopStory),
      ...allData.categories.business.filter(article => !article.isTopStory).slice(0, 3)
    ],
    sports: [
      ...allData.categories.sports.filter(article => article.isTopStory),
      ...allData.categories.sports.filter(article => !article.isTopStory).slice(0, 3)
    ],
    entertainment: [
      ...allData.categories.entertainment.filter(article => article.isTopStory),
      ...allData.categories.entertainment.filter(article => !article.isTopStory).slice(0, 3)
    ],
    health: [
      ...allData.categories.health.filter(article => article.isTopStory),
      ...allData.categories.health.filter(article => !article.isTopStory).slice(0, 3)
    ]
  };

  console.log('🏆 Top Stories curated for homepage - featuring the most important news from each section');
  
  return {
    worldNews: topWorldNews,
    categoryNews: topCryptoNews,
    categories: topCategories
  };
};

// Get category-specific news for category pages
const getCategoryPageNews = (category: string): CategoryPageData => {
  const mockData = getMockHomepageNews();
  
  // Get world news for the world section - generate more for duplicated sections
  const worldNews = [...mockData.worldNews, ...mockData.worldNews.map(article => ({
    ...article,
    id: article.id + '-extra',
    title: article.title.replace('Global', 'International').replace('World', 'Worldwide'),
  }))].slice(0, 20); // Provide 20 world news articles
  
  // Get category-specific news based on the category
  let categoryUpdates: NewsArticle[];
  switch(category) {
    case 'crypto':
      categoryUpdates = mockData.categoryNews;
      break;
    case 'technology':
      categoryUpdates = mockData.categories.technology;
      break;
    case 'business':
      categoryUpdates = mockData.categories.business;
      break;
    case 'sports':
      categoryUpdates = mockData.categories.sports;
      break;
    case 'entertainment':
      categoryUpdates = mockData.categories.entertainment;
      break;
    case 'health':
      categoryUpdates = mockData.categories.health;
      break;
    default:
      categoryUpdates = mockData.worldNews;
  }

  // Create diverse subcategories with unique content for each subcategory
  const subCategories: { [key: string]: NewsArticle[] } = {};
  const subCategoryNames = getSubCategoryNames(category);
  
  subCategoryNames.forEach((subCat, index) => {
    // Generate more articles for each subcategory to support duplicated sections
    const baseArticles = generateSubCategoryArticles(subCat, category, index);
    const extraArticles = generateSubCategoryArticles(subCat, category, index + 10);
    subCategories[subCat] = [...baseArticles, ...extraArticles]; // 4+ articles per subcategory
  });

  // Create pagination info - simulate having more articles available
  const pagination = {
    worldNews: { hasMore: true, nextPage: 2 },
    categoryUpdates: { hasMore: true, nextPage: 2 },
    subCategories: {} as { [key: string]: { hasMore: boolean; nextPage: number } }
  };

  subCategoryNames.forEach(subCat => {
    pagination.subCategories[subCat] = { hasMore: true, nextPage: 2 };
  });

  // Generate more category updates for duplicated sections
  const extendedCategoryUpdates = [...categoryUpdates, ...categoryUpdates.map(article => ({
    ...article,
    id: article.id + '-extended',
    title: article.title.replace('Breaking', 'Latest').replace('Major', 'Significant'),
  }))].slice(0, 20); // Provide 20 category update articles

  return {
    worldNews,
    categoryUpdates: extendedCategoryUpdates,
    subCategories,
    pagination
  };
};

// Get subcategory names for each category
const getSubCategoryNames = (category: string): string[] => {
  const subCategoryMap: { [key: string]: string[] } = {
    crypto: ['Bitcoin', 'Ethereum', 'DeFi', 'NFTs'],
    sports: ['Football', 'Basketball', 'Soccer', 'Baseball'],
    technology: ['AI', 'Software', 'Hardware', 'Startups'],
    ai: ['Machine Learning', 'Deep Learning', 'Robotics', 'Neural Networks'],
    business: ['Markets', 'Startups', 'Finance', 'Economy'],
    entertainment: ['Movies', 'Music', 'Gaming', 'TV Shows'],
    health: ['Medical', 'Fitness', 'Mental Health', 'Nutrition'],
    science: ['Research', 'Space', 'Environment', 'Innovation']
  };
  return subCategoryMap[category] || ['News', 'Updates', 'Analysis', 'Trends'];
};

// Generate unique articles for each subcategory
const generateSubCategoryArticles = (subCategory: string, parentCategory: string, index: number): NewsArticle[] => {
  const subcategoryTitles: { [key: string]: string[] } = {
    // Crypto subcategories
    'Bitcoin': [
      'Bitcoin Price Surges to New All-Time High Amid Institutional Adoption',
      'Major Bitcoin Mining Operation Announces Carbon Neutral Initiative'
    ],
    'Ethereum': [
      'Ethereum 2.0 Staking Rewards Reach Record Levels',
      'New Ethereum DApps Drive Network Activity to New Heights'
    ],
    'DeFi': [
      'DeFi Protocol Launches Revolutionary Yield Farming Strategy', 
      'Cross-Chain DeFi Solutions See Massive User Growth'
    ],
    'NFTs': [
      'Blue-Chip NFT Collection Fetches Record-Breaking Sale Price',
      'Gaming NFTs Transform Digital Asset Ownership Landscape'
    ],
    
    // Sports subcategories
    'Football': [
      'NFL Trade Deadline Shakes Up Championship Predictions',
      'Star Quarterback Signs Record-Breaking Contract Extension'
    ],
    'Basketball': [
      'NBA Rookie Breaks Multiple Records in Spectacular Debut',
      'Championship Favorites Emerge After Midseason Trade Activity'
    ],
    'Soccer': [
      'World Cup Qualifiers Produce Stunning Upset Results',
      'Premier League Title Race Intensifies with Surprise Leader'
    ],
    'Baseball': [
      'Free Agency Frenzy Reshapes League Championship Landscape',
      'Young Pitcher Throws Perfect Game in Playoff Debut'
    ],
    
    // Technology subcategories  
    'AI': [
      'Breakthrough AI Model Achieves Human-Level Performance',
      'Major Tech Giants Announce New AI Safety Initiative'
    ],
    'Software': [
      'Open Source Project Revolutionizes Development Workflow',
      'New Programming Language Gains Massive Developer Adoption'
    ],
    'Hardware': [
      'Next-Gen Processor Delivers 50% Performance Improvement',
      'Revolutionary Battery Technology Extends Device Life 10x'
    ],
    'Startups': [
      'Unicorn Startup Raises $500M in Record-Breaking Funding Round',
      'Innovative Fintech Startup Disrupts Traditional Banking'
    ],
    
    // Business subcategories
    'Markets': [
      'Stock Market Reaches New Heights on Economic Optimism',
      'Emerging Markets Show Strong Growth Despite Global Uncertainty'
    ],
    'Finance': [
      'Central Bank Announces New Monetary Policy Framework',
      'Digital Banking Revolution Transforms Financial Services'
    ],
    'Economy': [
      'GDP Growth Exceeds Expectations for Third Consecutive Quarter',
      'Inflation Data Shows Promising Trends for Economic Stability'
    ],
    
    // Entertainment subcategories
    'Movies': [
      'Blockbuster Film Breaks Opening Weekend Box Office Records',
      'Independent Film Festival Showcases Groundbreaking Cinema'
    ],
    'Music': [
      'Streaming Platform Announces Revolutionary Artist Revenue Model',
      'Music Festival Lineup Features Surprise Reunion Performance'
    ],
    'Gaming': [
      'Highly Anticipated Game Launch Exceeds Sales Projections',
      'Esports Tournament Prize Pool Reaches Historic $50 Million'
    ],
    'TV Shows': [
      'Streaming Series Finale Draws Massive Global Audience',
      'New Documentary Series Exposes Major Industry Secrets'
    ],
    
    // Health subcategories
    'Medical': [
      'Revolutionary Gene Therapy Shows Promise in Clinical Trials',
      'New Medical Device Offers Non-Invasive Treatment Option'
    ],
    'Fitness': [
      'Wearable Technology Breakthrough Enables Real-Time Health Monitoring',
      'Study Reveals Optimal Exercise Routine for Longevity'
    ],
    'Mental Health': [
      'Digital Therapy Platform Reports 90% Success Rate',
      'Workplace Mental Health Programs Show Significant Impact'
    ],
    'Nutrition': [
      'Personalized Nutrition Plans Based on DNA Analysis Show Results',
      'Plant-Based Diet Study Reveals Surprising Health Benefits'
    ]
  };

  const images = [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
    'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400',
    'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400',
    'https://images.unsplash.com/photo-1640826843842-6c8e8d6ee0c1?w=400'
  ];

  const titles = subcategoryTitles[subCategory] || [
    `${subCategory} Market Shows Strong Growth Potential`,
    `Latest ${subCategory} Developments Capture Industry Attention`
  ];

  return titles.map((title, i) => {
    // Make some articles "NEW" - 30% chance for recent articles
    const hoursAgo = Math.random() * 12; // Articles from last 12 hours
    const isNew = hoursAgo <= 2 && Math.random() < 0.3; // 30% chance for articles ≤ 2 hours old
    
    return {
      id: `${subCategory.toLowerCase()}-${index}-${i}`,
      title,
      description: `Latest developments in ${subCategory} sector reveal significant market movements and technological advances.`,
      url: `https://example.com/${subCategory.toLowerCase()}-${i}`,
      imageUrl: images[(index * 2 + i) % images.length],
      publishedAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
      source: { name: `${subCategory} Today` },
      author: `${subCategory} Reporter`,
      category: parentCategory,
      isTopStory: false,
      isNew: isNew
    };
  });
};

// Export a service that mimics the NewsAPI structure
export const mockNewsAPI = {
  getHomepageNews: async (): Promise<HomepageNewsData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getTopStoriesForHomepage(); // Get curated top stories for homepage
  },
  
  getCategoryPageNews: async (category: string): Promise<CategoryPageData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getCategoryPageNews(category);
  },
  
  getNewsByCategory: async (category: string, limit: number = 10): Promise<any[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const mockData = getMockHomepageNews();
    
    switch(category) {
      case 'general':
        return mockData.worldNews.slice(0, limit);
      case 'crypto':
        return mockData.categoryNews.slice(0, limit);
      case 'technology':
        return mockData.categories.technology.slice(0, limit);
      case 'business':
        return mockData.categories.business.slice(0, limit);
      case 'sports':
        return mockData.categories.sports.slice(0, limit);
      case 'entertainment':
        return mockData.categories.entertainment.slice(0, limit);
      case 'health':
        return mockData.categories.health.slice(0, limit);
      default:
        return mockData.worldNews.slice(0, limit);
    }
  }
};