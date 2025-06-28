import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { getMemberById } from '@/lib/supabase'
import { getInitials, formatDate } from '@/lib/utils'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Award,
  Star,
  Crown,
  User,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps) {
  const member = await getMemberById(params.id)

  if (!member) {
    return {
      title: 'Member Not Found',
    }
  }

  return {
    title: `${member.name} | Excellence Speakers Members`,
    description: member.bio || `Meet ${member.name}, a valued member of Excellence Speakers Toastmasters Club.`,
  }
}

async function MemberProfile({ id }: { id: string }) {
  const member = await getMemberById(id)

  if (!member) {
    notFound()
  }

  const roles = Array.isArray(member.roles) ? member.roles : []
  const awards = Array.isArray(member.awards) ? member.awards : []
  const achievements = Array.isArray(member.achievements) ? member.achievements : []
  const activeRole = roles.find((role: any) => role.isActive)
  const isOfficer = activeRole && activeRole.role !== 'Member'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/members">
              <Button variant="secondary" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Members
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="relative inline-block mb-6">
              {member.profile_image ? (
                <img
                  src={member.profile_image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto border-4 border-white/20">
                  <span className="text-white font-bold text-4xl">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}
              {isOfficer && (
                <div className="absolute -top-2 -right-2 bg-happy-yellow rounded-full p-2">
                  <Crown className="h-6 w-6 text-loyal-blue" />
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {member.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {activeRole && (
                <Badge variant="accent" className="text-base px-4 py-2">
                  {activeRole.role}
                </Badge>
              )}
              <Badge
                variant={
                  member.membership_status === 'Active' ? 'default' :
                    member.membership_status === 'Guest' ? 'accent' : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {member.membership_status}
              </Badge>
              {member.pathways_level && (
                <Badge variant="secondary" className="text-base px-4 py-2">
                  Level {member.pathways_level}
                </Badge>
              )}
            </div>

            {member.bio && (
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                {member.bio}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Member Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Member Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-cool-gray-500" />
                    <div>
                      <p className="text-sm text-cool-gray-600">Member Since</p>
                      <p className="font-medium">{formatDate(member.join_date)}</p>
                    </div>
                  </div>
                  {member.toastmasters_id && (
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-cool-gray-500" />
                      <div>
                        <p className="text-sm text-cool-gray-600">Toastmasters ID</p>
                        <p className="font-medium">{member.toastmasters_id}</p>
                      </div>
                    </div>
                  )}
                </div>

                {member.email && (
                  <div className="flex items-center space-x-3 pt-4 border-t border-cool-gray-200">
                    <Mail className="h-5 w-5 text-cool-gray-500" />
                    <div>
                      <p className="text-sm text-cool-gray-600">Email</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="font-medium text-loyal-blue hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                )}

                {member.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-cool-gray-500" />
                    <div>
                      <p className="text-sm text-cool-gray-600">Phone</p>
                      <a
                        href={`tel:${member.phone}`}
                        className="font-medium text-loyal-blue hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pathways Progress */}
            {(member.communication_track || member.leadership_track) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Pathways Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {member.communication_track && (
                    <div>
                      <h4 className="font-semibold text-loyal-blue mb-2">Communication Track</h4>
                      <div className="bg-cool-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{member.communication_track.pathName}</span>
                          <Badge variant="accent">Level {member.communication_track.level}</Badge>
                        </div>
                        <div className="text-sm text-cool-gray-600">
                          Started: {formatDate(member.communication_track.startDate)}
                        </div>
                        {member.communication_track.estimatedCompletion && (
                          <div className="text-sm text-cool-gray-600">
                            Est. Completion: {formatDate(member.communication_track.estimatedCompletion)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {member.leadership_track && (
                    <div>
                      <h4 className="font-semibold text-loyal-blue mb-2">Leadership Track</h4>
                      <div className="bg-cool-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{member.leadership_track.pathName}</span>
                          <Badge variant="accent">Level {member.leadership_track.level}</Badge>
                        </div>
                        <div className="text-sm text-cool-gray-600">
                          Started: {formatDate(member.leadership_track.startDate)}
                        </div>
                        {member.leadership_track.estimatedCompletion && (
                          <div className="text-sm text-cool-gray-600">
                            Est. Completion: {formatDate(member.leadership_track.estimatedCompletion)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Awards ({awards.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {awards.map((award: any, index: number) => (
                      <div key={index} className="border-l-4 border-l-happy-yellow pl-4">
                        <h4 className="font-semibold text-loyal-blue">{award.title}</h4>
                        <p className="text-sm text-cool-gray-600 mb-1">{award.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {award.category}
                          </Badge>
                          <span className="text-xs text-cool-gray-500">
                            {formatDate(award.receivedDate)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Achievements ({achievements.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {achievements.map((achievement: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-loyal-blue">{achievement.title}</h4>
                          <p className="text-sm text-cool-gray-600 mb-1">{achievement.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {achievement.category}
                            </Badge>
                            <span className="text-xs text-cool-gray-500">
                              {formatDate(achievement.achievedDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Role History */}
            {roles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="h-5 w-5 mr-2" />
                    Role History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roles.map((role: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-cool-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-loyal-blue">{role.role}</p>
                          <p className="text-sm text-cool-gray-600">
                            {formatDate(role.startDate)}
                            {role.endDate ? ` - ${formatDate(role.endDate)}` : ' - Present'}
                          </p>
                        </div>
                        {role.isActive && (
                          <Badge variant="accent" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cool-gray-600">Pathways Level:</span>
                  <Badge variant="accent">
                    {member.pathways_level || 'Not Started'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cool-gray-600">Awards:</span>
                  <span className="font-medium">{awards.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cool-gray-600">Achievements:</span>
                  <span className="font-medium">{achievements.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cool-gray-600">Roles Held:</span>
                  <span className="font-medium">{roles.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.email && (
                  <a href={`mailto:${member.email}`}>
                    <Button className="w-full" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`}>
                    <Button className="w-full" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Member
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>More Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/members">
                  <Button variant="outline" className="w-full">
                    View All Members
                  </Button>
                </Link>
                <Link href="/about#officers">
                  <Button variant="outline" className="w-full">
                    Club Officers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MemberDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<Loading fullScreen text="Loading member profile..." />}>
      <MemberProfile id={params.id} />
    </Suspense>
  )
}