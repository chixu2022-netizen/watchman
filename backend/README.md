Watchman backend

This simple Express backend provides a `/news` endpoint that fetches and combines articles from several public RSS feeds.

Setup

1. cd backend
2. npm install
3. npm run dev (requires nodemon) or npm start

Endpoints

- GET / -> returns "Backend is running"
- GET /news -> returns combined JSON articles from multiple RSS feeds (BBC, Watchman, Reuters, NYTimes, Al Jazeera, The Guardian)

Notes

- The server uses `rss-parser` to parse feeds. If some feeds fail the server will skip them and return results from the others. If all feeds fail the endpoint returns an error.
- CORS is enabled for development.
