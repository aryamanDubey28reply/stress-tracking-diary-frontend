'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [streak, setStreak] = useState(null)
  const [lastCheckIn, setLastCheckIn] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchStreakInfo()
  }, [])

  const fetchStreakInfo = async () => {
    try {
      const response = await fetch('/api/users/streak', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      if (response.ok) {
        const data = await response.json()
        setStreak(data.currentStreak)
        setLastCheckIn(data.lastCheckIn)
      } else if (response.status === 401) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Fetch streak info error:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>Current Streak: {streak}</p>
      <p>Last Check-In: {lastCheckIn}</p>
    </div>
  )
}