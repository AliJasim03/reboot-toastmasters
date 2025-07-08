// src/app/admin/analytics/page.tsx
'use client'

import { useDashboard } from '@/lib/hooks/use-dashboard'
import { useClubStats } from '@/lib/hooks/use-clubStats'
import { Card, Loading, Badge } from '@/components/ui'

export default function AdminAnalyticsPage() {
  const { members, meetings, events, loading } = useDashboard()
  const { stats } = useClubStats()

  const calculateGrowthMetrics = () => {
    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    // Members growth
    const newMembersThisMonth = members.filter(member =>
      member.join_date && new Date(member.join_date) >= thisMonth
    ).length

    const newMembersLastMonth = members.filter(member =>
      member.join_date &&
      new Date(member.join_date) >= lastMonth &&
      new Date(member.join_date) < thisMonth
    ).length

    const memberGrowth = newMembersLastMonth > 0
      ? ((newMembersThisMonth - newMembersLastMonth) / newMembersLastMonth) * 100
      : newMembersThisMonth > 0 ? 100 : 0

    // Meeting attendance
    const recentMeetings = meetings.filter(meeting =>
      meeting.date && new Date(meeting.date) >= lastMonth
    )

    const avgAttendance = recentMeetings.length > 0
      ? recentMeetings.reduce((sum, meeting) => sum + (meeting.attendance || 0), 0) / recentMeetings.length
      : 0

    // Active participation
    const activeSpeakers = members.filter(member =>
      (member.pathways_level || 0) > 0
    ).length

    const participationRate = members.length > 0 ? (activeSpeakers / members.length) * 100 : 0

    return {
      memberGrowth,
      avgAttendance,
      participationRate,
      newMembersThisMonth,
      newMembersLastMonth
    }
  }

  const getPathwaysDistribution = () => {
    const pathwaysCounts: { [key: string]: number } = {}
    const levelsCounts: { [key: number]: number } = {}

    members.forEach(member => {
      if (member.pathways_level) {
        levelsCounts[member.pathways_level] = (levelsCounts[member.pathways_level] || 0) + 1
      }
    })

    return { pathwaysCounts, levelsCounts }
  }

  const getMeetingTrends = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return {
        month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        meetings: meetings.filter(meeting => {
          if (!meeting.date) return false
          const meetingDate = new Date(meeting.date)
          return meetingDate.getMonth() === date.getMonth() &&
            meetingDate.getFullYear() === date.getFullYear()
        }).length
      }
    }).reverse()

    return last6Months
  }

  const getTopContributors = () => {
    return members
      .filter(member => (member.pathways_level || 0) > 0)
      .sort((a, b) => (b.pathways_level || 0) - (a.pathways_level || 0))
      .slice(0, 5)
      .map(member => ({
        name: member.name,
        speeches: member.pathways_level || 0,
        level: member.pathways_level || 1,
        path: member.pathways_level
      }))
  }

  const metrics = calculateGrowthMetrics()
  const { pathwaysCounts, levelsCounts } = getPathwaysDistribution()
  const meetingTrends = getMeetingTrends()
  const topContributors = getTopContributors()

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-loyal mb-2">{stats.members}</div>
            <div className="text-sm text-gray-600 mb-1">Total Members</div>
            <div className={`text-xs ${metrics.memberGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.memberGrowth >= 0 ? '↗' : '↘'} {Math.abs(metrics.memberGrowth).toFixed(1)}% vs last month
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-maroon mb-2">{metrics.avgAttendance.toFixed(1)}</div>
            <div className="text-sm text-gray-600 mb-1">Avg Attendance</div>
            <div className="text-xs text-gray-500">Per meeting</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow text-rich-black mb-2">{metrics.participationRate.toFixed(0)}%</div>
            <div className="text-sm text-gray-600 mb-1">Participation Rate</div>
            <div className="text-xs text-gray-500">Members with speeches</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray mb-2">{stats.completedSpeeches}</div>
            <div className="text-sm text-gray-600 mb-1">Total Speeches</div>
            <div className="text-xs text-gray-500">All time</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pathways Distribution */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Pathways Distribution</h3>
          <div className="space-y-4">
            {Object.entries(pathwaysCounts).map(([path, count]) => {
              const percentage = members.length > 0 ? (count / members.length) * 100 : 0
              return (
                <div key={path}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{path}</span>
                    <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-loyal h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
            {Object.keys(pathwaysCounts).length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No pathway data available
              </div>
            )}
          </div>
        </Card>

        {/* Pathways Levels */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Pathways Levels</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(level => {
              const count = levelsCounts[level] || 0
              const percentage = members.length > 0 ? (count / members.length) * 100 : 0
              return (
                <div key={level}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Level {level}</span>
                    <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-maroon h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meeting Trends */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Meeting Trends (Last 6 Months)</h3>
          <div className="space-y-4">
            {meetingTrends.map((trend, index) => {
              const maxMeetings = Math.max(...meetingTrends.map(t => t.meetings), 1)
              const percentage = (trend.meetings / maxMeetings) * 100
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{trend.month}</span>
                    <span className="font-medium">{trend.meetings} meetings</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Top Contributors */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Top Contributors</h3>
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-fair-gray rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-loyal rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{contributor.name}</div>
                    <div className="text-sm text-gray-500">
                      {contributor.path} - Level {contributor.level}
                    </div>
                  </div>
                </div>
                <Badge variant="primary" size="sm">
                  {contributor.speeches} speeches
                </Badge>
              </div>
            ))}
            {topContributors.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No speech data available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Member Status Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Member Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Active', 'Inactive', 'Suspended', 'Former'].map(status => {
            const count = members.filter(member => member.membership_status === status).length
            const percentage = members.length > 0 ? (count / members.length) * 100 : 0
            const colorMap = {
              'Active': 'text-green-600 bg-green-100',
              'Inactive': 'text-yellow-600 bg-yellow-100',
              'Suspended': 'text-red-600 bg-red-100',
              'Former': 'text-gray-600 bg-gray-100'
            }

            return (
              <div key={status} className={`p-4 rounded-lg ${colorMap[status as keyof typeof colorMap]}`}>
                <div className="text-2xl font-bold mb-1">{count}</div>
                <div className="text-sm font-medium mb-1">{status} Members</div>
                <div className="text-xs">{percentage.toFixed(1)}% of total</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-loyal mb-2">{metrics.newMembersThisMonth}</div>
            <div className="text-sm text-gray-600">New Members This Month</div>
            <div className="text-xs text-gray-500 mt-1">
              vs {metrics.newMembersLastMonth} last month
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-maroon mb-2">
              {meetings.filter(m => m.status === 'Scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Upcoming Meetings</div>
            <div className="text-xs text-gray-500 mt-1">
              Scheduled for future
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow text-rich-black mb-2">
              {events.filter(e => e.status === 'Upcoming').length}
            </div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
            <div className="text-xs text-gray-500 mt-1">
              Planned events
            </div>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold font-heading text-gray-900">Export Data</h3>
            <p className="text-sm text-gray-600">Download reports for external analysis</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-loyal border border-loyal rounded-md hover:bg-loyal hover:text-white transition-colors">
              Export Members
            </button>
            <button className="px-4 py-2 text-sm font-medium text-loyal border border-loyal rounded-md hover:bg-loyal hover:text-white transition-colors">
              Export Meetings
            </button>
            <button className="px-4 py-2 text-sm font-medium text-loyal border border-loyal rounded-md hover:bg-loyal hover:text-white transition-colors">
              Export Analytics
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}