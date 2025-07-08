// src/hooks/useMembers.ts
'use client'

import { useState, useEffect } from 'react'
import { memberOps } from '@/lib/supabase'
import type { Member, MemberFilters } from '@/lib/database.types'

export const useMembers = (filters?: MemberFilters) => {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await memberOps.getAll(filters)
      if (error) throw new Error(error.message)
      setMembers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [JSON.stringify(filters)])

  const refreshMembers = () => fetchMembers()

  return { members, loading, error, refreshMembers }
}

export const useOfficers = () => {
  const [officers, setOfficers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setLoading(true)
        const { data, error } = await memberOps.getOfficers()
        if (error) throw new Error(error.message)
        setOfficers(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch officers')
      } finally {
        setLoading(false)
      }
    }

    fetchOfficers()
  }, [])

  return { officers, loading, error }
}