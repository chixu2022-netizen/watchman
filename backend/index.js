const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const parser = new RSSParser();

// Allow requests from the frontend during development. Restrict in production.
if (process.env.NODE_ENV === 'production') {
  const allowed = process.env.ALLOWED_ORIGIN || 'https://example.com';
  app.use(cors({ origin: allowed }));
} else {
  app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Feed list
const FEEDS = [
  { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' },
  { name: 'Watchman', url: 'http://rss.cnn.com/rss/edition.rss' },
  { name: 'Reuters', url: 'http://feeds.reuters.com/reuters/topNews' },
  { name: 'NYTimes', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
  { name: 'AlJazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { name: 'TheGuardian', url: 'https://www.theguardian.com/world/rss' },
];

// Archive / persistence settings
const ARCHIVE_DIR = path.join(__dirname, 'data');
const ARCHIVE_FILE = path.join(ARCHIVE_DIR, 'articles.json');
const RETENTION_DAYS = Number(process.env.RETENTION_DAYS || 365);
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;
const RECENT_DAYS = Number(process.env.RECENT_DAYS || 7);
const RECENT_MS = RECENT_DAYS * 24 * 60 * 60 * 1000;
const CACHE_TTL = Number(process.env.CACHE_TTL_MS || 60 * 1000);
const RESPONSE_MAX = Number(process.env.RESPONSE_MAX || 500);
const IMAGE_FETCH_LIMIT = Number(process.env.IMAGE_FETCH_LIMIT || 20);
const IMAGE_FETCH_TIMEOUT = Number(process.env.IMAGE_FETCH_TIMEOUT_MS || 4000);

// ensure archive dir exists
try { if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR); } catch (e) { /* ignore */ }

// load archive into memory (newest first)
let archive = [];
try {
  if (fs.existsSync(ARCHIVE_FILE)) {
    const raw = fs.readFileSync(ARCHIVE_FILE, 'utf8');
    archive = JSON.parse(raw || '[]') || [];
  }
} catch (e) {
  archive = [];
}

// simple in-memory cache
if (!global._newsCache) global._newsCache = { ts: 0, articles: [] };

// Helper: normalize rss item -> article shape expected by frontend
function normalizeItem(item, feedName) {
  const title = item.title || '';
  const url = item.link || item.guid || '';
  // Normalize published date. Prefer isoDate but accept other common fields.
  let publishedAt = item.isoDate || item.pubDate || item.pubdate || null;
  // If we have a publishedAt string, normalize to an ISO string for consistency
  if (publishedAt) {
    const parsed = Date.parse(publishedAt);
    if (!Number.isNaN(parsed)) publishedAt = new Date(parsed).toISOString();
  }
  let publishedTs = publishedAt ? (Date.parse(publishedAt) || null) : null;
  // try common places for an image — be forgiving about shapes
  function extractImage(it) {
    if (!it) return null;
    // enclosure can be object or array
    const enc = it.enclosure;
    if (enc) {
      if (Array.isArray(enc)) {
        for (const e of enc) {
          if (e && (e.url || e.href)) return e.url || e.href;
          if (e && e['$'] && e['$'].url) return e['$'].url;
        }
      } else if (typeof enc === 'object') {
        if (enc.url) return enc.url;
        if (enc.href) return enc.href;
        if (enc['$'] && enc['$'].url) return enc['$'].url;
      }
    }

    const keys = ['media:content', 'media:thumbnail', 'media:group', 'thumbnail', 'image', 'media_thumbnail'];
    for (const k of keys) {
      const v = it[k];
      if (!v) continue;
      if (typeof v === 'string') return v;
      if (Array.isArray(v)) {
        for (const x of v) {
          if (!x) continue;
          if (x.url) return x.url;
          if (x['$'] && x['$'].url) return x['$'].url;
          if (x['#']) return x['#'];
        }
      }
      if (typeof v === 'object') {
        if (v.url) return v.url;
        if (v['$'] && v['$'].url) return v['$'].url;
        if (v['#']) return v['#'];
      }
    }

    // sometimes image URLs are embedded in content/description as <img src="...">
    const html = it.content || it.description || it.summary || '';
    if (html && typeof html === 'string') {
      const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
      if (m && m[1]) return m[1];
    }

    return null;
  }

  let urlToImage = extractImage(item) || null;
  const description = item.contentSnippet || item.summary || item.description || '';
  const content = item.content || item['content:encoded'] || '';
  // fallback to a local placeholder so frontend always has an image
  if (!urlToImage) urlToImage = '/placeholders/placeholder1.svg';
  return {
    title,
    url,
    source: { name: feedName },
    publishedAt,
    publishedTs,
    urlToImage,
    description,
    content,
  };
}

async function fetchAndMergeFeeds() {
  const results = [];
  const errors = [];

  await Promise.all(FEEDS.map(async feed => {
    try {
      const parsed = await parser.parseURL(feed.url);
      if (parsed && Array.isArray(parsed.items)) {
        for (const item of parsed.items) {
          results.push(normalizeItem(item, feed.name));
        }
      }
    } catch (err) {
      errors.push({ feed: feed.name, error: (err && err.message) || String(err) });
    }
  }));

  // deduplicate against existing archive (by url then title)
  const existingUrls = new Set(archive.map(a => a.url));
  const existingTitles = new Set(archive.map(a => a.title));
  const newItems = [];
  for (const it of results) {
    const keyUrl = it.url || '';
    const keyTitle = (it.title || '').trim();
    if (!keyUrl && !keyTitle) continue;
    if (keyUrl && existingUrls.has(keyUrl)) continue;
    if (!keyUrl && keyTitle && existingTitles.has(keyTitle)) continue;
    const item = Object.assign({}, it, { archivedAt: Date.now() });
    newItems.push(item);
    if (keyUrl) existingUrls.add(keyUrl);
    if (keyTitle) existingTitles.add(keyTitle);
  }

  if (newItems.length) {
    // newest first
    archive = [...newItems.reverse(), ...archive];
  }

  // For items that still lack urlToImage, attempt to fetch og:image from the article page (best-effort).
  // Limit the number of page scrapes to IMAGE_FETCH_LIMIT per run to avoid excessive network load.
  const toFetch = [];
  for (const a of archive) {
    if (toFetch.length >= IMAGE_FETCH_LIMIT) break;
    if ((!a.urlToImage || a.urlToImage === '/placeholders/placeholder1.svg') && a.url && String(a.url).startsWith('http')) {
      toFetch.push(a);
    }
  }

  const fetchImageFromPage = async (articleUrl) => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT);
      const r = await fetch(articleUrl, { signal: controller.signal, redirect: 'follow' });
      clearTimeout(id);
      if (!r.ok) return null;
      const text = await r.text();
      // try og:image, twitter:image, then first <img>
      const og = text.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || text.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (og && og[1]) return og[1];
      const tw = text.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) || text.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
      if (tw && tw[1]) return tw[1];
      const img = text.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
      if (img && img[1]) return img[1];
    } catch (e) {
      return null;
    }
    return null;
  };

  // perform sequential (not parallel) fetches to be polite to remote servers
  for (const a of toFetch) {
    try {
      const found = await fetchImageFromPage(a.url);
      if (found) {
        // normalize protocol-relative URLs
        const normalized = found.startsWith('//') ? ('https:' + found) : found;
        a.urlToImage = normalized;
      }
    } catch (e) {
      // ignore per-item failures
    }
  }

  // normalize publishedTs/publishedAt and trim archive older than retention
  const cutoff = Date.now() - RETENTION_MS;
  archive = archive.map(a => {
    // ensure publishedTs exists; prefer existing, then publishedAt, then archivedAt
    if (!a.publishedTs) {
      if (a.publishedAt) {
        const p = Date.parse(a.publishedAt);
        a.publishedTs = Number.isNaN(p) ? null : p;
      } else if (a.archivedAt) {
        a.publishedTs = a.archivedAt;
      } else {
        a.publishedTs = null;
      }
    }

    // ensure publishedAt is present for frontend display: derive from publishedTs or archivedAt
    if (!a.publishedAt) {
      const ts = a.publishedTs || a.archivedAt || null;
      if (ts) {
        try {
          a.publishedAt = new Date(Number(ts)).toISOString();
        } catch (e) {
          a.publishedAt = null;
        }
      }
    }

    return a;
  }).filter(a => {
    const ts = (a.publishedTs || a.archivedAt || 0);
    return ts >= cutoff;
  });

  // ensure archive is sorted newest-first by publishedTs or archivedAt
  archive.sort((x, y) => {
    const tx = x.publishedTs || x.archivedAt || 0;
    const ty = y.publishedTs || y.archivedAt || 0;
    return ty - tx;
  });

  // persist to disk (best-effort)
  try {
    fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write archive:', e && e.message);
  }

  return { newItemsCount: newItems.length, errors };
}

