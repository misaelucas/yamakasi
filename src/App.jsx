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
      <main className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">Yamakasi</h1>
          <nav className="mt-2 flex justify-center gap-4 text-blue-600">
            <Link to="/">Dashboard</Link>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/infographics">Infographics</Link>
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
