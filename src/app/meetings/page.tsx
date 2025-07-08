// src/app/meetings/page.tsx
import Link from 'next/link'

export default function MeetingsPage() {
  // Sample data - this will be replaced with actual database data later
  const upcomingMeetings = [
    {
      id: 1,
      date: '2025-07-08',
      time: '7:00 PM',
      theme: 'New Beginnings',
      location: 'Meeting Location TBD',
      status: 'Scheduled',
      toastmaster: 'TBD',
      tableTopics: 'TBD',
      speeches: [
        { speaker: 'TBD', title: 'Ice Breaker', project: 'Pathways - Level 1' },
        { speaker: 'TBD', title: 'Speech Title TBD', project: 'Pathways - Level 2' }
      ]
    },
    {
      id: 2,
      date: '2025-07-15',
      time: '7:00 PM',
      theme: 'Innovation and Change',
      location: 'Meeting Location TBD',
      status: 'Scheduled',
      toastmaster: 'TBD',
      tableTopics: 'TBD',
      speeches: [
        { speaker: 'TBD', title: 'Speech Title TBD', project: 'Pathways - Level 3' }
      ]
    }
  ]

  const recentMeetings = [
    {
      id: 1,
      date: '2025-07-01',
      theme: 'Welcome to Toastmasters',
      status: 'Completed',
      attendees: 8,
      highlights: [
        'Club inaugural meeting planning session',
        'Introduction to Toastmasters methodology',
        'Officer roles discussion'
      ]
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="bg-loyal-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Club Meetings</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Join us every Tuesday evening for structured learning, practice, and fun in a supportive environment.
          </p>
        </div>
      </section>

      {/* Meeting Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Regular Meeting Schedule</h2>
            <div className="bg-fair-gray rounded-lg p-6 max-w-md mx-auto">
              <div className="text-2xl font-bold text-maroon mb-2">Every Tuesday</div>
              <div className="text-lg text-gray-700 mb-1">7:00 PM - 8:15 PM</div>
              <div className="text-gray-600">Meeting Location TBD</div>
              <div className="mt-4 text-sm text-gray-500">
                Duration: 60-75 minutes
              </div>
            </div>
          </div>

          {/* Meeting Format */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-fair-gray rounded-lg">
              <div className="w-16 h-16 bg-loyal rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-loyal mb-2">Opening & Education</h3>
              <p className="text-gray-600 text-sm">
                Meeting opening, Toastmaster introduction, and educational segment (10-15 minutes)
              </p>
            </div>

            <div className="text-center p-6 bg-fair-gray rounded-lg">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-maroon mb-2">Prepared Speeches</h3>
              <p className="text-gray-600 text-sm">
                2-3 prepared speeches (5-7 minutes each) with evaluations and feedback (30-40 minutes)
              </p>
            </div>

            <div className="text-center p-6 bg-fair-gray rounded-lg">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rich-black font-bold text-lg">3</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-rich-black mb-2">Table Topics & Closing</h3>
              <p className="text-gray-600 text-sm">
                Impromptu speaking practice, reports, and meeting wrap-up (15-20 minutes)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section className="py-16 bg-fair-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-loyal mb-8 text-center">Upcoming Meetings</h2>

          <div className="space-y-6">
            {upcomingMeetings.map((meeting, index) => (
              <div key={meeting.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Meeting Info */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-loyal text-white px-2 py-1 rounded text-xs font-semibold">UPCOMING</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-loyal mb-2">{meeting.theme}</h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{formatDate(meeting.date)}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{meeting.time}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{meeting.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Meeting Roles */}
                  <div>
                    <h4 className="font-semibold text-maroon mb-3">Meeting Roles</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Toastmaster:</span>
                        <span className="font-medium">{meeting.toastmaster}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Table Topics Master:</span>
                        <span className="font-medium">{meeting.tableTopics}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">General Evaluator:</span>
                        <span className="font-medium">TBD</span>
                      </div>
                    </div>
                  </div>

                  {/* Speeches */}
                  <div>
                    <h4 className="font-semibold text-maroon mb-3">Prepared Speeches</h4>
                    <div className="space-y-3">
                      {meeting.speeches.map((speech, idx) => (
                        <div key={idx} className="border-l-3 border-yellow pl-3">
                          <div className="font-medium text-sm">{speech.title}</div>
                          <div className="text-xs text-gray-600">{speech.speaker}</div>
                          <div className="text-xs text-gray-500">{speech.project}</div>
                        </div>
                      ))}
                      {meeting.speeches.length === 0 && (
                        <p className="text-gray-500 text-sm italic">No speeches scheduled yet</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/join"
                    className="bg-loyal hover:bg-blissful-blue text-white px-4 py-2 rounded-md text-sm font-semibold font-heading transition-colors text-center"
                  >
                    Attend as Guest
                  </Link>
                  <button className="border border-maroon text-maroon hover:bg-maroon hover:text-white px-4 py-2 rounded-md text-sm font-semibold font-heading transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Meetings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-loyal mb-8 text-center">Recent Meetings</h2>

          <div className="space-y-6">
            {recentMeetings.map((meeting, index) => (
              <div key={meeting.id} className="bg-fair-gray rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-gray text-white px-2 py-1 rounded text-xs font-semibold">COMPLETED</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-loyal mb-2">{meeting.theme}</h3>
                    <p className="text-gray-600 mb-2">{formatDate(meeting.date)}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Attendees:</span> {meeting.attendees}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-maroon mb-3">Meeting Highlights</h4>
                    <ul className="space-y-1">
                      {meeting.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                          <span className="text-maroon">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recentMeetings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No completed meetings yet. Our journey is just beginning!</p>
            </div>
          )}
        </div>
      </section>

      {/* Meeting Participation Guide */}
      <section className="py-16 bg-loyal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">How to Participate</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Whether you're a guest or a member, here's how you can get involved in our meetings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 text-rich-black">
              <h3 className="font-heading font-bold text-xl text-loyal mb-4">For Guests</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Arrive 10 minutes early for a warm welcome</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Participate in Table Topics (optional but encouraged)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Ask questions during the break</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Stay for networking after the meeting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-rich-black">
              <h3 className="font-heading font-bold text-xl text-loyal mb-4">For Members</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Sign up for speaking opportunities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Volunteer for meeting roles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Provide constructive feedback</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-maroon">✓</span>
                  <span>Support fellow members' growth</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/join"
              className="inline-block bg-yellow hover:bg-yellow text-rich-black px-8 py-3 rounded-md font-bold font-heading transition-colors"
            >
              Join Our Next Meeting
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}