// src/app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { Card, Button, Alert } from '@/components/ui'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('club')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [clubSettings, setClubSettings] = useState({
    name: 'Reboot Toastmasters Club',
    charter_number: '',
    charter_date: '',
    district: '',
    area: '',
    division: '',
    meeting_day: 'Tuesday',
    meeting_time: '19:00',
    meeting_location: 'Meeting Location TBD',
    meeting_timezone: 'America/New_York',
    website: 'https://reboot-toastmasters.org',
    email: 'info@excellence-speakers.org',
    phone: '',
    description: 'Where Leaders Are Made - Join Reboot Toastmasters Club for public speaking, leadership development, and personal growth in a supportive environment.',
    social_facebook: '',
    social_linkedin: '',
    social_twitter: '',
    social_instagram: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email_reminders: true,
    meeting_reminders: true,
    event_notifications: true,
    member_updates: true,
    officer_reports: true,
    reminder_days_before: 3,
    digest_frequency: 'weekly'
  })

  const [privacySettings, setPrivacySettings] = useState({
    public_member_directory: false,
    public_meeting_schedule: true,
    public_events: true,
    allow_guest_rsvp: true,
    require_member_approval: true,
    show_member_photos: false,
    show_pathways_progress: true
  })

  const handleSaveClub = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Club settings saved successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save club settings' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Notification settings saved successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save notification settings' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSavePrivacy = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Privacy settings saved successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save privacy settings' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: 'club', name: 'Club Information', icon: '🏛️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy & Visibility', icon: '🔒' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'backup', name: 'Backup & Export', icon: '💾' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your club settings and preferences</p>
      </div>

      {/* Message */}
      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-loyal text-loyal'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Club Information Tab */}
      {activeTab === 'club' && (
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Club Information</h3>
          <form onSubmit={handleSaveClub} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Club Name *
                </label>
                <input
                  type="text"
                  required
                  value={clubSettings.name}
                  onChange={(e) => setClubSettings({ ...clubSettings, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charter Number
                </label>
                <input
                  type="text"
                  value={clubSettings.charter_number}
                  onChange={(e) => setClubSettings({ ...clubSettings, charter_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  placeholder="TBD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charter Date
                </label>
                <input
                  type="date"
                  value={clubSettings.charter_date}
                  onChange={(e) => setClubSettings({ ...clubSettings, charter_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={clubSettings.district}
                  onChange={(e) => setClubSettings({ ...clubSettings, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  placeholder="TBD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  value={clubSettings.area}
                  onChange={(e) => setClubSettings({ ...clubSettings, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  placeholder="TBD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Division
                </label>
                <input
                  type="text"
                  value={clubSettings.division}
                  onChange={(e) => setClubSettings({ ...clubSettings, division: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  placeholder="TBD"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Day
                </label>
                <select
                  value={clubSettings.meeting_day}
                  onChange={(e) => setClubSettings({ ...clubSettings, meeting_day: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Time
                </label>
                <input
                  type="time"
                  value={clubSettings.meeting_time}
                  onChange={(e) => setClubSettings({ ...clubSettings, meeting_time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={clubSettings.meeting_timezone}
                  onChange={(e) => setClubSettings({ ...clubSettings, meeting_timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Location
              </label>
              <input
                type="text"
                value={clubSettings.meeting_location}
                onChange={(e) => setClubSettings({ ...clubSettings, meeting_location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                placeholder="Physical address or virtual meeting link"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Club Description
              </label>
              <textarea
                rows={4}
                value={clubSettings.description}
                onChange={(e) => setClubSettings({ ...clubSettings, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                placeholder="Brief description of your club"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={clubSettings.email}
                  onChange={(e) => setClubSettings({ ...clubSettings, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={clubSettings.phone}
                  onChange={(e) => setClubSettings({ ...clubSettings, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                />
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Social Media</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook Page
                  </label>
                  <input
                    type="url"
                    value={clubSettings.social_facebook}
                    onChange={(e) => setClubSettings({ ...clubSettings, social_facebook: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="https://facebook.com/your-club"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Page
                  </label>
                  <input
                    type="url"
                    value={clubSettings.social_linkedin}
                    onChange={(e) => setClubSettings({ ...clubSettings, social_linkedin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="https://linkedin.com/company/your-club"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Club Settings'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Notification Settings</h3>
          <form onSubmit={handleSaveNotifications} className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-3">
                {[
                  { key: 'email_reminders', label: 'Email Reminders', description: 'General email notifications' },
                  { key: 'meeting_reminders', label: 'Meeting Reminders', description: 'Notifications before meetings' },
                  { key: 'event_notifications', label: 'Event Notifications', description: 'Updates about club events' },
                  { key: 'member_updates', label: 'Member Updates', description: 'When members join or leave' },
                  { key: 'officer_reports', label: 'Officer Reports', description: 'Monthly officer reports' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        [setting.key]: e.target.checked
                      })}
                      className="mt-1 rounded border-gray-300 text-loyal focus:ring-loyal"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{setting.label}</div>
                      <div className="text-xs text-gray-500">{setting.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reminder Days Before Meeting
                </label>
                <select
                  value={notificationSettings.reminder_days_before}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    reminder_days_before: Number(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                >
                  <option value={1}>1 day</option>
                  <option value={2}>2 days</option>
                  <option value={3}>3 days</option>
                  <option value={7}>1 week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Digest Frequency
                </label>
                <select
                  value={notificationSettings.digest_frequency}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    digest_frequency: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Privacy & Visibility Settings</h3>
          <form onSubmit={handleSavePrivacy} className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Public Visibility</h4>
              <div className="space-y-3">
                {[
                  { key: 'public_member_directory', label: 'Public Member Directory', description: 'Show member list to website visitors' },
                  { key: 'public_meeting_schedule', label: 'Public Meeting Schedule', description: 'Display meeting times publicly' },
                  { key: 'public_events', label: 'Public Events', description: 'Show events to non-members' },
                  { key: 'allow_guest_rsvp', label: 'Allow Guest RSVP', description: 'Let guests RSVP for meetings' },
                  { key: 'show_member_photos', label: 'Show Member Photos', description: 'Display member profile photos' },
                  { key: 'show_pathways_progress', label: 'Show Pathways Progress', description: 'Display member education progress' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={privacySettings[setting.key as keyof typeof privacySettings] as boolean}
                      onChange={(e) => setPrivacySettings({
                        ...privacySettings,
                        [setting.key]: e.target.checked
                      })}
                      className="mt-1 rounded border-gray-300 text-loyal focus:ring-loyal"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{setting.label}</div>
                      <div className="text-xs text-gray-500">{setting.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Privacy Settings'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Integrations</h3>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">Zoom Integration</h4>
                  <p className="text-sm text-gray-600">Connect your Zoom account for automatic meeting links</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">Google Calendar</h4>
                  <p className="text-sm text-gray-600">Sync meetings with Google Calendar</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">Mailchimp</h4>
                  <p className="text-sm text-gray-600">Sync member list with Mailchimp for newsletters</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Backup & Export</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Data Export</h4>
              <p className="text-sm text-gray-600 mb-4">
                Export your club data for backup or migration purposes. All exports are in CSV format.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  Export Members
                </Button>
                <Button variant="outline" className="w-full">
                  Export Meetings
                </Button>
                <Button variant="outline" className="w-full">
                  Export Events
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Complete Backup</h4>
              <p className="text-sm text-gray-600 mb-4">
                Download a complete backup of all your club data including settings.
              </p>
              <Button variant="primary">
                Create Full Backup
              </Button>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-md font-semibold text-red-600 mb-4">Danger Zone</h4>
              <p className="text-sm text-gray-600 mb-4">
                These actions are irreversible. Please be certain before proceeding.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                  Reset All Settings
                </Button>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                  Delete All Data
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}