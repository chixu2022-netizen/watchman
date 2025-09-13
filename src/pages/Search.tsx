import React, { useEffect, useState } from 'react';
import { fetchNews } from '../apiClient';
import { Link } from 'react-router-dom';

export default function SearchResults() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch first 2 pages to increase coverage
        const p1 = await fetchNews(1, 50);
        const p2 = await fetchNews(2, 50).catch(() => ({ articles: [] }));
        const pool = [...(p1.articles || []), ...(p2.articles || [])];
        const term = q.trim().toLowerCase();
        const filtered = pool.filter(a => {
          if (!term) return true;
          return [a.title, a.description, a.content].some((s: any) => (s || '').toString().toLowerCase().includes(term));
        });
        if (mounted) setResults(filtered);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Search failed');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [q]);

  if (loading) return <div className="p-6">Searching…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
      <h1 className="text-2xl font-bold mt-4 mb-4">Search results for “{q}”</h1>
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="text-gray-600">No results</div>
        ) : results.map((a: any, i: number) => (
          <article key={i} className="p-4 border rounded">
            <h2 className="text-lg font-medium"><a href={a.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{a.title}</a></h2>
            <p className="text-sm text-gray-500">{a.source?.name} • {a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ''}</p>
            <p className="mt-2 text-gray-800">{a.description || a.content || ''}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
