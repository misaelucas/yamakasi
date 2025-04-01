import { useState } from 'react'

export default function Flashcards() {
  const [input, setInput] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  const generateFlashcards = async () => {
    if (!input) return
    setLoading(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    })
    const data = await res.json()
    setCards(data.cards || [])
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Flashcard Generator</h2>

      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={4}
        placeholder="Enter a topic..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generateFlashcards}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>

      <section className="mt-6 space-y-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Q: {card.question}</p>
            <p className="text-gray-700">A: {card.answer}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
