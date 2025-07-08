// Fixed admin dashboard with proper union type handling
'use client'

import { useDashboard } from '@/lib/hooks/use-dashboard'
import { Card, Loading, Badge } from '@/components/ui'
import Link from 'next/link'

export default function AdminDashboard() {
  const { stats, recentActivity, upcomingItems, loading } = useDashboard()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Members',
      value: stats.members,
      change: '+2 this month',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Active Officers',
      value: stats.activeOfficers,
      change: 'All positions filled',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: 'Completed Speeches',
      value: stats.completedSpeeches,
      change: '+5 this month',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: 'Upcoming Events',
      value: upcomingItems.length,
      change: 'Next 30 days',
      changeType: 'neutral',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  // Helper function to get display title based on item type
  const getItemTitle = (item: typeof upcomingItems[0]) => {
    return item.itemType === 'meeting' ? (item as any).theme || 'Meeting' : (item as any).title
  }

  // Helper function to get display type based on item type
  const getItemType = (item: typeof upcomingItems[0]) => {
    return item.itemType === 'meeting' ? (item as any).type : (item as any).type
  }

  // Helper function to get time display
  const getItemTime = (item: typeof upcomingItems[0]) => {
    if (item.itemType === 'meeting') {
      return (item as any).time || '7:00 PM'
    } else {
      return (item as any).start_time || '7:00 PM'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-hero-loyal text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-gray-200">
          Manage your Toastmasters club efficiently with real-time insights and quick actions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-loyal text-white rounded-md flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' :
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-heading text-gray-900">Recent Activity</h3>
            <Link href="/admin/analytics" className="text-sm text-loyal hover:text-blissful-blue">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'meeting' ? 'bg-loyal' : 'bg-maroon'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={activity.type === 'meeting' ? 'primary' : 'secondary'} size="sm">
                    {activity.type}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No recent activity</p>
                <Link href="/admin/meetings" className="text-loyal hover:text-blissful-blue text-sm">
                  Schedule a meeting
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Upcoming Items */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-heading text-gray-900">Upcoming</h3>
            <Link href="/admin/meetings" className="text-sm text-loyal hover:text-blissful-blue">
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingItems.length > 0 ? (
              upcomingItems.map((item) => (
                <div key={`${item.id}-upcoming`} className="flex items-center justify-between p-3 bg-fair-gray rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {getItemTitle(item)}
                      </h4>
                      <Badge variant="info" size="sm">
                        {getItemType(item)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.date).toLocaleDateString()} at {getItemTime(item)}
                    </p>
                  </div>
                  <button className="text-loyal hover:text-blissful-blue">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No upcoming items</p>
                <Link href="/admin/events" className="text-loyal hover:text-blissful-blue text-sm">
                  Create an event
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold font-heading text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Add Member',
              description: 'Register new club member',
              href: '/admin/members?action=add',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )
            },
            {
              title: 'Schedule Meeting',
              description: 'Plan next club meeting',
              href: '/admin/meetings?action=create',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )
            },
            {
              title: 'Create Event',
              description: 'Organize club event',
              href: '/admin/events?action=create',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )
            },
            {
              title: 'View Reports',
              description: 'Club analytics & insights',
              href: '/admin/analytics',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            }
          ].map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group p-4 border border-gray-200 rounded-lg hover:border-loyal hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-fair-gray group-hover:bg-loyal group-hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-loyal">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}