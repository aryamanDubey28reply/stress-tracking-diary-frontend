'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Stress Tracking Diary</h1>
      {isLoggedIn ? (
        <>
          <nav className="mb-4">
            <Link href="/diary" className="mr-4">Diary Entries</Link>
            <Link href="/profile" className="mr-4">Profile</Link>
            <button onClick={handleLogout} className="text-blue-500">Logout</button>
          </nav>
          <p>Welcome to your Stress Tracking Diary!</p>
        </>
      ) : (
        <div>
          <Link href="/login" className="text-blue-500 mr-4">Login</Link>
          <Link href="/register" className="text-blue-500">Register</Link>
        </div>
      )}
    </div>
  )
}