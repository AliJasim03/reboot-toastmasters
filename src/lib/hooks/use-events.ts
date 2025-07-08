// src/hooks/useEvents.ts
'use client'

import { useState, useEffect } from 'react'
import { eventOps } from '@/lib/supabase'
import type { Event, EventFilters } from '@/lib/database.types'

export const useEvents = (filters?: EventFilters) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await eventOps.getAll(filters)
      if (error) throw new Error(error.message)
      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [JSON.stringify(filters)])

  const refreshEvents = () => fetchEvents()

  return { events, loading, error, refreshEvents }
}
