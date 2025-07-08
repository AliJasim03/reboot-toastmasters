// src/hooks/useClubStats.ts
'use client'

import { useState, useEffect } from 'react'
import { getDatabaseStats, memberOps } from '@/lib/supabase'

interface ClubStats {
  members: number
  meetings: number
  events: number
  activeOfficers: number
  completedSpeeches: number
  pathwaysProgress: number
}

export const useClubStats = () => {
  const [stats, setStats] = useState<ClubStats>({
    members: 0,
    meetings: 0,
    events: 0,
    activeOfficers: 0,
    completedSpeeches: 0,
    pathwaysProgress: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const dbStats = await getDatabaseStats()

        // Calculate additional stats from the data
        const { data: members } = await memberOps.getAll()
        const activeOfficers = members?.filter(member =>
          Array.isArray(member.roles) &&
          member.roles.some((role: any) => role.isActive && role.role !== 'Member')
        ).length || 0

        const completedSpeeches = members?.reduce((sum, member) =>
          sum + (member.completed_speeches || 0), 0) || 0

        const pathwaysProgress = members?.reduce((sum, member) =>
          sum + (member.pathways_level || 0), 0) || 0

        setStats({
          members: dbStats.members,
          meetings: dbStats.meetings,
          events: dbStats.events,
          activeOfficers,
          completedSpeeches,
          pathwaysProgress
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch club stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
