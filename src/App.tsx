import React from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="app-header">
          <NavBar />
        </header>
        <main className="app-main">
          <Home />
        </main>
        <footer className="app-footer">© {new Date().getFullYear()} Watchman</footer>
      </div>
    </BrowserRouter>
  )
}
