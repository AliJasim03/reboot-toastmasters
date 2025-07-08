// Fixed admin meetings page with correct enum values
'use client'

import { useState, useEffect } from 'react'
import { useMeetings } from '@/lib/hooks/use-meetings'
import { useMembers } from '@/lib/hooks/use-members'
import { meetingOps } from '@/lib/supabase'
import { Card, Button, Loading, Alert } from '@/components/ui'
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
    type: 'Regular Meeting' as MeetingType,  // Fixed: Use full enum value
    status: 'Scheduled' as MeetingStatus,
    theme: '',
    agenda: {} as any,
    meeting_roles: {} as any,
    notes: '',
    table_topics_master: '',
    toastmaster: ''
  })

  useEffect(() => {
    if (editingMeeting) {
      setFormData({
        date: editingMeeting.date?.split('T')[0] || '',
        time: editingMeeting.time || '19:00',
        location: editingMeeting.location || 'Meeting Location TBD',
        type: editingMeeting.type || 'Regular Meeting',
        status: editingMeeting.status || 'Scheduled',
        theme: editingMeeting.theme || '',
        agenda: editingMeeting.agenda || {},
        meeting_roles: editingMeeting.meeting_roles || {},
        notes: editingMeeting.notes || '',
        table_topics_master: editingMeeting.table_topics_master || '',
        toastmaster: editingMeeting.toastmaster || ''
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
        type: 'Regular Meeting',  // Fixed: Use full enum value
        status: 'Scheduled',
        theme: '',
        agenda: {},
        meeting_roles: {},
        notes: '',
        table_topics_master: '',
        toastmaster: ''
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
      'Regular Meeting': 'bg-blue-100 text-blue-800',
      'Contest Meeting': 'bg-red-100 text-red-800',
      'Special Event': 'bg-purple-100 text-purple-800',
      'Officer Training': 'bg-green-100 text-green-800',
      'Demo Meeting': 'bg-yellow-100 text-yellow-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const formatDateTime = (dateString: string, timeString?: string) => {
    const date = new Date(dateString)
    const timeStr = timeString || '19:00'
    return `${date.toLocaleDateString()} at ${timeStr}`
  }

  if (loading) return <Loading />
  if (error) return <Alert variant="danger" title="Error" message={error} />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Meeting Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="primary"
        >
          Schedule New Meeting
        </Button>
      </div>

      {message && (
        <Alert
          variant={message.type === 'success' ? 'success' : 'danger'}
          title={message.type === 'success' ? 'Success' : 'Error'}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Filters */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
            >
              <option value="">All Status</option>
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
              <option value="Regular Meeting">Regular Meeting</option>
              <option value="Contest Meeting">Contest Meeting</option>
              <option value="Special Event">Special Event</option>
              <option value="Officer Training">Officer Training</option>
              <option value="Demo Meeting">Demo Meeting</option>
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
        </div>
      </Card>

      {/* Meeting Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">
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
                      <option value="Regular Meeting">Regular Meeting</option>
                      <option value="Contest Meeting">Contest Meeting</option>
                      <option value="Special Event">Special Event</option>
                      <option value="Officer Training">Officer Training</option>
                      <option value="Demo Meeting">Demo Meeting</option>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Toastmaster
                    </label>
                    <select
                      value={formData.toastmaster}
                      onChange={(e) => setFormData({ ...formData, toastmaster: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="">Select Toastmaster</option>
                      {members.map(member => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Table Topics Master
                    </label>
                    <select
                      value={formData.table_topics_master}
                      onChange={(e) => setFormData({ ...formData, table_topics_master: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="">Select Table Topics Master</option>
                      {members.map(member => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
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