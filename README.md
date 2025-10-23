# 📰 Watchman News - Modern News Aggregator

![Status](https://img.shields.io/badge/status-production%20ready-green)
![React](https://img.shields.io/badge/react-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/typescript-4.9.5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A high-performance, production-ready news aggregator built with React + TypeScript. Features intelligent caching, lazy loading, and optimized for free API tier limits (200 requests/day).

## 🌟 Features

### Core Features

- **11 News Categories**: Politics, Health, Sports, Technology, AI, Business, Entertainment, World, Local, Crypto
- **Real-time News**: Integrated with NewsData.io API
- **Smart Caching**: Multi-layer caching (LocalStorage → Database → API → Fallback)
- **Lazy Loading**: Progressive image loading for better performance
- **API Quota Management**: Intelligent tracking for free tier (200 req/day)
- **Responsive Design**: Mobile-first with Tailwind CSS
- **100% Optimized**: All pages use optimizedNewsService for consistent caching

### Technical Features

- **React 19** with TypeScript
- **Code Splitting**: Lazy-loaded routes for faster initial load
- **Error Boundaries**: Graceful error handling
- **Request Deduplication**: Prevents duplicate API calls
- **Stale-While-Revalidate**: Shows cached content while fetching fresh data
- **Testing Dashboard**: Dev-only testing tools

## 🚀 Live Demo

**Production Site**: [Deployed on Vercel]

> Note: The app uses intelligent caching to stay within NewsData.io free tier limits (200 requests/day)

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19.1.1 + TypeScript 4.9.5
- **Routing**: React Router DOM 7.8.2
- **Styling**: Tailwind CSS 3.4.17 + Custom CSS
- **UI Components**: Material-UI 7.3.2

### Backend & Data

- **News API**: NewsData.io (free tier optimized)
- **Database**: Supabase (PostgreSQL)
- **Caching**: LocalStorage + Database
- **Serverless**: Vercel Functions

### Performance

- **Image Loading**: Intersection Observer API
- **Code Splitting**: React.lazy + Suspense
- **Request Optimization**: Deduplication + Throttling
- **Caching Strategy**: Stale-while-revalidate

### DevOps

- **Deployment**: Vercel
- **CI/CD**: Automatic deployments
- **Cron Jobs**: Scheduled news fetching (every 3-4 hours)
- **Environment**: Secure environment variables

## 📱 Pages

- **Home**: Multi-section layout with 100+ articles (lazy loaded)
- **Politics**: Political news and government updates
- **Health**: Health and medical news
- **Sports**: Sports coverage and updates
- **Technology**: Tech industry news
- **AI**: Artificial intelligence and ML news
- **Business**: Financial and business news
- **Entertainment**: Celebrity and entertainment news
- **World**: International news
- **Local**: Local news coverage
- **Crypto**: Cryptocurrency and blockchain news
- **Admin**: Management dashboard (restricted)

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- NewsData.io API key (free tier)
- Supabase account (free tier)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd watchman

# Install dependencies
npm install

# Create environment file
cp .env.template .env

# Edit .env with your credentials
# REACT_APP_NEWSDATA_API_KEY=your_key
# REACT_APP_SUPABASE_URL=your_url
# REACT_APP_SUPABASE_ANON_KEY=your_key
```

### Database Setup

1. Create a Supabase project
2. Run the SQL from `database-setup.sql` in Supabase SQL Editor
3. Verify table creation

### Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See `DEPLOYMENT_CHECKLIST.md` for complete deployment guide.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)**: Complete setup instructions
- **[Deployment Guide](DEPLOYMENT.md)**: Step-by-step deployment to Vercel
- **[Archived Docs](docs/archive/)**: Historical documentation and development notes

## 💡 Key Optimizations

### Smart Caching Strategy

```
User Request → LocalStorage Cache (1hr TTL)
                     ↓ (miss)
              Supabase Database
                     ↓ (miss)
              NewsData.io API
                     ↓
              Store in Cache + DB
```

### API Quota Management

- **Free Tier**: 200 requests/day
- **Smart Caching**: Reduces to ~10-20 requests/day
- **Cron Jobs**: Pre-fetch news every 3-4 hours
- **Fallback**: Stale cache or static content when quota exceeded

### Performance Features

- Lazy loading images (Intersection Observer)
- Code splitting (route-based with React.lazy)
- Request deduplication
- Error boundaries
- Loading skeletons
- Smart caching reduces API calls by 90%
- Stale-while-revalidate pattern

## 🐛 Troubleshooting

### Common Issues

**API Key Missing**

```bash
# Check environment variables
cat .env
# Should have REACT_APP_NEWSDATA_API_KEY
```

**Database Connection Failed**

- Verify Supabase credentials
- Check RLS policies enabled
- Verify table exists

**Quota Exceeded**

```typescript
// Check quota status (dev console)
import { optimizedNewsService } from './services/optimizedNewsService';
const stats = optimizedNewsService.getStats();
console.log(stats.quota);
```

## 🔒 Security

- ✅ No hardcoded API keys
- ✅ Environment variables for all secrets
- ✅ `.gitignore` configured properly
- ✅ Supabase RLS enabled
- ✅ HTTPS enforced
- ✅ Testing dashboard dev-only

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Set environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

See `DEPLOYMENT_CHECKLIST.md` for complete deployment guide.

## 📊 Performance Metrics

- **Initial Load**: < 3 seconds
- **Time to Interactive**: < 4 seconds  
- **Lighthouse Score**: > 80
- **API Requests**: 10-20/day (with smart caching)
- **Cache Hit Rate**: > 90%
- **Build Size**: ~1.2 MB (optimized)
- **Page Load**: < 2 seconds (cached)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🚀 Roadmap

- [ ] Search functionality
- [ ] User authentication
- [ ] Bookmarking articles
- [ ] Push notifications
- [ ] Dark mode
- [ ] PWA support
- [ ] Advanced analytics
- [ ] RSS feed support

## 📞 Support

For issues or questions:

- Check documentation in `/docs`
- Review troubleshooting section
- Open an issue on GitHub

---

**Built with ❤️ using React + TypeScript**