app.get('/news', async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));
  const force = (req.query.force || '') === '1' || (req.query.force || '').toString().toLowerCase() === 'true';
  const fresh = (req.query.fresh || '') === '1' || (req.query.fresh || '').toString().toLowerCase() === 'true';
  const recentDaysParam = Number(req.query.recentDays || 0) || 0;
  const recentMs = recentDaysParam > 0 ? (recentDaysParam * 24 * 60 * 60 * 1000) : RECENT_MS;

  const now = Date.now();
  try {
    if (force || now - global._newsCache.ts > CACHE_TTL || !global._newsCache.articles.length) {
      const { newItemsCount, errors } = await fetchAndMergeFeeds();
      global._newsCache.ts = Date.now();
      global._newsCache.articles = archive.slice();
      if (errors.length && archive.length === 0) {
        return res.status(502).json({ success: false, error: 'Failed to fetch any RSS feeds', details: errors });
      }
    }

    // Serve paginated, trimmed response
    let limited = global._newsCache.articles.slice(0, RESPONSE_MAX);
    if (fresh) {
      const cutoffFresh = Date.now() - recentMs;
      limited = limited.filter(a => (a.publishedTs || a.archivedAt || 0) >= cutoffFresh);
    }
    const total = limited.length;
    const start = (page - 1) * pageSize;
    const paged = limited.slice(start, start + pageSize);
    return res.json({ success: true, total, articles: paged });
  } catch (err) {
    console.error('Error in /news:', err && err.message);
    return res.status(500).json({ success: false, error: (err && err.message) || 'Internal error' });
  }
});

