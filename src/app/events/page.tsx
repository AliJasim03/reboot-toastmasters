import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loading, SkeletonCard } from '@/components/ui/loading'
import { supabase } from '@/lib/supabase'
import { formatDate, formatTime } from '@/lib/utils'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Filter,
  Plus,
  Ticket,
  Award,
  Coffee,
  Briefcase,
  GraduationCap,
  Presentation
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Events | Excellence Speakers Toastmasters Club',
  description: 'Discover upcoming events, contests, workshops, and social gatherings at Excellence Speakers Toastmasters Club.',
}

// Mock events data since we don't have events in database yet
const mockEvents = [
  {
    id: 'event-1',
    title: 'Annual Speech Contest',
    description: 'Join us for our club\'s annual speech contest featuring prepared speeches and table topics competitions.',
    date: '2025-02-15',
    start_time: '14:00',
    end_time: '17:00',
    location: 'Community Center Main Hall',
    type: 'Contest',
    is_public: true,
    max_attendees: 100,
    current_attendees: 45,
    registration_required: true,
    registration_deadline: '2025-02-10',
    organizer: 'Contest Committee',
    cost: 0,
    status: 'Upcoming'
  },
  {
    id: 'event-2',
    title: 'Leadership Workshop: Building High-Performance Teams',
    description: 'Interactive workshop focused on developing leadership skills and team building strategies.',
    date: '2025-02-08',
    start_time: '09:00',
    end_time: '16:00',
    location: 'Business Development Center',
    type: 'Workshop',
    is_public: true,
    max_attendees: 30,
    current_attendees: 18,
    registration_required: true,
    registration_deadline: '2025-02-05',
    organizer: 'VP Education',
    cost: 25,
    status: 'Upcoming'
  },
  {
    id: 'event-3',
    title: 'New Member Orientation',
    description: 'Welcome session for new members to learn about Toastmasters programs and club procedures.',
    date: '2025-01-25',
    start_time: '10:00',
    end_time: '12:00',
    location: 'Community Learning Center',
    type: 'Training',
    is_public: false,
    max_attendees: 15,
    current_attendees: 8,
    registration_required: true,
    organizer: 'VP Membership',
    cost: 0,
    status: 'Upcoming'
  },
  {
    id: 'event-4',
    title: 'Club Social: Game Night',
    description: 'Casual evening of games, networking, and fun for members and their families.',
    date: '2025-01-18',
    start_time: '18:30',
    end_time: '21:00',
    location: 'Community Center Recreation Room',
    type: 'Social',
    is_public: false,
    max_attendees: 50,
    current_attendees: 32,
    registration_required: false,
    organizer: 'Social Committee',
    cost: 10,
    status: 'Completed'
  }
]

