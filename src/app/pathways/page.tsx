import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loading } from '@/components/ui/loading'
import { supabase } from '@/lib/supabase'
import {
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Lightbulb,
  MessageCircle,
  Crown,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Pathways Program | Excellence Speakers Toastmasters Club',
  description: 'Discover the Toastmasters Pathways learning experience - personalized paths to develop communication and leadership skills.',
}

// Get member pathways progress from database
async function getMemberPathwaysProgress() {
  const { data: members, error } = await supabase
    .from('members')
    .select('id, name, pathways_level, communication_track, leadership_track, awards')
    .eq('membership_status', 'Active')
    .order('pathways_level', { ascending: false })

  if (error) {
    console.error('Error fetching member progress:', error)
    return []
  }

  return members || []
}

async function PathwaysProgress() {
  const members = await getMemberPathwaysProgress()

  // DEV ONLY: Fallback data for styling when DB is empty
  const devMembers = members.length === 0 ? [
    {
      id: 'dev-1',
      name: 'Sarah Johnson',
      pathways_level: 5,
      communication_track: {
        pathName: 'Dynamic Leadership',
        level: 5,
        completedProjects: ['Ice Breaker', 'Organize Your Speech', 'Get Comfortable with Visual Aids', 'Make It Persuasive', 'Working with Words']
      },
      leadership_track: {
        pathName: 'Strategic Relationships',
        level: 3,
        completedProjects: ['Develop Your Purpose', 'Focus on Your Purpose', 'Reaching Consensus']
      },
      awards: ['DTM', 'ALB', 'ALS']
    },
    {
      id: 'dev-2',
      name: 'Michael Chen',
      pathways_level: 4,
      communication_track: {
        pathName: 'Presentation Mastery',
        level: 4,
        completedProjects: ['Ice Breaker', 'Evaluation and Feedback', 'Researching and Presenting', 'Connecting with Your Audience']
      },
      awards: ['CC', 'CL', 'ACB']
    },
    {
      id: 'dev-3',
      name: 'Emily Rodriguez',
      pathways_level: 3,
      communication_track: {
        pathName: 'Engaging Humor',
        level: 3,
        completedProjects: ['Ice Breaker', 'Writing a Speech with Humor', 'Make Them Laugh']
      },
      awards: ['CC', 'CL']
    }
  ] : members

  const displayMembers = members.length > 0 ? members : devMembers

  return (
    <section className="py-16 bg-cool-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
            Member Progress
          </h2>
          <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
            See how our members are advancing through their Pathways journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMembers.slice(0, 6).map((member) => {
            const awards = Array.isArray(member.awards) ? member.awards : []
            const commTrack = member.communication_track
            const leadTrack = member.leadership_track

            return (
              <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="accent">Level {member.pathways_level || 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {commTrack && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-loyal-blue">Communication</span>
                        <Badge variant="outline" className="text-xs">Level {commTrack.level}</Badge>
                      </div>
                      <p className="text-sm text-cool-gray-600 mb-1">{commTrack.pathName}</p>
                      <div className="w-full bg-cool-gray-200 rounded-full h-2">
                        <div
                          className="bg-loyal-blue h-2 rounded-full"
                          style={{ width: `${(commTrack.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {leadTrack && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-loyal-blue">Leadership</span>
                        <Badge variant="outline" className="text-xs">Level {leadTrack.level}</Badge>
                      </div>
                      <p className="text-sm text-cool-gray-600 mb-1">{leadTrack.pathName}</p>
                      <div className="w-full bg-cool-gray-200 rounded-full h-2">
                        <div
                          className="bg-happy-yellow h-2 rounded-full"
                          style={{ width: `${(leadTrack.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {awards.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {awards.slice(0, 3).map((award, index) => (
                        <Badge key={index} variant="success" className="text-xs">
                          {award}
                        </Badge>
                      ))}
                      {awards.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{awards.length - 3}</Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/members">
            <Button variant="outline">
              View All Member Profiles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function PathwaysPage() {
  // DEV ONLY: Pathways learning paths data for styling
  const pathwaysData = [
    {
      name: 'Dynamic Leadership',
      description: 'Build your skills as an innovative leader, and learn to motivate others.',
      icon: Crown,
      color: 'bg-blue-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Innovative Planning', 'Public Speaking', 'Team Leadership', 'Change Management']
    },
    {
      name: 'Engaging Humor',
      description: 'Learn to speak with humor, and discover how humor can strengthen your presentations.',
      icon: Zap,
      color: 'bg-yellow-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Comedic Timing', 'Storytelling', 'Audience Engagement', 'Creative Writing']
    },
    {
      name: 'Innovative Planning',
      description: 'Learn to use innovation and strategic thinking to achieve your goals.',
      icon: Lightbulb,
      color: 'bg-purple-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Strategic Planning', 'Innovation', 'Critical Thinking', 'Problem Solving']
    },
    {
      name: 'Leadership Development',
      description: 'Learn to be an effective communicator and leader.',
      icon: Users,
      color: 'bg-green-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Team Building', 'Mentoring', 'Conflict Resolution', 'Communication']
    },
    {
      name: 'Motivational Strategies',
      description: 'Learn to motivate and inspire others through your communication.',
      icon: Target,
      color: 'bg-red-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Inspirational Speaking', 'Goal Setting', 'Coaching', 'Persuasion']
    },
    {
      name: 'Persuasive Influence',
      description: 'Learn to craft powerful, persuasive speeches that motivate your audience.',
      icon: MessageCircle,
      color: 'bg-indigo-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Persuasive Speaking', 'Audience Analysis', 'Argumentation', 'Influence']
    },
    {
      name: 'Presentation Mastery',
      description: 'Learn to develop and deliver engaging presentations.',
      icon: BookOpen,
      color: 'bg-teal-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Presentation Design', 'Visual Aids', 'Delivery Techniques', 'Audience Connection']
    },
    {
      name: 'Strategic Relationships',
      description: 'Learn to build strategic relationships with effective communication.',
      icon: Users,
      color: 'bg-pink-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Networking', 'Relationship Building', 'Emotional Intelligence', 'Collaboration']
    },
    {
      name: 'Team Collaboration',
      description: 'Learn to work effectively with others in collaborative environments.',
      icon: Users,
      color: 'bg-orange-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Team Dynamics', 'Collaboration', 'Consensus Building', 'Group Communication']
    },
    {
      name: 'Visionary Communication',
      description: 'Learn to develop a compelling vision and communicate it effectively.',
      icon: TrendingUp,
      color: 'bg-cyan-500',
      projects: 5,
      duration: '18-24 months',
      skills: ['Vision Development', 'Strategic Communication', 'Change Leadership', 'Inspiration']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6" variant="accent">
              <TrendingUp className="h-4 w-4 mr-1" />
              Personalized Learning
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Toastmasters Pathways
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Choose your own adventure in communication and leadership development.
              Pathways offers 10 specialized learning paths tailored to your goals and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="xl" variant="accent">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/about">
                <Button size="xl" variant="secondary">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Pathways Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              How Pathways Works
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              A structured, flexible approach to developing your communication and leadership skills.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Choose Your Path</h3>
              <p className="text-cool-gray-600">
                Select from 10 learning paths based on your goals and interests. Each path focuses on specific skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-loyal-blue font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Complete Projects</h3>
              <p className="text-cool-gray-600">
                Work through 5 levels with multiple projects in each. Practice speeches, leadership roles, and receive feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Get Evaluated</h3>
              <p className="text-cool-gray-600">
                Receive constructive feedback from fellow members to help you improve and grow your skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-loyal-blue font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Earn Recognition</h3>
              <p className="text-cool-gray-600">
                Complete levels to earn awards and recognition for your achievements and continued growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Each path is designed to help you develop specific communication and leadership competencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathwaysData.map((path, index) => {
              const IconComponent = path.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 ${path.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{path.name}</CardTitle>
                    </div>
                    <p className="text-cool-gray-600 text-sm">{path.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cool-gray-500">Projects:</span>
                        <span className="font-medium">{path.projects} levels</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cool-gray-500">Duration:</span>
                        <span className="font-medium">{path.duration}</span>
                      </div>
                      <div className="pt-3 border-t border-cool-gray-200">
                        <p className="text-xs text-cool-gray-500 mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.slice(0, 2).map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {path.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{path.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Member Progress */}
      <Suspense fallback={<Loading fullScreen text="Loading member progress..." />}>
        <PathwaysProgress />
      </Suspense>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Why Choose Pathways?
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Pathways offers a modern, flexible approach to developing essential life skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Personalized Learning</h3>
              <p className="text-cool-gray-600">
                Choose the path that aligns with your goals and interests. Focus on what matters most to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-loyal-blue" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Flexible Pace</h3>
              <p className="text-cool-gray-600">
                Progress at your own pace. Take as much time as you need to master each level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Proven Results</h3>
              <p className="text-cool-gray-600">
                Backed by research and proven effective by millions of Toastmasters worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-loyal-blue" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Recognition</h3>
              <p className="text-cool-gray-600">
                Earn awards and certificates as you complete levels and demonstrate your skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Supportive Community</h3>
              <p className="text-cool-gray-600">
                Learn in a supportive environment with constructive feedback from fellow members.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-happy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-loyal-blue" />
              </div>
              <h3 className="text-xl font-semibold text-loyal-blue mb-3">Real-World Skills</h3>
              <p className="text-cool-gray-600">
                Develop skills you can immediately apply in your personal and professional life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-loyal-blue to-loyal-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Pathways Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Excellence Speakers and choose the learning path that's right for you.
            Your personal and professional growth starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent">
                Join Excellence Speakers
              </Button>
            </Link>
            <Link href="/meetings">
              <Button size="xl" variant="secondary">
                Visit Our Next Meeting
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}