app.get('/archive-status', (req, res) => {
  try {
    if (!fs.existsSync(ARCHIVE_DIR)) return res.json({ files: [] });
    const files = fs.readdirSync(ARCHIVE_DIR).filter(f => f.endsWith('.json'));
    const info = files.map(f => {
      const p = path.join(ARCHIVE_DIR, f);
      try {
        const stat = fs.statSync(p);
        const raw = fs.readFileSync(p, 'utf8');
        const parsed = JSON.parse(raw || '[]');
        return { file: f, path: p, items: Array.isArray(parsed) ? parsed.length : null, mtime: stat.mtimeMs };
      } catch (e) {
        return { file: f, path: p, error: e && e.message };
      }
    });
    return res.json({ files: info });
  } catch (e) {
    return res.status(500).json({ error: e && e.message });
  }
});

// POST /refresh - force fetching feeds and updating archive (useful for debugging)
app.post('/refresh', async (req, res) => {
  try {
    const { newItemsCount, errors } = await fetchAndMergeFeeds();
    // update cache
    global._newsCache.ts = Date.now();
    global._newsCache.articles = archive.slice();
    return res.json({ success: true, newItems: newItemsCount, total: archive.length, errors });
  } catch (e) {
    return res.status(500).json({ success: false, error: e && e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
