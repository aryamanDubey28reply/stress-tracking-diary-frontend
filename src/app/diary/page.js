'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Diary() {
  const [entries, setEntries] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [stressLevel, setStressLevel] = useState(1)
  const router = useRouter()

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/diary/entries', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      } else if (response.status === 401) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Fetch entries error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/diary/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, content, stressLevel }),
      })
      if (response.ok) {
        setTitle('')
        setContent('')
        setStressLevel(1)
        fetchEntries()
      }
    } catch (error) {
      console.error('Create entry error:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Diary Entries</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 mb-4 border rounded"
          rows="4"
        />
        <input
          type="number"
          value={stressLevel}
          onChange={(e) => setStressLevel(parseInt(e.target.value))}
          min="1"
          max="10"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Entry
        </button>
      </form>
      <div>
        {entries.map((entry) => (
          <div key={entry.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{entry.title}</h2>
            <p>{entry.content}</p>
            <p>Stress Level: {entry.stressLevel}</p>
            <p>Date: {new Date(entry.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}