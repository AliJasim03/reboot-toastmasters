// Fixed events admin page with correct field names
'use client'

import { useState, useEffect } from 'react'
import { useEvents } from '@/lib/hooks/use-events'
import { eventOps } from '@/lib/supabase'
import { Card, Button, Badge, Loading, Alert } from '@/components/ui'
import type { Event, EventType, EventStatus } from '@/lib/database.types'

export default function AdminEventsPage() {
  const [filters, setFilters] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { events, loading, error, refreshEvents } = useEvents(filters)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '19:00',
    end_time: '21:00',
    location: '',
    type: 'Workshop' as EventType,
    status: 'Upcoming' as EventStatus,
    is_public: true,
    registration_required: false,
    max_attendees: null as number | null,
    cost: null as number | null,
    registration_deadline: '',
    organizer: 'info@reboot-toastmasters.org'
  })

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        date: editingEvent.date?.split('T')[0] || '',
        start_time: editingEvent.start_time || '19:00',
        end_time: editingEvent.end_time || '21:00',
        location: editingEvent.location || '',
        type: editingEvent.type || 'Workshop',
        status: editingEvent.status || 'Upcoming',
        is_public: editingEvent.is_public ?? true,
        registration_required: editingEvent.registration_required ?? false,
        max_attendees: editingEvent.max_attendees,
        cost: editingEvent.cost,
        registration_deadline: editingEvent.registration_deadline?.split('T')[0] || '',
        organizer: editingEvent.organizer || 'info@reboot-toastmasters.org'
      })
    }
  }, [editingEvent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        location: formData.location,
        type: formData.type,
        status: formData.status,
        is_public: formData.is_public,
        registration_required: formData.registration_required,
        max_attendees: formData.max_attendees,
        cost: formData.cost,
        registration_deadline: formData.registration_deadline || null,
        organizer: formData.organizer,
        current_attendees: 0,
        images: [],
        agenda: null,
        attendees: []
      }

      if (editingEvent) {
        const { error } = await eventOps.update(editingEvent.id, eventData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Event updated successfully!' })
        setEditingEvent(null)
      } else {
        const { error } = await eventOps.create(eventData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Event created successfully!' })
        setShowAddForm(false)
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        start_time: '19:00',
        end_time: '21:00',
        location: '',
        type: 'Workshop',
        status: 'Upcoming',
        is_public: true,
        registration_required: false,
        max_attendees: null,
        cost: null,
        registration_deadline: '',
        organizer: 'info@reboot-toastmasters.org'
      })

      refreshEvents()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save event'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await eventOps.delete(eventId)
      if (error) throw new Error(error.message)
      setMessage({ type: 'success', text: 'Event deleted successfully!' })
      refreshEvents()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete event'
      })
    }
  }

  const getStatusColor = (status: EventStatus) => {
    const colors = {
      'Upcoming': 'primary',
      'Ongoing': 'warning',
      'Completed': 'success',
      'Cancelled': 'danger'
    } as const
    return colors[status] || 'info'
  }

  const getTypeColor = (type: EventType) => {
    const colors = {
      'Club Meeting': 'bg-blue-100 text-blue-800',
      'Contest': 'bg-red-100 text-red-800',
      'Training': 'bg-green-100 text-green-800',
      'Social': 'bg-yellow-100 text-yellow-800',
      'Open House': 'bg-purple-100 text-purple-800',
      'Conference': 'bg-indigo-100 text-indigo-800',
      'Workshop': 'bg-teal-100 text-teal-800'
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

  if (loading && !events.length) {
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
          <h1 className="text-2xl font-bold font-heading text-gray-900">Events Management</h1>
          <p className="text-gray-600">Create and manage club events, workshops, and special occasions</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="primary"
        >
          Create Event
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
          Error loading events: {error}
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
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
            >
              <option value="">All Types</option>
              <option value="Club Meeting">Club Meeting</option>
              <option value="Contest">Contest</option>
              <option value="Training">Training</option>
              <option value="Social">Social</option>
              <option value="Open House">Open House</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, isPublic: e.target.value === 'public' ? true : e.target.value === 'private' ? false : undefined })}
            >
              <option value="">All Events</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
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

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => {
          const { date, time } = formatDateTime(event.date, event.start_time)
          return (
            <Card key={event.id} className="hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <Badge variant={getStatusColor(event.status)} size="sm">
                      {event.status}
                    </Badge>
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    {event.is_public && (
                      <Badge variant="success" size="sm">
                        Public
                      </Badge>
                    )}
                    {event.registration_required && (
                      <Badge variant="warning" size="sm">
                        Registration Required
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">{event.description}</p>

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
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cost: </span>
                      <span className="font-medium">{event.cost ? `$${event.cost}` : 'Free'}</span>
                    </div>
                    {event.max_attendees && (
                      <div>
                        <span className="text-gray-600">Capacity: </span>
                        <span className="font-medium">
                          {event.current_attendees || 0} / {event.max_attendees}
                        </span>
                      </div>
                    )}
                    {event.registration_deadline && (
                      <div>
                        <span className="text-gray-600">Registration by: </span>
                        <span className="font-medium">
                          {new Date(event.registration_deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Contact: </span>
                      <span className="font-medium">{event.organizer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEvent(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(event.id, event.title)}
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

      {events.length === 0 && !loading && (
        <Card className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">Create your first club event to get started.</p>
          <Button onClick={() => setShowAddForm(true)}>
            Create First Event
          </Button>
        </Card>
      )}

      {/* Add/Edit Event Modal */}
      {(showAddForm || editingEvent) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => {
              setShowAddForm(false)
              setEditingEvent(null)
            }} />

            <Card className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-heading">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingEvent(null)
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="e.g., Speechcraft Workshop, Table Topics Contest"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="Describe the event, what participants can expect, and any special requirements"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Start Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
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
                    placeholder="Physical address or online meeting link"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="Club Meeting">Club Meeting</option>
                      <option value="Contest">Contest</option>
                      <option value="Training">Training</option>
                      <option value="Social">Social</option>
                      <option value="Open House">Open House</option>
                      <option value="Conference">Conference</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost (Optional)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.cost || ''}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value ? Number(e.target.value) : null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                      placeholder="Leave blank for free event"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Attendees (Optional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.max_attendees || ''}
                      onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value ? Number(e.target.value) : null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                      placeholder="Leave blank for unlimited"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Contact
                  </label>
                  <input
                    type="email"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.registration_deadline}
                    onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_public"
                      checked={formData.is_public}
                      onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                      className="rounded border-gray-300 text-loyal focus:ring-loyal"
                    />
                    <label htmlFor="is_public" className="text-sm font-medium text-gray-700">
                      Public Event (visible to non-members)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="registration_required"
                      checked={formData.registration_required}
                      onChange={(e) => setFormData({ ...formData, registration_required: e.target.checked })}
                      className="rounded border-gray-300 text-loyal focus:ring-loyal"
                    />
                    <label htmlFor="registration_required" className="text-sm font-medium text-gray-700">
                      Registration Required
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingEvent(null)
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