// src/app/admin/members/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useMembers } from '@/lib/hooks/useMembers'
import { memberOps } from '@/lib/supabase'
import { Card, Button, Badge, Loading, Alert } from '@/components/ui'
import type { Member, MembershipStatus, PathwaysPath } from '@/lib/database.types'

export default function AdminMembersPage() {
  const [filters, setFilters] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { members, loading, error, refreshMembers } = useMembers(filters)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membership_status: 'Active' as MembershipStatus,
    pathways_path: 'Leadership Development' as PathwaysPath,
    pathways_level: 1,
    join_date: new Date().toISOString().split('T')[0],
    bio: '',
    roles: []
  })

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name || '',
        email: editingMember.email || '',
        phone: editingMember.phone || '',
        membership_status: editingMember.membership_status || 'Active',
        pathways_path: editingMember.pathways_path || 'Leadership Development',
        pathways_level: editingMember.pathways_level || 1,
        join_date: editingMember.join_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        bio: editingMember.bio || '',
        roles: editingMember.roles || []
      })
    }
  }, [editingMember])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      if (editingMember) {
        const { error } = await memberOps.update(editingMember.id, formData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Member updated successfully!' })
        setEditingMember(null)
      } else {
        const { error } = await memberOps.create(formData)
        if (error) throw new Error(error.message)
        setMessage({ type: 'success', text: 'Member added successfully!' })
        setShowAddForm(false)
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        membership_status: 'Active',
        pathways_path: 'Leadership Development',
        pathways_level: 1,
        join_date: new Date().toISOString().split('T')[0],
        bio: '',
        roles: []
      })

      refreshMembers()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save member'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to delete ${memberName}? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await memberOps.delete(memberId)
      if (error) throw new Error(error.message)
      setMessage({ type: 'success', text: 'Member deleted successfully!' })
      refreshMembers()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete member'
      })
    }
  }

  const getStatusColor = (status: MembershipStatus) => {
    const colors = {
      'Active': 'success',
      'Inactive': 'warning',
      'Suspended': 'danger',
      'Former': 'info'
    } as const
    return colors[status] || 'info'
  }

  const getPathwaysBadgeColor = (path: PathwaysPath) => {
    const colors = {
      'Leadership Development': 'bg-blue-100 text-blue-800',
      'Presentation Mastery': 'bg-red-100 text-red-800',
      'Persuasive Influence': 'bg-purple-100 text-purple-800',
      'Engaging Humor': 'bg-yellow-100 text-yellow-800',
      'Strategic Relationships': 'bg-teal-100 text-teal-800',
      'Team Collaboration': 'bg-cyan-100 text-cyan-800',
      'Innovative Planning': 'bg-indigo-100 text-indigo-800',
      'Visionary Communication': 'bg-emerald-100 text-emerald-800'
    }
    return colors[path] || 'bg-gray-100 text-gray-800'
  }

  if (loading && !members.length) {
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
          <h1 className="text-2xl font-bold font-heading text-gray-900">Members Management</h1>
          <p className="text-gray-600">Manage club members, officers, and their progress</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="primary"
        >
          Add Member
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
          Error loading members: {error}
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Former">Former</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pathways Level</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, pathwaysLevel: e.target.value ? Number(e.target.value) : undefined })}
            >
              <option value="">All Levels</option>
              {[1, 2, 3, 4, 5].map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Officers Only</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
              onChange={(e) => setFilters({ ...filters, isOfficer: e.target.value === 'true' ? true : undefined })}
            >
              <option value="">All Members</option>
              <option value="true">Officers Only</option>
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

      {/* Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="hover-lift">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-loyal rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {member.name?.split(' ').map(n => n[0]).join('') || 'M'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{member.email}</p>
                </div>
              </div>
              <Badge variant={getStatusColor(member.membership_status)} size="sm">
                {member.membership_status}
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pathways:</span>
                <span className={`px-2 py-1 rounded text-xs ${getPathwaysBadgeColor(member.pathways_path)}`}>
                  {member.pathways_path}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Level:</span>
                <span className="font-medium">Level {member.pathways_level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Speeches:</span>
                <span className="font-medium">{member.completed_speeches || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Joined:</span>
                <span className="font-medium">
                  {member.join_date ? new Date(member.join_date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>

            {Array.isArray(member.roles) && member.roles.some((role: any) => role.isActive && role.role !== 'Member') && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {member.roles.filter((role: any) => role.isActive && role.role !== 'Member').map((role: any, idx: number) => (
                    <Badge key={idx} variant="secondary" size="sm">
                      {role.role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingMember(member)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(member.id, member.name)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {members.length === 0 && !loading && (
        <Card className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first club member.</p>
          <Button onClick={() => setShowAddForm(true)}>
            Add First Member
          </Button>
        </Card>
      )}

      {/* Add/Edit Member Modal */}
      {(showAddForm || editingMember) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => {
              setShowAddForm(false)
              setEditingMember(null)
            }} />

            <Card className="relative w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-heading">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMember(null)
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.membership_status}
                      onChange={(e) => setFormData({ ...formData, membership_status: e.target.value as MembershipStatus })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Former">Former</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date
                    </label>
                    <input
                      type="date"
                      value={formData.join_date}
                      onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pathways Path
                  </label>
                  <select
                    value={formData.pathways_path}
                    onChange={(e) => setFormData({ ...formData, pathways_path: e.target.value as PathwaysPath })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  >
                    <option value="Leadership Development">Leadership Development</option>
                    <option value="Presentation Mastery">Presentation Mastery</option>
                    <option value="Persuasive Influence">Persuasive Influence</option>
                    <option value="Engaging Humor">Engaging Humor</option>
                    <option value="Strategic Relationships">Strategic Relationships</option>
                    <option value="Team Collaboration">Team Collaboration</option>
                    <option value="Innovative Planning">Innovative Planning</option>
                    <option value="Visionary Communication">Visionary Communication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pathways Level
                  </label>
                  <select
                    value={formData.pathways_level}
                    onChange={(e) => setFormData({ ...formData, pathways_level: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                  >
                    {[1, 2, 3, 4, 5].map(level => (
                      <option key={level} value={level}>Level {level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal"
                    placeholder="Brief member bio..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingMember(null)
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