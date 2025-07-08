// Fixed useDashboard hook with proper union types
'use client'

import { useMembers } from './use-members'
import { useMeetings } from './use-meetings'
import { useEvents } from './use-events'
import { useClubStats } from './use-clubStats'
import type { Meeting, Event } from '@/lib/database.types'

// Create proper union types for dashboard items
type DashboardActivity = {
  id: string
  type: 'meeting' | 'event'
  title: string
  date: string
  description: string
}

type DashboardItem = (Meeting & { itemType: 'meeting' }) | (Event & { itemType: 'event' })

export const useDashboard = () => {
  const { members, loading: membersLoading } = useMembers()
  const { meetings, loading: meetingsLoading } = useMeetings()
  const { events, loading: eventsLoading } = useEvents()
  const { stats, loading: statsLoading } = useClubStats()

  const loading = membersLoading || meetingsLoading || eventsLoading || statsLoading

  // Recent activity with proper typing
  const recentActivity: DashboardActivity[] = [
    ...meetings.slice(0, 3).map(meeting => ({
      id: `meeting-${meeting.id}`,
      type: 'meeting' as const,
      title: meeting.theme || 'Meeting',
      date: meeting.date,
      description: `Meeting scheduled for ${new Date(meeting.date).toLocaleDateString()}`,
    })),
    ...events.slice(0, 2).map(event => ({
      id: `event-${event.id}`,
      type: 'event' as const,
      title: event.title,
      date: event.date,
      description: event.description,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  // Upcoming items with proper typing
  const upcomingItems: DashboardItem[] = [
    ...meetings
      .filter(m => new Date(m.date) > new Date())
      .slice(0, 3)
      .map(meeting => ({ ...meeting, itemType: 'meeting' as const })),
    ...events
      .filter(e => new Date(e.date) > new Date())
      .slice(0, 3)
      .map(event => ({ ...event, itemType: 'event' as const })),
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