function EventCard({ event }: { event: any }) {
  const isUpcoming = event.status === 'Upcoming'
  const isPastEvent = event.status === 'Completed'
  const needsRegistration = event.registration_required && isUpcoming
  const isFull = event.max_attendees && event.current_attendees >= event.max_attendees

  const getEventIcon = () => {
    switch (event.type) {
      case 'Contest': return Award
      case 'Workshop': return Briefcase
      case 'Training': return GraduationCap
      case 'Social': return Coffee
      case 'Conference': return Presentation
      default: return Calendar
    }
  }

  const EventIcon = getEventIcon()

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Event Header */}
      <div className="aspect-video bg-gradient-to-br from-loyal-blue to-loyal-blue-700 relative p-6 flex items-center justify-center">
        <div className="text-center text-white">
          <EventIcon className="h-12 w-12 mx-auto mb-2" />
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {event.type}
          </Badge>
        </div>
        {!event.is_public && (
          <Badge className="absolute top-4 right-4 bg-happy-yellow text-loyal-blue">
            Members Only
          </Badge>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
          <Badge
            variant={isUpcoming ? 'accent' : isPastEvent ? 'secondary' : 'default'}
            className="ml-2 flex-shrink-0"
          >
            {event.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-cool-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-cool-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-cool-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {formatTime(event.start_time)} - {formatTime(event.end_time)}
          </div>
          <div className="flex items-center text-cool-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </div>

        {/* Attendance Info */}
        <div className="flex items-center justify-between pt-3 border-t border-cool-gray-200">
          <div className="flex items-center text-sm text-cool-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {event.current_attendees}
            {event.max_attendees && ` / ${event.max_attendees}`}
            {event.max_attendees ? ' attending' : ' registered'}
          </div>
          {event.cost > 0 && (
            <Badge variant="outline" className="text-xs">
              ${event.cost}
            </Badge>
          )}
          {event.cost === 0 && (
            <Badge variant="accent" className="text-xs">
              Free
            </Badge>
          )}
        </div>

        {/* Registration Status */}
        {needsRegistration && (
          <div className="text-xs text-cool-gray-500">
            Registration deadline: {formatDate(event.registration_deadline)}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {isPastEvent ? (
            <Link href={`/events/${event.id}`}>
              <Button variant="outline" className="w-full" size="sm">
                View Details
              </Button>
            </Link>
          ) : isFull ? (
            <Button variant="secondary" className="w-full" size="sm" disabled>
              Event Full
            </Button>
          ) : needsRegistration ? (
            <Link href={`/events/${event.id}`}>
              <Button className="w-full" size="sm">
                <Ticket className="mr-2 h-4 w-4" />
                Register Now
              </Button>
            </Link>
          ) : (
            <Link href={`/events/${event.id}`}>
              <Button variant="outline" className="w-full" size="sm">
                Learn More
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

async function EventsList() {
  // In a real implementation, you would fetch from Supabase:
  // const { data: events } = await supabase
  //   .from('events')
  //   .select('*')
  //   .order('date', { ascending: true })

  const events = mockEvents

  const upcomingEvents = events.filter(event => event.status === 'Upcoming')
  const pastEvents = events.filter(event => event.status === 'Completed')

  return (
    <div className="space-y-12">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Upcoming Events ({upcomingEvents.length})
              </h2>
              <p className="text-lg text-cool-gray-600">
                Don't miss these exciting upcoming events and opportunities.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Past Events
              </h2>
              <p className="text-lg text-cool-gray-600">
                Look back at our recent successful events and activities.
              </p>
            </div>
            <Button variant="secondary">
              View All Past Events
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* No Events */}
      {events.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-16 w-16 mx-auto text-cool-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-cool-gray-600 mb-2">
              No Events Scheduled
            </h3>
            <p className="text-cool-gray-500 mb-6">
              Check back soon for upcoming events and activities.
            </p>
            <Link href="/contact">
              <Button>
                Contact Us for Updates
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-happy-yellow text-loyal-blue">
              <Star className="h-4 w-4 mr-1" />
              Special Events
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Club Events & Activities
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Beyond our weekly meetings, we host special events, contests, workshops,
              and social gatherings to enhance your Toastmasters experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent">
                <Ticket className="mr-2 h-5 w-5" />
                Register for Events
              </Button>
              <Button size="lg" variant="secondary">
                <Filter className="mr-2 h-5 w-5" />
                Filter Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }
          >
            <EventsList />
          </Suspense>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Types of Events We Host
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Our diverse event calendar offers something for every member and interest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: 'Contests',
                icon: Award,
                description: 'Speech and evaluation contests at club, area, and district levels.',
                examples: ['Annual Speech Contest', 'Table Topics Contest', 'Evaluation Contest']
              },
              {
                type: 'Workshops',
                icon: Briefcase,
                description: 'Skill-building workshops on communication and leadership topics.',
                examples: ['Public Speaking Fundamentals', 'Leadership Skills', 'Presentation Design']
              },
              {
                type: 'Training Sessions',
                icon: GraduationCap,
                description: 'Educational sessions for members and officers.',
                examples: ['New Member Orientation', 'Officer Training', 'Pathways Overview']
              },
              {
                type: 'Social Events',
                icon: Coffee,
                description: 'Fun, informal gatherings to build community.',
                examples: ['Game Nights', 'Holiday Parties', 'Member Appreciation']
              },
              {
                type: 'Open Houses',
                icon: Users,
                description: 'Special events to welcome prospective members.',
                examples: ['Demo Meetings', 'Community Outreach', 'Guest Speaker Events']
              },
              {
                type: 'Conferences',
                icon: Presentation,
                description: 'District and regional educational conferences.',
                examples: ['Fall Conference', 'Spring Convention', 'TLI Sessions']
              }
            ].map((eventType, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-loyal-blue rounded-lg flex items-center justify-center mb-4">
                    <eventType.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{eventType.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cool-gray-600 mb-4">{eventType.description}</p>
                  <div>
                    <p className="text-sm font-medium text-loyal-blue mb-2">Examples:</p>
                    <ul className="text-sm text-cool-gray-600 space-y-1">
                      {eventType.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center">
                          <Star className="h-3 w-3 text-happy-yellow mr-2 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-loyal-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Don't Miss Out!
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Stay connected with Excellence Speakers to be the first to know about
            upcoming events, contests, and special opportunities.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Ticket className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Early Registration</h3>
              <p className="text-sm text-blue-200">Get priority access to events</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Contest Opportunities</h3>
              <p className="text-sm text-blue-200">Compete and showcase skills</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Networking</h3>
              <p className="text-sm text-blue-200">Connect with fellow speakers</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent">
                <Plus className="mr-2 h-5 w-5" />
                Join Our Events
              </Button>
            </Link>
            <Link href="/meetings">
              <Button size="xl" variant="secondary">
                Attend Regular Meetings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}