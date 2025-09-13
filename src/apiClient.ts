const API_BASE = process.env.REACT_APP_API_URL;
if (!API_BASE && typeof window !== 'undefined') {
  // Friendly developer message: we'll fall back to same-origin so devs who run the bundled backend
  // on the same host:port (or use the proxy) still get data instead of the app throwing.
  // For production, set REACT_APP_API_URL to your API (example: https://api.example.com).
  // Note: when you set the env var, rebuild/restart the dev server so the value is picked up.
  // This warning is intentionally informational rather than fatal.
  console.warn('REACT_APP_API_URL not set — falling back to same-origin /news. For production set REACT_APP_API_URL to your backend URL.');
}

export async function fetchNews(page = 1, pageSize = 10, force = false) {
  // If API_BASE is present, build an absolute URL. Otherwise use a relative path so the
  // browser will call the same origin that served the frontend (useful in simple dev setups).
  let urlStr: string;

  // detect client country (cached in sessionStorage)
  let country = sessionStorage.getItem('watchman_country') || '';
  if (!country && typeof window !== 'undefined') {
    try {
      // ipapi.co provides https JSON with country code
      const r = await fetch('https://ipapi.co/json/');
      if (r.ok) {
        const j = await r.json();
        country = (j.country_code || '').toString().toLowerCase();
        if (country) sessionStorage.setItem('watchman_country', country);
      }
    } catch (e) {
      // ignore
    }
  }

    if (API_BASE) {
      const url = new URL('/news', API_BASE);
      url.searchParams.set('page', String(page));
      url.searchParams.set('pageSize', String(pageSize));
      if (country) url.searchParams.set('country', country);
      if (force) {
        url.searchParams.set('force', '1');
        // cache-busting timestamp to avoid intermediate caches
        url.searchParams.set('_ts', String(Date.now()));
      }
      urlStr = url.toString();
    } else {
      const params: Record<string, string> = { page: String(page), pageSize: String(pageSize) };
      if (country) params.country = country;
      if (force) {
        params.force = '1';
        params._ts = String(Date.now());
      }
      const qs = new URLSearchParams(params);
      urlStr = `/news?${qs.toString()}`;
    }

    const fetchOpts: RequestInit = {};
    if (force) fetchOpts.cache = 'no-store';
    try {
      // debug: show which URL the client is requesting
      // eslint-disable-next-line no-console
      console.debug('fetchNews requesting', urlStr, 'opts=', fetchOpts);
      const res = await fetch(urlStr, fetchOpts as any);
      // debug: response status
      // eslint-disable-next-line no-console
      console.debug('fetchNews response', res.status, res.statusText);
      if (!res.ok) {
        const bodyText = await res.text().catch(() => '');
        // eslint-disable-next-line no-console
        console.debug('fetchNews error body', bodyText);
        throw new Error(`Failed to fetch news: ${res.status} ${res.statusText} ${bodyText}`);
      }
      const body = await res.json().catch(() => null);
      
      // Backend historically returned either an array of articles or an object { articles, total }.
      if (!body) return { articles: [], total: 0 };
      if (Array.isArray(body)) {
        return { articles: body, total: body.length };
      }
      if (body.articles && Array.isArray(body.articles)) {
        return { articles: body.articles, total: body.total ?? body.articles.length };
      }
      // Unknown shape — attempt to coerce
      return { articles: [], total: 0 };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('fetchNews caught error', (e && (e as any).message) || e);
      throw e;
    }
}
