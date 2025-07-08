// src/app/members/page.tsx
import Link from 'next/link'

export default function MembersPage() {
  // Sample data - this will be replaced with actual database data later
  const members = [
    {
      id: 1,
      name: 'John Smith',
      joinDate: '2025-01-15',
      membershipStatus: 'Active',
      pathwaysPath: 'Leadership Development',
      pathwaysLevel: 2,
      completedSpeeches: 3,
      roles: [
        { role: 'President', startDate: '2025-01-15', isActive: true }
      ],
      awards: ['CC1', 'CC2'],
      bio: 'Software engineer with passion for leadership development.',
      profilePicture: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      joinDate: '2025-01-20',
      membershipStatus: 'Active',
      pathwaysPath: 'Presentation Mastery',
      pathwaysLevel: 1,
      completedSpeeches: 1,
      roles: [
        { role: 'VP Education', startDate: '2025-01-20', isActive: true }
      ],
      awards: ['Ice Breaker'],
      bio: 'Marketing professional looking to improve presentation skills.',
      profilePicture: null
    }
  ]

  const officers = members.filter(member =>
    member.roles.some(role => role.isActive && role.role !== 'Member')
  )

  const getPathwaysBadgeColor = (path: string) => {
    const colors: { [key: string]: string } = {
      'Leadership Development': 'bg-blue-100 text-blue-800',
      'Presentation Mastery': 'bg-red-100 text-red-800',
      'Persuasive Influence': 'bg-purple-100 text-purple-800',
      'Engaging Humor': 'bg-yellow-100 text-yellow-800',
      'Strategic Relationships': 'bg-teal-100 text-teal-800',
      'Team Collaboration': 'bg-cyan-100 text-cyan-800',
      'Innovative Planning': 'bg-indigo-100 text-indigo-800',
      'Visionary Communication': 'bg-emerald-100 text-emerald-800'
    }
    return colors[path] || 'bg-gray-100 text-gray-800'
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="bg-loyal-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Our Members</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Meet the dedicated individuals who make Reboot Toastmasters Club a vibrant community of learners and leaders.
          </p>
        </div>
      </section>

      {/* Club Officers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Club Officers</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our elected officers provide leadership and ensure our club runs smoothly while supporting every member's growth.
            </p>
          </div>

          {officers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officers.map((officer) => {
                const activeRole = officer.roles.find(role => role.isActive && role.role !== 'Member')
                return (
                  <div key={officer.id} className="bg-fair-gray rounded-lg p-6 text-center">
                    <div className="w-20 h-20 bg-loyal rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">
                        {officer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-loyal mb-1">{officer.name}</h3>
                    <p className="text-maroon font-semibold mb-2">{activeRole?.role}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Member since {formatJoinDate(officer.joinDate)}</p>
                      <div className={`inline-block px-2 py-1 rounded text-xs ${getPathwaysBadgeColor(officer.pathwaysPath)}`}>
                        {officer.pathwaysPath} - Level {officer.pathwaysLevel}
                      </div>
                    </div>
                    {officer.bio && (
                      <p className="text-sm text-gray-700 mt-3 italic">"{officer.bio}"</p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-fair-gray rounded-lg p-8 max-w-md mx-auto">
                <h3 className="font-heading font-bold text-xl text-loyal mb-4">Officer Positions Available</h3>
                <p className="text-gray-700 mb-6">
                  We're currently recruiting passionate individuals to fill our officer positions.
                  Leadership roles are a great way to develop your skills while serving the club.
                </p>
                <Link
                  href="/join"
                  className="inline-block bg-maroon hover:bg-rich-maroon text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors"
                >
                  Learn About Leadership Opportunities
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Members */}
      <section className="py-16 bg-fair-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-loyal">Member Directory</h2>
            <div className="text-sm text-gray-600">
              {members.length} {members.length === 1 ? 'Member' : 'Members'}
            </div>
          </div>

          {members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-loyal rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-lg text-loyal truncate">{member.name}</h3>
                      <p className="text-sm text-gray-600">Member since {formatJoinDate(member.joinDate)}</p>
                      <div className={`inline-block px-2 py-1 rounded text-xs mt-2 ${getPathwaysBadgeColor(member.pathwaysPath)}`}>
                        {member.pathwaysPath}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pathways Level:</span>
                      <span className="font-semibold">Level {member.pathwaysLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Speeches:</span>
                      <span className="font-semibold">{member.completedSpeeches}</span>
                    </div>
                    {member.roles.some(role => role.isActive && role.role !== 'Member') && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Role:</span>
                        <span className="font-semibold text-maroon">
                          {member.roles.find(role => role.isActive && role.role !== 'Member')?.role}
                        </span>
                      </div>
                    )}
                  </div>

                  {member.awards.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Awards</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.awards.slice(0, 3).map((award, index) => (
                          <span key={index} className="bg-yellow text-rich-black px-2 py-1 rounded text-xs font-medium">
                            {award}
                          </span>
                        ))}
                        {member.awards.length > 3 && (
                          <span className="text-gray-500 text-xs">+{member.awards.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {member.bio && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700 italic">"{member.bio}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                <h3 className="font-heading font-bold text-xl text-loyal mb-4">Be Our First Member!</h3>
                <p className="text-gray-700 mb-6">
                  Join Reboot Toastmasters Club and help us build an amazing community of speakers and leaders.
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

      {/* Pathways Progress Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Club Pathways Progress</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Track our collective learning journey through the Toastmasters Pathways education program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Members', value: members.length, color: 'bg-loyal' },
              { label: 'Active Pathways', value: new Set(members.map(m => m.pathwaysPath)).size, color: 'bg-maroon' },
              { label: 'Speeches Completed', value: members.reduce((sum, m) => sum + m.completedSpeeches, 0), color: 'bg-yellow text-rich-black' },
              { label: 'Awards Earned', value: members.reduce((sum, m) => sum + m.awards.length, 0), color: 'bg-gray' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${stat.color} text-white rounded-lg p-6`}>
                  <div className="text-3xl font-bold font-heading mb-2">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-fair-gray rounded-lg p-8">
            <h3 className="font-heading font-bold text-xl text-loyal mb-6 text-center">Popular Pathways in Our Club</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(new Set(members.map(m => m.pathwaysPath))).map((path, index) => {
                const memberCount = members.filter(m => m.pathwaysPath === path).length
                return (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <div className={`inline-block px-3 py-1 rounded text-sm ${getPathwaysBadgeColor(path)}`}>
                        {path}
                      </div>
                    </div>
                    <div className="text-gray-600">
                      {memberCount} {memberCount === 1 ? 'member' : 'members'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Community */}
      <section className="py-16 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Experience the supportive environment that helps our members grow into confident speakers and effective leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-block rounded-md bg-yellow hover:bg-yellow text-rich-black px-8 py-3 font-bold font-heading shadow-lg transition-colors"
            >
              Visit as a Guest
            </Link>
            <Link
              href="/meetings"
              className="inline-block rounded-md border-2 border-white text-white hover:bg-white hover:text-maroon px-8 py-3 font-semibold font-heading transition-colors"
            >
              View Meeting Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}