// src/app/about/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="bg-loyal-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">About Our Club</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the story of Reboot Toastmasters Club and how we're building confident speakers and effective leaders.
          </p>
        </div>
      </section>

      {/* Club Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading text-loyal mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Reboot Toastmasters Club was founded with a simple yet powerful mission: to create a supportive
                environment where individuals can develop their communication and leadership skills without fear of judgment.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We believe that everyone has a unique voice and story to share. Our club provides the platform,
                guidance, and encouragement needed to help you find that voice and share it confidently with the world.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're looking to overcome the fear of public speaking, advance your career, or simply
                challenge yourself to grow, Reboot Toastmasters Club is here to support your journey.
              </p>
            </div>
            <div className="bg-fair-gray rounded-lg p-8">
              <h3 className="font-heading font-bold text-xl text-maroon mb-4">Club Charter</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Charter Date:</strong> Coming Soon</p>
                <p><strong>Club Number:</strong> TBD</p>
                <p><strong>District:</strong> TBD</p>
                <p><strong>Area:</strong> TBD</p>
                <p><strong>Division:</strong> TBD</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-300">
                <h4 className="font-semibold text-loyal mb-2">Meeting Details</h4>
                <p className="text-gray-700 text-sm">Every Tuesday at 7:00 PM</p>
                <p className="text-gray-700 text-sm">Meeting Location TBD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Education Program */}
      <section className="py-16 bg-fair-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Pathways Learning Experience</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our education program is built on Toastmasters Pathways – a flexible, interactive learning experience
              that allows you to develop the skills you need most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Dynamic Leadership',
                color: 'bg-blue-100 text-blue-800',
                focus: 'Leadership & Strategy',
                description: 'Build your leadership skills and learn to motivate others.'
              },
              {
                name: 'Engaging Humor',
                color: 'bg-yellow-100 text-yellow-800',
                focus: 'Humor & Entertainment',
                description: 'Learn to use humor effectively in your communication.'
              },
              {
                name: 'Presentation Mastery',
                color: 'bg-red-100 text-red-800',
                focus: 'Public Speaking',
                description: 'Master the art of presentations and public speaking.'
              },
              {
                name: 'Persuasive Influence',
                color: 'bg-purple-100 text-purple-800',
                focus: 'Influence & Negotiation',
                description: 'Learn to influence others through effective communication.'
              }
            ].map((path, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${path.color} mb-3`}>
                  {path.name}
                </div>
                <h3 className="font-heading font-bold text-lg text-rich-black mb-2">{path.focus}</h3>
                <p className="text-gray-600 text-sm">{path.description}</p>
                <div className="mt-4 text-xs text-gray-500">
                  <span>5 Levels • 14+ Projects</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/join"
              className="inline-block bg-maroon hover:bg-rich-maroon text-white px-8 py-3 rounded-md font-semibold font-heading transition-colors"
            >
              Start Your Pathways Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Club Officers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-loyal mb-4">Meet Our Executive Committee</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our dedicated officers ensure that every meeting runs smoothly and every member receives the support they need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'President',
                name: 'Position Open',
                description: 'Leads the club and ensures smooth operations.',
                responsibilities: ['Preside over meetings', 'Club spokesperson', 'Strategic planning']
              },
              {
                title: 'VP Education',
                name: 'Position Open',
                description: 'Manages the educational program of the club.',
                responsibilities: ['Plan educational programs', 'Assign speeches', 'Mentor members']
              },
              {
                title: 'VP Membership',
                name: 'Position Open',
                description: 'Focuses on member retention and recruitment.',
                responsibilities: ['Welcome new members', 'Retention programs', 'Guest relations']
              },
              {
                title: 'VP Public Relations',
                name: 'Position Open',
                description: 'Promotes the club and manages communications.',
                responsibilities: ['Marketing initiatives', 'Social media', 'Community outreach']
              },
              {
                title: 'Secretary',
                name: 'Position Open',
                description: 'Maintains club records and correspondence.',
                responsibilities: ['Meeting records', 'Member database', 'Correspondence']
              },
              {
                title: 'Treasurer',
                name: 'Position Open',
                description: 'Manages club finances and dues collection.',
                responsibilities: ['Financial records', 'Dues collection', 'Budget planning']
              }
            ].map((officer, index) => (
              <div key={index} className="bg-fair-gray rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-maroon mb-2">{officer.title}</h3>
                <p className="font-semibold text-loyal mb-2">{officer.name}</p>
                <p className="text-gray-700 mb-4">{officer.description}</p>
                <div>
                  <h4 className="font-semibold text-sm text-rich-black mb-2">Key Responsibilities:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {officer.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-maroon text-xs">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-yellow rounded-lg">
            <h3 className="font-heading font-bold text-xl text-rich-black mb-2">Interested in Leadership?</h3>
            <p className="text-rich-black mb-4">
              We're currently recruiting passionate individuals to fill our officer positions.
              Leadership roles are a great way to develop your skills while serving the club.
            </p>
            <Link
              href="/join"
              className="inline-block bg-loyal hover:bg-blissful-blue text-white px-6 py-2 rounded-md font-semibold font-heading transition-colors"
            >
              Learn More About Leadership Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-loyal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Our Mission</h2>
              <p className="text-lg text-gray-200 mb-6">
                We provide a supportive and positive learning experience in which members are empowered to develop
                communication and leadership skills, resulting in greater self-confidence and personal growth.
              </p>
              <h3 className="text-xl font-bold font-heading mb-4 text-yellow">Core Values</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow">•</span>
                  <span><strong>Integrity:</strong> We act with honesty and accountability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow">•</span>
                  <span><strong>Respect:</strong> We treat everyone with dignity and respect</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow">•</span>
                  <span><strong>Service:</strong> We volunteer our time and expertise</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow">•</span>
                  <span><strong>Excellence:</strong> We strive for the highest quality</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Why Join Toastmasters?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-rich-black font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Build Confidence</h4>
                    <p className="text-gray-200">Overcome your fear of public speaking in a supportive environment.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-rich-black font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Advance Your Career</h4>
                    <p className="text-gray-200">Develop skills that will help you succeed professionally.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-rich-black font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Meet Like-Minded People</h4>
                    <p className="text-gray-200">Connect with others who share your commitment to personal growth.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-rich-black font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Have Fun While Learning</h4>
                    <p className="text-gray-200">Enjoy a positive, encouraging atmosphere where mistakes are learning opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}