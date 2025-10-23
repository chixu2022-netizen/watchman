import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import LoadingSkeleton from './components/LoadingSkeleton';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Crypto = lazy(() => import('./pages/Crypto'));
const Sports = lazy(() => import('./pages/Sports'));
const Technology = lazy(() => import('./pages/Technology'));
const AI = lazy(() => import('./pages/AI'));
const Business = lazy(() => import('./pages/Business'));
const Entertainment = lazy(() => import('./pages/Entertainment'));
const World = lazy(() => import('./pages/World'));
const Local = lazy(() => import('./pages/Local'));
const Health = lazy(() => import('./pages/Health'));
const Politics = lazy(() => import('./pages/Politics'));
const Admin = lazy(() => import('./pages/Admin'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Loading...</h2>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      <LoadingSkeleton variant="card" count={4} />
    </div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app-root">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/crypto" element={<Crypto />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/business" element={<Business />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/world" element={<World />} />
                <Route path="/local" element={<Local />} />
                <Route path="/health" element={<Health />} />
                <Route path="/politics" element={<Politics />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="app-footer">© {new Date().getFullYear()} Watchman</footer>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
