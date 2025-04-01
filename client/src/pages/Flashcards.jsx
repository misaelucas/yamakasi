import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipboardCopy, Check, CheckCheck } from 'lucide-react'

export default function Flashcards() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialTopic = query.get('topic') || ''

  const [topic, setTopic] = useState(initialTopic)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState([])

  const STORAGE_KEY = `yamakasi:done:${topic}`

  // Carrega "done" do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setCompleted(JSON.parse(stored))
  }, [STORAGE_KEY])

  const toggleDone = (idx) => {
    const updated = completed.includes(idx)
      ? completed.filter((i) => i !== idx)
      : [...completed, idx]

    setCompleted(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const generateFlashcards = async () => {
    if (!topic.trim()) return
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic }),
      })

      const data = await res.json()
      setCards(data.cards || [])
      setCompleted([]) // limpa cards marcados ao gerar novos
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Error generating flashcards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialTopic) {
      generateFlashcards()
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white tracking-tight">
        Flashcards
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-2 rounded border border-zinc-700 bg-zinc-800 text-white tracking-tight"
        />

        <button
          onClick={generateFlashcards}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      <div className="space-y-4">
        {cards.map((card, idx) => {
          const isDone = completed.includes(idx)
          return (
            <div
              key={idx}
              className={`border rounded-lg p-4 shadow-sm transition duration-300 ${
                isDone
                  ? 'border-green-600 bg-zinc-700 opacity-70'
                  : 'border-zinc-700 bg-zinc-800 hover:border-blue-500 hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-white tracking-tight">
                  🧠 Q: {card.question}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(card.answer)}
                    className="p-1 rounded hover:bg-zinc-600 transition text-zinc-300"
                    title="Copy answer"
                  >
                    <ClipboardCopy size={16} />
                  </button>

                  <button
                    onClick={() => toggleDone(idx)}
                    className={`p-1 rounded transition ${
                      isDone
                        ? 'bg-green-700 text-white'
                        : 'hover:bg-zinc-600 text-zinc-300'
                    }`}
                    title={isDone ? 'Done' : 'Mark as done'}
                  >
                    {isDone ? <CheckCheck size={16} /> : <Check size={16} />}
                  </button>
                </div>
              </div>

              <p className="text-zinc-300">A: {card.answer}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
