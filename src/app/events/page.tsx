// src/app/events/page.tsx
import Link from 'next/link'

export default function EventsPage() {
  // Sample data - this will be replaced with actual database data later
  const upcomingEvents = [
    {
      id: 1,
      title: 'Club Charter Ceremony',
      date: '2025-08-15',
      time: '6:00 PM',
      location: 'Community Center - Main Hall',
      type: 'Special Event',
      status: 'Upcoming',
      description: 'Celebrate the official chartering of Reboot Toastmasters Club with dinner, speeches, and recognition.',
      isPublic: true,
      registrationRequired: true,
      maxAttendees: 50,
      currentAttendees: 12,
      price: '$25',
      highlights: [
        'Charter ceremony presentation',
        'Dinner and networking',
        'Guest speakers',
        'Club recognition awards'
      ]
    },
    {
      id: 2,
      title: 'Table Topics Contest',
      date: '2025-07-22',
      time: '7:00 PM',
      location: 'Regular Meeting Location',
      type: 'Contest',
      status: 'Upcoming',
      description: 'Internal club contest for impromptu speaking skills. Winner advances to Area contest.',
      isPublic: true,
      registrationRequired: false,
      maxAttendees: null,
      currentAttendees: 8,
      price: 'Free',
      highlights: [
        'Impromptu speaking competition',
        'Open to all club members',
        'Winner advances to Area level',
        'Guests welcome to observe'
      ]
    },
    {
      id: 3,
      title: 'Speechcraft Workshop Series',
      date: '2025-09-10',
      time: '6:00 PM',
      location: 'Online via Zoom',
      type: 'Workshop',
      status: 'Upcoming',
      description: '4-week workshop series for non-members to experience Toastmasters methodology.',
      isPublic: true,
      registrationRequired: true,
      maxAttendees: 15,
      currentAttendees: 3,
      price: '$50',
      highlights: [
        '4-week series (Sept 10, 17, 24, Oct 1)',
        'Learn basic speaking skills',
        'Practice in supportive environment',
        'Certificate of completion'
      ]
    }
  ]

  const pastEvents = [
    {
      id: 1,
      title: 'Club Formation Meeting',
      date: '2025-06-15',
      type: 'Club Meeting',
      status: 'Completed',
      attendees: 12,
      highlights: [
        'Initial club planning session',
        'Officer role discussions',
        'Charter process overview',
        'First member signups'
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

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Contest': 'bg-red-100 text-red-800',
      'Workshop': 'bg-blue-100 text-blue-800',
      'Special Event': 'bg-purple-100 text-purple-800',
      'Social': 'bg-green-100 text-green-800',
      'Training': 'bg-yellow-100 text-yellow-800',
      'Club Meeting': 'bg-gray-100 text-gray-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Upcoming': 'bg-loyal text-white',
      'Ongoing': 'bg-yellow text-rich-black',
      'Completed': 'bg-gray text-white',
      'Cancelled': 'bg-red-500 text-white'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="bg-loyal-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Club Events</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Join us for special events, contests, workshops, and celebrations that enhance your Toastmasters experience.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-loyal mb-8 text-center">Upcoming Events</h2>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-fair-gray rounded-lg overflow-hidden shadow-md">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Event Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {event.status.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          {event.isPublic && (
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                              PUBLIC
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading font-bold text-2xl text-loyal mb-2">{event.title}</h3>
                        <p className="text-gray-700 mb-4">{event.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{event.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details Sidebar */}
                      <div className="lg:w-80">
                        <div className="bg-white rounded-lg p-6">
                          <h4 className="font-semibold text-maroon mb-3">Event Highlights</h4>
                          <ul className="space-y-2 text-sm">
                            {event.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-loyal">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          {event.maxAttendees && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Attendance:</span>
                                <span className="font-semibold">
                                  {event.currentAttendees} / {event.maxAttendees}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-loyal h-2 rounded-full"
                                  style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div className="mt-6 space-y-2">
                            {event.registrationRequired ? (
                              <button className="w-full bg-maroon hover:bg-rich-maroon text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors">
                                Register Now
                              </button>
                            ) : (
                              <Link
                                href="/join"
                                className="block w-full bg-loyal hover:bg-blissful-blue text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors text-center"
                              >
                                Attend Event
                              </Link>
                            )}
                            <button className="w-full border border-loyal text-loyal hover:bg-loyal hover:text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-fair-gray rounded-lg p-8 max-w-md mx-auto">
                <h3 className="font-heading font-bold text-xl text-loyal mb-4">More Events Coming Soon!</h3>
                <p className="text-gray-700 mb-6">
                  We're planning exciting events for our club members and the community. Stay tuned!
                </p>
                <Link
                  href="/join"
                  className="inline-block bg-maroon hover:bg-rich-maroon text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors"
                >
                  Join Our Club
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 bg-fair-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Types of Events</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Throughout the year, we host various events designed to enhance your Toastmasters experience and connect with the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                type: 'Contests',
                icon: '🏆',
                description: 'Speech and evaluation contests where members compete and advance to higher levels.',
                examples: ['Table Topics Contest', 'International Speech Contest', 'Humorous Speech Contest', 'Evaluation Contest']
              },
              {
                type: 'Workshops',
                icon: '🎓',
                description: 'Educational sessions to develop specific skills and attract new members.',
                examples: ['Speechcraft', 'Leadership Training', 'Public Speaking Basics', 'Presentation Skills']
              },
              {
                type: 'Social Events',
                icon: '🎉',
                description: 'Fun gatherings to build relationships and celebrate achievements.',
                examples: ['Charter Night', 'Holiday Party', 'Member Recognition', 'Networking Mixers']
              },
              {
                type: 'Open Houses',
                icon: '🚪',
                description: 'Special meetings designed to welcome guests and showcase our club.',
                examples: ['Demonstration Meetings', 'Guest Speaker Events', 'Club Showcases', 'Community Outreach']
              },
              {
                type: 'Training',
                icon: '📚',
                description: 'Officer training and member development sessions.',
                examples: ['Officer Training', 'Pathways Training', 'Mentoring Workshops', 'Leadership Skills']
              },
              {
                type: 'Special Meetings',
                icon: '⭐',
                description: 'Themed meetings and special occasions throughout the year.',
                examples: ['Founder\'s Day', 'International Day', 'Career Development', 'Youth Programs']
              }
            ].map((eventType, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4 text-center">{eventType.icon}</div>
                <h3 className="font-heading font-bold text-xl text-loyal mb-3 text-center">{eventType.type}</h3>
                <p className="text-gray-700 mb-4 text-center">{eventType.description}</p>
                <div>
                  <h4 className="font-semibold text-sm text-maroon mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {eventType.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-loyal">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-loyal mb-8 text-center">Past Events</h2>

          {pastEvents.length > 0 ? (
            <div className="space-y-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-fair-gray rounded-lg p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(event.status)}`}>
                          {event.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-loyal mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Attendees:</span> {event.attendees}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-maroon mb-3">Event Highlights</h4>
                      <ul className="space-y-1">
                        {event.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-loyal">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Our event history is just beginning! Check back for updates on our exciting events.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Planning CTA */}
      <section className="py-16 bg-loyal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Want to Help Plan Events?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Event planning is a great way to develop your organizational and leadership skills while serving the club.
            Join our events committee and help create memorable experiences for our members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-block rounded-md bg-yellow hover:bg-yellow text-rich-black px-8 py-3 font-bold font-heading shadow-lg transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-md border-2 border-white text-white hover:bg-white hover:text-loyal px-8 py-3 font-semibold font-heading transition-colors"
            >
              Learn About Leadership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}