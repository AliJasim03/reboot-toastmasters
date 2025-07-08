'use client'

import { useUpcomingMeetings } from '@/lib/hooks/use-meetings'
import { Loading, Badge } from '@/components/ui'
import Link from 'next/link'

export const UpcomingMeetingsSection = () => {
  const { meetings, loading, error } = useUpcomingMeetings(3)

  if (loading) {
    return (
      <section className="py-16 bg-loyal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Loading size="md" />
          </div>
        </div>
      </section>
    )
  }

  if (error || meetings.length === 0) {
    return (
      <section className="py-16 bg-loyal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">
                Join Our Weekly Meetings
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                Every Tuesday evening, we gather to practice speaking, provide feedback, and support each other&#39;s growth.
                Our meetings are structured, fun, and welcoming to all skill levels.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Every Tuesday at 7:00 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Meeting Location TBD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>60-75 minutes per meeting</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 text-rich-black">
              <h3 className="font-heading font-bold text-xl text-loyal mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Prepared speeches (5-7 minutes)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Impromptu speaking practice (Table Topics)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Constructive feedback and evaluations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Leadership opportunities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Supportive, encouraging environment</span>
                </li>
              </ul>
              <Link
                href="/meetings"
                className="inline-block mt-6 bg-loyal hover:bg-blissful-blue text-white px-6 py-2 rounded-md font-semibold font-heading transition-colors"
              >
                View Meeting Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-loyal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Upcoming Meetings
          </h2>
          <p className="text-lg text-gray-200">
            Join us for our next meetings and see Toastmasters in action!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-lg p-6 text-rich-black hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="primary" size="sm">{meeting.type}</Badge>
                <span className="text-sm text-gray-500">
                  {new Date(meeting.date).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-loyal mb-2">
                {meeting.theme || 'Club Meeting'}
              </h3>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{meeting.date || '7:00 PM'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{meeting.location}</span>
                </div>
              </div>

              <Link
                href="/join"
                className="inline-block w-full text-center bg-maroon hover:bg-rich-maroon text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors"
              >
                Attend as Guest
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/meetings"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-loyal px-6 py-3 rounded-md font-semibold font-heading transition-colors"
          >
            View All Meetings
          </Link>
        </div>
      </div>
    </section>
  )
}