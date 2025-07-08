// src/app/join/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    interests: '',
    hearAbout: '',
    visitDate: '',
    questions: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual API call later
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="font-body">
        <section className="bg-loyal-blue-gradient text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Thank You!</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We've received your information and look forward to welcoming you to Reboot Toastmasters Club.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-fair-gray rounded-lg p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-heading text-loyal mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="bg-loyal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <p>We'll send you a confirmation email with meeting details and directions.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-loyal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <p>A club member will contact you before your visit to answer any questions.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-loyal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <p>We'll welcome you at the meeting and introduce you to our friendly community.</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/meetings"
                  className="inline-block bg-loyal hover:bg-blissful-blue text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors mr-4"
                >
                  View Meeting Schedule
                </Link>
                <Link
                  href="/"
                  className="inline-block border border-loyal text-loyal hover:bg-loyal hover:text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="bg-loyal-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Join Our Community</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Take the first step towards becoming a confident speaker and effective leader.
            We'd love to welcome you to our supportive community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information Column */}
            <div>
              <h2 className="text-3xl font-bold font-heading text-loyal mb-6">Visit as a Guest</h2>
              <p className="text-lg text-gray-700 mb-6">
                The best way to experience Toastmasters is to visit one of our meetings. As our guest,
                you'll see firsthand how we help each other grow and develop our communication skills.
              </p>

              <div className="bg-fair-gray rounded-lg p-6 mb-8">
                <h3 className="font-heading font-bold text-xl text-maroon mb-4">What to Expect at Your First Visit</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-loyal">•</span>
                    <span><strong>Warm Welcome:</strong> We'll greet you personally and make introductions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-loyal">•</span>
                    <span><strong>Meeting Overview:</strong> Learn about our format and how meetings work</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-loyal">•</span>
                    <span><strong>Optional Participation:</strong> Try Table Topics if you feel comfortable</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-loyal">•</span>
                    <span><strong>No Pressure:</strong> Observe as much as you'd like, participate when ready</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-loyal">•</span>
                    <span><strong>Q&A Time:</strong> Ask questions during breaks and after the meeting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow rounded-lg p-6 mb-8">
                <h3 className="font-heading font-bold text-xl text-rich-black mb-4">Meeting Information</h3>
                <div className="space-y-2 text-rich-black">
                  <p className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span><strong>When:</strong> Every Tuesday at 7:00 PM</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Where:</strong> Meeting Location TBD</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Duration:</strong> 60-75 minutes</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Cost:</strong> Free for guests</span>
                  </p>
                </div>
              </div>

              <div className="bg-loyal rounded-lg p-6 text-white">
                <h3 className="font-heading font-bold text-xl mb-4">Why People Join Toastmasters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-yellow mb-2">Professional Benefits</h4>
                    <ul className="space-y-1 text-gray-200">
                      <li>• Career advancement</li>
                      <li>• Leadership skills</li>
                      <li>• Networking opportunities</li>
                      <li>• Presentation confidence</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow mb-2">Personal Benefits</h4>
                    <ul className="space-y-1 text-gray-200">
                      <li>• Overcome speaking fears</li>
                      <li>• Build self-confidence</li>
                      <li>• Meet like-minded people</li>
                      <li>• Have fun while learning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div>
              <div className="bg-fair-gray rounded-lg p-8">
                <h2 className="text-2xl font-bold font-heading text-loyal mb-2">Let Us Know You're Coming</h2>
                <p className="text-gray-600 mb-6">
                  Fill out this form so we can prepare for your visit and ensure you have the best possible experience.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Public Speaking Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    >
                      <option value="">Select your experience level</option>
                      <option value="none">No experience</option>
                      <option value="little">A little experience</option>
                      <option value="some">Some experience</option>
                      <option value="experienced">Quite experienced</option>
                      <option value="very-experienced">Very experienced</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                      What interests you most about Toastmasters?
                    </label>
                    <select
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    >
                      <option value="">Select your primary interest</option>
                      <option value="public-speaking">Improving public speaking</option>
                      <option value="leadership">Developing leadership skills</option>
                      <option value="confidence">Building confidence</option>
                      <option value="career">Career advancement</option>
                      <option value="networking">Meeting new people</option>
                      <option value="fun">Having fun while learning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    >
                      <option value="">Please select</option>
                      <option value="website">Toastmasters website</option>
                      <option value="search">Internet search</option>
                      <option value="friend">Friend or colleague</option>
                      <option value="social-media">Social media</option>
                      <option value="event">Community event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">
                      When would you like to visit?
                    </label>
                    <input
                      type="date"
                      id="visitDate"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">
                      Questions or Comments
                    </label>
                    <textarea
                      id="questions"
                      name="questions"
                      rows={4}
                      value={formData.questions}
                      onChange={handleInputChange}
                      placeholder="Any questions about Toastmasters or our club? We're here to help!"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loyal focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-maroon hover:bg-rich-maroon disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Information'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to be contacted by Reboot Toastmasters Club about your visit.
                  </p>
                </form>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-heading font-bold text-lg text-loyal mb-2">Prefer to Contact Us Directly?</h3>
                <p className="text-gray-600 mb-4">Feel free to reach out with any questions</p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Email:</strong> info@excellence-speakers.org
                  </p>
                  <Link
                    href="/meetings"
                    className="inline-block text-loyal hover:text-blissful-blue font-semibold underline"
                  >
                    View Our Meeting Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}