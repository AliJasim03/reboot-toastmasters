import { Hero } from '@/components/sections/hero'
import { MeetingCard } from '@/components/sections/meeting-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { meetings } from '@/lib/data/meetings'
import { clubInfo } from '@/lib/data/club-info'
import { Calendar, Users, Award, ArrowRight, Target, Heart, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const upcomingMeetings = meetings.filter(meeting => meeting.status === 'Scheduled').slice(0, 3)
  const recentMeetings = meetings.filter(meeting => meeting.status === 'Completed').slice(0, 2)

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Upcoming Meetings Section */}
        <section className="py-16 bg-cool-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Calendar className="h-4 w-4 mr-1" />
                Upcoming Events
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Join Our Next Meetings
              </h2>
              <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
                Experience the supportive environment where communication and leadership skills flourish.
                Every meeting is an opportunity to grow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {upcomingMeetings.map((meeting, index) => (
                  <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      variant={index === 0 ? 'featured' : 'default'}
                  />
              ))}
            </div>

            <div className="text-center">
              <Link href="/meetings">
                <Button size="lg">
                  View All Meetings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Club Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                Why Choose Excellence Speakers?
              </h2>
              <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
                We believe in creating an environment where every member can thrive and reach their full potential.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-loyal-blue mb-3">Focused Growth</h3>
                <p className="text-cool-gray-600">
                  Structured learning paths through Toastmasters Pathways program,
                  helping you achieve specific communication and leadership goals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-loyal-blue" />
                </div>
                <h3 className="text-xl font-semibold text-loyal-blue mb-3">Supportive Community</h3>
                <p className="text-cool-gray-600">
                  A welcoming environment where members encourage each other,
                  celebrate successes, and provide constructive feedback for improvement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-loyal-blue mb-3">Practical Skills</h3>
                <p className="text-cool-gray-600">
                  Real-world communication and leadership skills that you can immediately
                  apply in your personal and professional life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Meetings Section */}
        <section className="py-16 bg-cool-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="accent">
                <Award className="h-4 w-4 mr-1" />
                Recent Highlights
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
                See What We've Accomplished
              </h2>
              <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
                Take a look at our recent meetings and see the amazing growth happening in our club.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {recentMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/meetings">
                <Button variant="secondary" size="lg">
                  View Meeting History
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Club Stats Section */}
        <section className="py-16 bg-loyal-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Club by the Numbers
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Excellence Speakers continues to grow and achieve new milestones each year.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-happy-yellow mb-2">
                  {clubInfo.clubStats.totalMembers}
                </div>
                <div className="text-blue-200">Active Members</div>
              </div>

              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-happy-yellow mb-2">
                  {clubInfo.clubStats.meetingsThisYear}
                </div>
                <div className="text-blue-200">Meetings This Year</div>
              </div>

              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-happy-yellow mb-2">
                  {clubInfo.clubStats.averageAttendance}
                </div>
                <div className="text-blue-200">Average Attendance</div>
              </div>

              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-happy-yellow mb-2">
                  {clubInfo.clubStats.distinguishedClubProgram.pointsEarned}
                </div>
                <div className="text-blue-200">DCP Points</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Badge variant="accent" className="text-base px-4 py-2">
                {clubInfo.clubStats.distinguishedClubProgram.status}
              </Badge>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-cool-gray-600 mb-8 max-w-2xl mx-auto">
              Join Excellence Speakers Toastmasters Club and discover your potential.
              Attend as a guest and experience our supportive community firsthand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="xl">
                  Attend as Guest
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="xl" variant="secondary">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-sm text-cool-gray-500">
              <p>First-time guests attend free • No registration required • Just show up!</p>
            </div>
          </div>
        </section>
      </div>
  )
}