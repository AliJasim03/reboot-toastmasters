import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loading } from '@/components/ui/loading'
import { supabase } from '@/lib/supabase'
import {
  Users,
  Award,
  Target,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Star,
  Crown,
  Lightbulb,
  TrendingUp,
  MessageCircle,
  Handshake
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'About Us | Excellence Speakers Toastmasters Club',
  description: 'Learn about Excellence Speakers Toastmasters Club - our mission, values, history, and the amazing community that makes us special.',
}

// Get officers from database
async function getOfficers() {
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .eq('membership_status', 'Active')
    .order('name')

  if (error) {
    console.error('Error fetching officers:', error)
    return []
  }

  // Filter members who have officer roles
  const officers = members?.filter(member => {
    const roles = Array.isArray(member.roles) ? member.roles : []
    return roles.some((role: any) => role.isActive && role.role !== 'Member')
  }) || []

  return officers
}

async function OfficersSection() {
  const officers = await getOfficers()

  // DEV ONLY: Fallback data for styling purposes when DB is empty
  const devOfficers = officers.length === 0 ? [
    {
      id: 'dev-1',
      name: 'Sarah Johnson',
      roles: [{ role: 'President', isActive: true }],
      bio: 'Leading our club with passion for 2 years. DTM with focus on leadership development.',
      pathways_level: 5,
      awards: ['DTM', 'ALB', 'ALS']
    },
    {
      id: 'dev-2',
      name: 'Michael Chen',
      roles: [{ role: 'VP Education', isActive: true }],
      bio: 'Dedicated to creating engaging educational programs that challenge and inspire.',
      pathways_level: 4,
      awards: ['CC', 'CL', 'ACB']
    },
    {
      id: 'dev-3',
      name: 'Emily Rodriguez',
      roles: [{ role: 'VP Membership', isActive: true }],
      bio: 'Passionate about welcoming new members and building our community.',
      pathways_level: 3,
      awards: ['CC', 'CL']
    },
    {
      id: 'dev-4',
      name: 'David Thompson',
      roles: [{ role: 'VP Public Relations', isActive: true }],
      bio: 'Expert in marketing and communications, spreading the Toastmasters message.',
      pathways_level: 4,
      awards: ['ACB', 'ALS']
    },
    {
      id: 'dev-5',
      name: 'Lisa Kim',
      roles: [{ role: 'Secretary', isActive: true }],
      bio: 'Detail-oriented professional ensuring smooth club operations.',
      pathways_level: 2,
      awards: ['CC']
    },
    {
      id: 'dev-6',
      name: 'Robert Wilson',
      roles: [{ role: 'Treasurer', isActive: true }],
      bio: 'Financial expert managing club resources responsibly.',
      pathways_level: 3,
      awards: ['CC', 'CL']
    },
    {
      id: 'dev-7',
      name: 'Amanda Davis',
      roles: [{ role: 'Sergeant at Arms', isActive: true }],
      bio: 'Creating welcoming environments and managing club logistics.',
      pathways_level: 2,
      awards: ['CC']
    }
  ] : officers

  const displayOfficers = officers.length > 0 ? officers : devOfficers

  return (
    <section id="officers" className="py-16 bg-cool-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
            Meet Our Executive Committee
          </h2>
          <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
            Our dedicated officers ensure the club runs smoothly and provides exceptional value to all members.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayOfficers.map((officer) => {
            const roles = Array.isArray(officer.roles) ? officer.roles : []
            const activeRole = roles.find((role: any) => role.isActive)
            const awards = Array.isArray(officer.awards) ? officer.awards : []

            return (
              <Card key={officer.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-loyal-blue to-loyal-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    {officer.profile_image ? (
                      <img
                        src={officer.profile_image}
                        alt={officer.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-xl">
                        {officer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{officer.name}</CardTitle>
                  {activeRole && (
                    <div className="flex items-center justify-center">
                      <Crown className="h-4 w-4 text-loyal-blue mr-1" />
                      <span className="text-sm font-medium text-loyal-blue">{activeRole.role}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-cool-gray-600 mb-3">{officer.bio}</p>
                  <div className="space-y-2">
                    {officer.pathways_level && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cool-gray-500">Pathways Level:</span>
                        <Badge variant="secondary" className="text-xs">Level {officer.pathways_level}</Badge>
                      </div>
                    )}
                    {awards.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {awards.slice(0, 3).map((award, awardIndex) => (
                          <Badge key={awardIndex} variant="outline" className="text-xs">
                            {award}
                          </Badge>
                        ))}
                        {awards.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{awards.length - 3}</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6" variant="accent">
              <Star className="h-4 w-4 mr-1" />
              Excellence Speakers Story
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About Excellence Speakers
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We are a vibrant community of communicators and leaders, dedicated to helping
              each member reach their full potential through the proven Toastmasters program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="xl" variant="accent">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/meetings">
                <Button size="xl" variant="secondary">
                  Attend a Meeting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              We empower individuals to become more effective communicators and leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-loyal-blue to-loyal-blue-700 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 text-lg">
                  We provide a supportive and positive learning experience in which members are
                  empowered to develop communication and leadership skills, resulting in greater
                  self-confidence and personal growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-happy-yellow to-yellow-400 text-loyal-blue">
              <CardHeader>
                <CardTitle className="text-loyal-blue flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-loyal-blue text-lg">
                  To be the first-choice provider of dynamic, high-value, experiential
                  communication and leadership skills development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              These values guide everything we do as a club community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Respect</h3>
              <p className="text-cool-gray-600">
                We treat all members with dignity, value diverse perspectives, and create an inclusive environment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-loyal-blue" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Integrity</h3>
              <p className="text-cool-gray-600">
                We act with honesty, responsibility, and hold ourselves accountable to the highest standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Service</h3>
              <p className="text-cool-gray-600">
                We volunteer our time and effort to help others achieve their communication goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-loyal-blue" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Excellence</h3>
              <p className="text-cool-gray-600">
                We strive for the highest quality in our meetings, education, and member development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Club Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-6">
                About Our Club
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-loyal-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-loyal-blue mb-2">Founded in 2018</h3>
                    <p className="text-cool-gray-600">
                      Excellence Speakers was chartered as a community club with the mission of
                      serving professionals and community members seeking to improve their communication skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-loyal-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-loyal-blue mb-2">Distinguished Club</h3>
                    <p className="text-cool-gray-600">
                      We&#39;ve achieved Distinguished status multiple years running, demonstrating our
                      commitment to excellence and member success.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-loyal-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-loyal-blue mb-2">Diverse Community</h3>
                    <p className="text-cool-gray-600">
                      Our members come from various backgrounds - business professionals, educators,
                      students, and community leaders - all united in the journey of growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-cool-gray-50 to-cool-gray-100">
              <CardHeader>
                <CardTitle>Meeting Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-loyal-blue" />
                  <span>Every Tuesday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-loyal-blue" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-loyal-blue" />
                  <span>Community Learning Center<br />Room 201, Main Street</span>
                </div>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="w-full">
                      Visit as a Guest
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Club Officers */}
      <Suspense fallback={<Loading fullScreen text="Loading officers..." />}>
        <OfficersSection />
      </Suspense>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-loyal-blue to-loyal-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Excellence Speakers and discover the leader within you. Your growth journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent">
                Contact Us Today
              </Button>
            </Link>
            <Link href="/meetings">
              <Button size="xl" variant="secondary">
                View Meeting Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}