import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Sports from './pages/Sports';
import Technology from './pages/Technology';
import AI from './pages/AI';
import Business from './pages/Business';
import Entertainment from './pages/Entertainment';
import World from './pages/World';
import Local from './pages/Local';
import Health from './pages/Health';
import Politics from './pages/Politics';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="app-header">
          <NavBar />
        </header>
        <main className="app-main">
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
            {/* More routes will be added for other category pages */}
          </Routes>
        </main>
        <footer className="app-footer">© {new Date().getFullYear()} Watchman</footer>
      </div>
    </BrowserRouter>
  )
}
