// src/pages/Notes.jsx
import { useEffect, useState } from 'react'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editTag, setEditTag] = useState('')

  const STORAGE_KEY = 'yamakasi:notes'

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setNotes(JSON.parse(stored))
  }, [])

  const saveNotes = (newNotes) => {
    setNotes(newNotes)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes))
  }

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return
    const newNote = { id: Date.now(), title, content, tag }
    const updated = [newNote, ...notes]
    saveNotes(updated)
    setTitle('')
    setContent('')
    setTag('')
  }

  const handleDelete = (id) => {
    const updated = notes.filter((n) => n.id !== id)
    saveNotes(updated)
  }

  const handleEdit = (note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
    setEditTag(note.tag || '')
  }

  const handleSaveEdit = () => {
    const updated = notes.map((n) =>
      n.id === editingId ? { ...n, title: editTitle, content: editContent, tag: editTag } : n
    )
    saveNotes(updated)
    setEditingId(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700"
        />
        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 min-h-[120px]"
        />
        <input
          type="text"
          placeholder="Tag (e.g. aws, javascript)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-zinc-800 border border-zinc-700 rounded p-4 shadow">
            {editingId === note.id ? (
              <div className="space-y-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-1 rounded bg-zinc-700"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-zinc-700"
                />
                <input
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="w-full px-3 py-1 rounded bg-zinc-700"
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="text-green-400 hover:underline">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-zinc-400 hover:underline">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <div className="flex gap-2 text-sm">
                    <button onClick={() => handleEdit(note)} className="text-blue-400 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
                {note.tag && <span className="text-sm text-blue-400">#{note.tag}</span>}
                <p className="text-zinc-300 whitespace-pre-line mt-2">{note.content}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}