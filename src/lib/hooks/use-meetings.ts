// src/hooks/useMeetings.ts
'use client'

import { useState, useEffect } from 'react'
import { meetingOps } from '@/lib/supabase'
import type { Meeting, MeetingFilters } from '@/lib/database.types'

export const useMeetings = (filters?: MeetingFilters) => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMeetings = async () => {
    try {
      setLoading(true)
      const { data, error } = await meetingOps.getAll(filters)
      if (error) throw new Error(error.message)
      setMeetings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch meetings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [JSON.stringify(filters)])

  const refreshMeetings = () => fetchMeetings()

  return { meetings, loading, error, refreshMeetings }
}

export const useUpcomingMeetings = (limit = 10) => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcomingMeetings = async () => {
      try {
        setLoading(true)
        const { data, error } = await meetingOps.getUpcoming(limit)
        if (error) throw new Error(error.message)
        setMeetings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch upcoming meetings')
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingMeetings()
  }, [limit])

  return { meetings, loading, error }
}
