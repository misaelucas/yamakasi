// Yamakasi: AI Learning Platform
// Modularized Structure (React Router + Flashcards Page)

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Flashcards from './pages/Flashcards'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import Infographics from './pages/Infographics'
import './index.css'

export default function App() {
  return (
    <Router>
      <main className="font-mono tracking-tight min-h-screen dark bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800">
  <div className="text-white text-xl font-semibold flex items-center space-x-1">
    <span className="font-bold border border-white px-1">Yama</span>
    <span>kasi</span>
  </div>

  <nav className="flex gap-6 text-sm text-zinc-300">
    <Link to="/" className="hover:text-white transition">Dashboard</Link>
    <Link to="/flashcards" className="hover:text-white transition">Flashcards</Link>
    <Link to="/notes" className="hover:text-white transition">Notes</Link>
    <Link to="/infographics" className="hover:text-white transition">Infographics</Link>
  </nav>
</header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/infographics" element={<Infographics />} />
        </Routes>
      </main>
    </Router>
  )
}
