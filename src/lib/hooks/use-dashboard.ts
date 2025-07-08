// src/hooks/useDashboard.ts
'use client'

import { useState, useEffect } from 'react'
import { useMembers } from './use-members'
import { useMeetings } from './use-meetings'
import { useEvents } from './use-events'
import { useClubStats } from './use-clubStats'

export const useDashboard = () => {
  const { members, loading: membersLoading } = useMembers()
  const { meetings, loading: meetingsLoading } = useMeetings()
  const { events, loading: eventsLoading } = useEvents()
  const { stats, loading: statsLoading } = useClubStats()

  const loading = membersLoading || meetingsLoading || eventsLoading || statsLoading

  // Recent activity
  const recentActivity = [
    ...meetings.slice(0, 3).map(meeting => ({
      id: `meeting-${meeting.id}`,
      type: 'meeting',
      title: meeting.theme || 'Meeting',
      date: meeting.date,
      description: `Meeting scheduled for ${new Date(meeting.date).toLocaleDateString()}`,
    })),
    ...events.slice(0, 2).map(event => ({
      id: `event-${event.id}`,
      type: 'event',
      title: event.title,
      date: event.date,
      description: event.description,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  // Upcoming items
  const upcomingItems = [
    ...meetings.filter(m => new Date(m.date) > new Date()).slice(0, 3),
    ...events.filter(e => new Date(e.date) > new Date()).slice(0, 3),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5)

  return {
    members,
    meetings,
    events,
    stats,
    recentActivity,
    upcomingItems,
    loading,
  }
}