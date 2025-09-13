import React from 'react'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SearchResults from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function AppContent() {
  const location = useLocation()
  const hideShell = location.pathname === '/signin' || location.pathname === '/signup'

  return (
    <div className="app-root">
      {!hideShell && (
        <header className="app-header">
          <NavBar />
        </header>
      )}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!hideShell && <footer className="app-footer">© {new Date().getFullYear()} Watchman</footer>}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
