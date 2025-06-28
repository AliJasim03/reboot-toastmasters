import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Loading, SkeletonMemberCard } from '@/components/ui/loading'
import { getMembers } from '@/lib/supabase'
import { getInitials } from '@/lib/utils'
import {
  Users,
  Search,
  Filter,
  Award,
  Calendar,
  Mail,
  Phone,
  Star,
  Crown,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Members | Excellence Speakers Toastmasters Club',
  description: 'Meet our amazing members and club officers. Discover the diverse talents and experiences in our Toastmasters community.',
}

interface MemberCardProps {
  member: any
  showRole?: boolean
}

function MemberCard({ member, showRole = false }: MemberCardProps) {
  const roles = Array.isArray(member.roles) ? member.roles : []
  const activeRole = roles.find((role: any) => role.isActive)
  const awards = Array.isArray(member.awards) ? member.awards : []
  const achievements = Array.isArray(member.achievements) ? member.achievements : []

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="text-center">
        <div className="relative">
          {member.profile_image ? (
            <img
              src={member.profile_image}
              alt={member.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-loyal-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-loyal-blue-700 transition-colors">
              <span className="text-white font-bold text-xl">
                {getInitials(member.name)}
              </span>
            </div>
          )}
          {activeRole && activeRole.role !== 'Member' && (
            <div className="absolute -top-1 -right-1">
              <Crown className="h-6 w-6 text-happy-yellow" />
            </div>
          )}
        </div>

        <CardTitle className="text-lg">{member.name}</CardTitle>

        {showRole && activeRole && (
          <Badge variant="accent" className="text-xs">
            {activeRole.role}
          </Badge>
        )}

        {member.pathways_level && (
          <Badge variant="secondary" className="text-xs">
            Level {member.pathways_level}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="text-center space-y-3">
        {member.bio && (
          <p className="text-sm text-cool-gray-600 line-clamp-3">
            {member.bio}
          </p>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-cool-gray-500">
          <Calendar className="h-3 w-3" />
          <span>Joined {new Date(member.join_date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          })}</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Badge
            variant={
              member.membership_status === 'Active' ? 'default' :
                member.membership_status === 'Guest' ? 'accent' : 'secondary'
            }
            className="text-xs"
          >
            {member.membership_status}
          </Badge>
        </div>

        {(awards.length > 0 || achievements.length > 0) && (
          <div className="flex items-center justify-center space-x-1">
            <Star className="h-4 w-4 text-happy-yellow" />
            <span className="text-xs text-cool-gray-600">
              {awards.length + achievements.length} achievements
            </span>
          </div>
        )}

        <Link href={`/members/${member.id}`}>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

async function MembersList() {
  const members = await getMembers()

  if (!members || members.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Users className="h-16 w-16 mx-auto text-cool-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-cool-gray-600 mb-2">
            No Members Found
          </h3>
          <p className="text-cool-gray-500 mb-6">
            Our member directory is being updated. Check back soon!
          </p>
          <Link href="/contact">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Join Our Club
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Separate officers and regular members
  const officers = members.filter(member => {
    const roles = Array.isArray(member.roles) ? member.roles : []
    const activeRole = roles.find((role: any) => role.isActive)
    return activeRole && activeRole.role !== 'Member'
  })

  const regularMembers = members.filter(member => {
    const roles = Array.isArray(member.roles) ? member.roles : []
    const activeRole = roles.find((role: any) => role.isActive)
    return !activeRole || activeRole.role === 'Member'
  })

  return (
    <div className="space-y-12">
      {/* Officers Section */}
      {officers.length > 0 && (
        <div>
          <div className="flex items-center mb-6">
            <Crown className="h-6 w-6 text-happy-yellow mr-2" />
            <h2 className="text-2xl font-bold text-loyal-blue">
              Club Officers ({officers.length})
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {officers.map((member) => (
              <MemberCard key={member.id} member={member} showRole={true} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Members Section */}
      {regularMembers.length > 0 && (
        <div>
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-loyal-blue mr-2" />
            <h2 className="text-2xl font-bold text-loyal-blue">
              Members ({regularMembers.length})
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function MembersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-happy-yellow text-loyal-blue">
              <Users className="h-4 w-4 mr-1" />
              52 Active Members
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Members
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Meet the amazing individuals who make Excellence Speakers a thriving
              community of communicators and leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="accent">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Join Our Club
                </Button>
              </Link>
              <Button size="lg" variant="secondary">
                <Filter className="mr-2 h-5 w-5" />
                Filter Members
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-cool-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search members by name..."
                className="w-full"
                // Add search functionality later
              />
            </div>
            <div className="flex gap-3">
              <Select
                placeholder="Filter by status"
                options={[
                  { value: 'all', label: 'All Members' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'guest', label: 'Guests' }
                ]}
                className="w-48"
              />
              <Select
                placeholder="Filter by role"
                options={[
                  { value: 'all', label: 'All Roles' },
                  { value: 'officer', label: 'Officers' },
                  { value: 'member', label: 'Members' }
                ]}
                className="w-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Members List */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <SkeletonMemberCard key={i} />
                ))}
              </div>
            }
          >
            <MembersList />
          </Suspense>
        </div>
      </section>

      {/* Member Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Member Statistics
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Our diverse membership reflects the strength of our community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-2">
                52
              </div>
              <div className="text-cool-gray-600">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-2">
                7
              </div>
              <div className="text-cool-gray-600">Club Officers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-2">
                15
              </div>
              <div className="text-cool-gray-600">DTM Awards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-2">
                89%
              </div>
              <div className="text-cool-gray-600">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-loyal-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Become part of Excellence Speakers and join a supportive community
            committed to helping you achieve your communication and leadership goals.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Supportive Community</h3>
              <p className="text-sm text-blue-200">Learn with encouraging peers</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Proven Program</h3>
              <p className="text-sm text-blue-200">Pathways learning experience</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Personal Growth</h3>
              <p className="text-sm text-blue-200">Build confidence and skills</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent">
                <UserPlus className="mr-2 h-5 w-5" />
                Join Excellence Speakers
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