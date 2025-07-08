// src/app/admin/meetings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useMeetings } from '@/lib/hooks/use-meetings'
import { useMembers } from '@/lib/hooks/use-members'
import { meetingOps } from '@/lib/supabase'
import { Card, Button, Badge, Loading, Alert } from '@/components/ui'
import type { Meeting, MeetingType, MeetingStatus } from '@/lib/database.types'

export default function AdminMeetingsPage() {
  const [filters, setFilters] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { meetings, loading, error, refreshMeetings } = useMeetings(filters)
  const { members } = useMembers({ status: 'Active' })

  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    location: 'Meeting Location TBD',
    type: 'Regular' as MeetingType,
    status: 'Scheduled' as MeetingStatus,
    theme: '',
    agenda: {} as any,
    meeting_roles: {} as any,
    notes: ''
  })

  useEffect(() => {
    if (editingMeeting) {
      setFormData({
        date: editingMeeting.date?.split('T')[0] || '',
        time: editingMeeting.time || '19:00',
        location: editingMeeting.location || 'Meeting Location TBD',
        type: editingMeeting.type || 'Regular',
        status: editingMeeting.status || 'Scheduled',
        theme: editingMeeting.theme || '',
        agenda: editingMeeting.agenda || {},
        meeting_roles: editingMeeting.meeting_roles || {},
        notes: editingMeeting.notes || ''
      })
    }
  }, [editingMeeting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const meetingData = {
        ...formData,
        date: new Date(`${formData.date}T${formData.time}`).toISOString()
      }

      if (editingMeeting) {
        const { error } = await meetingOps.update(editingMeeting.id, meetingData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Meeting updated successfully!' })
        setEditingMeeting(null)
      } else {
        const { error } = await meetingOps.create(meetingData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Meeting created successfully!' })
        setShowAddForm(false)
      }

      // Reset form
      setFormData({
        date: '',
        time: '19:00',
        location: 'Meeting Location TBD',
        type: 'Regular',
        status: 'Scheduled',
        theme: '',
        agenda: {},
        meeting_roles: {},
        notes: ''
      })

      refreshMeetings()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save meeting'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (meetingId: string, meetingTheme: string) => {
    if (!confirm(`Are you sure you want to delete the meeting "${meetingTheme}"? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await meetingOps.delete(meetingId)
      if (error) throw new Error(error.message)
      setMessage({ type: 'success', text: 'Meeting deleted successfully!' })
      refreshMeetings()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete meeting'
      })
    }
  }

  const getStatusColor = (status: MeetingStatus) => {
    const colors = {
      'Scheduled': 'primary',
      'Completed': 'success',
      'Cancelled': 'danger',
      'Postponed': 'warning'
    } as const
    return colors[status] || 'info'
  }

  const getTypeColor = (type: MeetingType) => {
    const colors = {
      'Regular': 'bg-blue-100 text-blue-800',
      'Contest': 'bg-red-100 text-red-800',
      'Special': 'bg-purple-100 text-purple-800',
      'Training': 'bg-green-100 text-green-800',
      'Social': 'bg-yellow-100 text-yellow-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const formatDateTime = (dateString: string, timeString?: string) => {
    const date = new Date(dateString)
    const time = timeString || '19:00'
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  }

  if (loading && !meetings.length) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Meetings Management</h1>
          <p className="text-gray-600">Schedule and manage club meetings</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="primary"
        >
          Schedule Meeting
        </Button>
      </div>

      {/* Message */}
      {message && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="error">
          Error loading meetings: {error}
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
            >
              <option value="">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Postponed">Postponed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
            >
              <option value="">All Types</option>
              <option value="Regular">Regular</option>
              <option value="Contest">Contest</option>
              <option value="Special">Special</option>
              <option value="Training">Training</option>
              <option value="Social">Social</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => {
                const value = e.target.value
                const today = new Date()
                let dateFrom, dateTo

                if (value === 'upcoming') {
                  dateFrom = today.toISOString().split('T')[0]
                } else if (value === 'past') {
                  dateTo = today.toISOString().split('T')[0]
                } else if (value === 'this-month') {
                  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
                  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                  dateFrom = firstDay.toISOString().split('T')[0]
                  dateTo = lastDay.toISOString().split('T')[0]
                }

                setFilters({ ...filters, dateFrom, dateTo })
              }}
            >
              <option value="">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => setFilters({})}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting) => {
          const { date, time } = formatDateTime(meeting.date, meeting.time)
          return (
            <Card key={meeting.id} className="hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {meeting.theme || 'Club Meeting'}
                    </h3>
                    <Badge variant={getStatusColor(meeting.status)} size="sm">
                      {meeting.status}
                    </Badge>
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(meeting.type)}`}>
                      {meeting.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{meeting.location}</span>
                    </div>
                  </div>

                  {meeting.notes && (
                    <p className="mt-3 text-sm text-gray-700">
                      {meeting.notes}
                    </p>
                  )}

                  {/* Meeting Roles */}
                  {meeting.meeting_roles && Object.keys(meeting.meeting_roles).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Meeting Roles</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        {Object.entries(meeting.meeting_roles).map(([role, person]) => (
                          <div key={role} className="flex justify-between">
                            <span className="text-gray-600">{role}:</span>
                            <span className="font-medium">{person as string || 'TBD'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingMeeting(meeting)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(meeting.id, meeting.theme || 'meeting')}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {meetings.length === 0 && !loading && (
        <Card className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
          <p className="text-gray-500 mb-4">Get started by scheduling your first meeting.</p>
          <Button onClick={() => setShowAddForm(true)}>
            Schedule First Meeting
          </Button>
        </Card>
      )}

      {/* Add/Edit Meeting Modal */}
      {(showAddForm || editingMeeting) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => {
              setShowAddForm(false)
              setEditingMeeting(null)
            }} />

            <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-heading">
                  {editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMeeting(null)
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="Meeting location or virtual link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Theme
                  </label>
                  <input
                    type="text"
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="e.g., New Beginnings, Innovation, Leadership"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as MeetingType })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="Regular">Regular</option>
                      <option value="Contest">Contest</option>
                      <option value="Special">Special</option>
                      <option value="Training">Training</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as MeetingStatus })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Postponed">Postponed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="Meeting agenda, special instructions, or other notes..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Saving...' : editingMeeting ? 'Update Meeting' : 'Schedule Meeting'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingMeeting(null)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}