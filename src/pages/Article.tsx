import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNews } from '../apiClient';

type ArticleItem = {
  title?: string;
  urlToImage?: string;
  description?: string;
  content?: string;
  url?: string;
};

export default function Article() {
  const { id } = useParams();
  const [item, setItem] = useState<ArticleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetchNews();
        // fetchNews may return either an array of articles or { articles, total }
        const articlesArr: any[] = Array.isArray(resp) ? resp : (resp && (resp as any).articles) ? (resp as any).articles : [];

        // `id` may be an index or not available; try to find by index first
        let found = null as ArticleItem | null;
        if (id) {
          const idx = Number(id);
          if (!Number.isNaN(idx) && articlesArr[idx]) found = articlesArr[idx];
          else found = articlesArr.find((a: any) => String(a?.id) === id) || null;
        }
        if (mounted) setItem(found);
      } catch (e) {
        if (mounted) setItem(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (!item) return <div className="p-8">Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
      <h1 className="text-2xl font-bold mt-4 mb-2">{item.title}</h1>
      <img src={(item as any).urlToImage || '/placeholders/placeholder1.svg'} alt="article" className="w-full rounded shadow mb-4" />
      <p className="text-gray-700">{(item.description || item.content || '').slice(0, 1000)}</p>
      {item.url && (
        <p className="mt-4">
          <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Read original article</a>
        </p>
      )}
    </div>
  );
}
