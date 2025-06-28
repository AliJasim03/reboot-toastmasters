import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loading, SkeletonMeetingCard } from '@/components/ui/loading'
import { MeetingCard } from '@/components/sections/meeting-card'
import { getMeetings, getUpcomingMeetings, getRecentMeetings } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Users, Plus, Filter } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Meetings | Excellence Speakers Toastmasters Club',
  description: 'View our upcoming and past meetings. Join us every Tuesday for an engaging Toastmasters experience.',
}

async function UpcomingMeetings() {
  const meetings = await getUpcomingMeetings()

  if (!meetings || meetings.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Calendar className="h-12 w-12 mx-auto text-cool-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-cool-gray-600 mb-2">
            No Upcoming Meetings
          </h3>
          <p className="text-cool-gray-500 mb-4">
            Check back soon for our next scheduled meeting.
          </p>
          <Link href="/contact">
            <Button variant="secondary">
              Contact Us for Schedule
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting, index) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          variant={index === 0 ? 'featured' : 'default'}
        />
      ))}
    </div>
  )
}

async function RecentMeetings() {
  const meetings = await getRecentMeetings()

  if (!meetings || meetings.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Users className="h-12 w-12 mx-auto text-cool-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-cool-gray-600 mb-2">
            No Recent Meetings
          </h3>
          <p className="text-cool-gray-500">
            Our meeting history will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}
    </div>
  )
}

export default function MeetingsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-happy-yellow text-loyal-blue">
              <Calendar className="h-4 w-4 mr-1" />
              Every Tuesday
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Meetings
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join us every Tuesday for an inspiring evening of communication, leadership,
              and personal growth in a supportive environment.
            </p>

            {/* Meeting Quick Info */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-6 max-w-2xl mx-auto mb-8">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Every Tuesday</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Community Center</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="accent">
                  Attend as Guest
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary">
                <Filter className="mr-2 h-5 w-5" />
                Filter Meetings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Upcoming Meetings
              </h2>
              <p className="text-lg text-cool-gray-600">
                Join us for these exciting upcoming meetings and events.
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonMeetingCard key={i} />
                ))}
              </div>
            }
          >
            <UpcomingMeetings />
          </Suspense>
        </div>
      </section>

      {/* Recent Meetings */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Recent Meetings
              </h2>
              <p className="text-lg text-cool-gray-600">
                Look back at our recent meetings and member achievements.
              </p>
            </div>
            <Link href="/meetings/archive">
              <Button variant="secondary">
                View All Meetings
              </Button>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonMeetingCard key={i} />
                ))}
              </div>
            }
          >
            <RecentMeetings />
          </Suspense>
        </div>
      </section>

      {/* Meeting Format */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Our meetings follow a structured format designed to maximize learning and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                time: '7:00 PM',
                title: 'Opening & Welcome',
                description: 'Meeting called to order, welcome guests, and opening ceremony.',
                duration: '5 min'
              },
              {
                time: '7:05 PM',
                title: 'Prepared Speeches',
                description: 'Members deliver prepared speeches based on their Pathways projects.',
                duration: '35 min'
              },
              {
                time: '7:40 PM',
                title: 'Table Topics',
                description: 'Impromptu speaking session to build quick thinking and speaking skills.',
                duration: '20 min'
              },
              {
                time: '8:00 PM',
                title: 'Evaluations & Close',
                description: 'Speech evaluations, reports, awards, and closing ceremony.',
                duration: '30 min'
              }
            ].map((segment, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="accent" className="text-xs">
                      {segment.time}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {segment.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{segment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cool-gray-600 text-sm">
                    {segment.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Information */}
      <section className="py-16 bg-loyal-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            First Time Visiting?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            We welcome guests to attend our meetings and experience Toastmasters firsthand.
            No registration required - just show up and discover what we're all about!
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Free for Guests</h3>
              <p className="text-sm text-blue-200">First visit is always free</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">90 Minutes</h3>
              <p className="text-sm text-blue-200">Structured, engaging format</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Easy to Find</h3>
              <p className="text-sm text-blue-200">Free parking available</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent">
                Get Directions
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="xl" variant="secondary">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}