'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Car,
  Accessibility,
  Send,
  Users,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Navigation
} from 'lucide-react'
import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest_level: '',
    preferred_contact: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    if (!formData.interest_level) {
      newErrors.interest_level = 'Please select your interest level'
    }

    if (!formData.preferred_contact) {
      newErrors.preferred_contact = 'Please select your preferred contact method'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to Supabase questionnaires table
      const { error } = await supabase
        .from('questionnaires')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          interest_level: formData.interest_level,
          preferred_contact: formData.preferred_contact
        }])

      if (error) {
        throw error
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest_level: '',
        preferred_contact: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // DEV ONLY: Club info for styling (would come from clubInfo data in real app)
  const clubInfo = {
    email: 'info@excellencespeakers.club',
    phone: '+1 (555) 123-4567',
    address: '123 Community Learning Center\nRoom 201, Main Street\nDowntown Area, City 12345',
    meetingTime: 'Every Tuesday, 7:00 PM - 8:30 PM',
    parkingInfo: 'Free parking available in the building garage',
    accessibilityInfo: 'Wheelchair accessible building with elevator access'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6" variant="accent">
              <MessageCircle className="h-4 w-4 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Contact Excellence Speakers
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ready to improve your communication and leadership skills? We'd love to hear from you!
              Contact us to learn more about our club or to attend as a guest.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-loyal-blue mb-6">Send Us a Message</h2>
              <p className="text-cool-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Thank you! Your message has been sent successfully. We'll contact you soon.
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800 font-medium">
                      Sorry, there was an error sending your message. Please try again.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  error={errors.email}
                  required
                />

                <Select
                  label="Interest Level"
                  placeholder="How interested are you in joining?"
                  value={formData.interest_level}
                  onChange={(e) => handleInputChange('interest_level', e.target.value)}
                  error={errors.interest_level}
                  options={[
                    { value: 'very_interested', label: 'Very Interested - Ready to Join' },
                    { value: 'interested', label: 'Interested - Want to Learn More' },
                    { value: 'exploring', label: 'Just Exploring Options' },
                    { value: 'guest', label: 'Want to Visit as Guest First' }
                  ]}
                  required
                />

                <Select
                  label="Preferred Contact Method"
                  placeholder="How would you like us to contact you?"
                  value={formData.preferred_contact}
                  onChange={(e) => handleInputChange('preferred_contact', e.target.value)}
                  error={errors.preferred_contact}
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone Call' },
                    { value: 'text', label: 'Text Message' },
                    { value: 'any', label: 'Any Method is Fine' }
                  ]}
                  required
                />

                <Textarea
                  label="Message"
                  placeholder="Tell us about yourself, your goals, or any questions you have about Toastmasters..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  error={errors.message}
                  required
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Meeting Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Meeting Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-cool-gray-700">
                    <p className="font-medium text-loyal-blue mb-1">Community Learning Center</p>
                    <p className="text-sm whitespace-pre-line">{clubInfo.address}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-loyal-blue" />
                    <span className="text-sm">{clubInfo.meetingTime}</span>
                  </div>

                  {clubInfo.parkingInfo && (
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-loyal-blue mt-0.5" />
                      <div>
                        <p className="text-sm text-cool-gray-600">Parking</p>
                        <p className="text-xs text-cool-gray-600">{clubInfo.parkingInfo}</p>
                      </div>
                    </div>
                  )}

                  {clubInfo.accessibilityInfo && (
                    <div className="flex items-start space-x-3">
                      <Accessibility className="h-5 w-5 text-loyal-blue mt-0.5" />
                      <div>
                        <p className="text-sm text-cool-gray-600">Accessibility</p>
                        <p className="text-xs text-cool-gray-600">{clubInfo.accessibilityInfo}</p>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-loyal-blue" />
                    <div>
                      <p className="text-sm text-cool-gray-600">Email</p>
                      <a
                        href={`mailto:${clubInfo.email}`}
                        className="font-medium text-loyal-blue hover:underline"
                      >
                        {clubInfo.email}
                      </a>
                    </div>
                  </div>

                  {clubInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-loyal-blue" />
                      <div>
                        <p className="text-sm text-cool-gray-600">Phone</p>
                        <a
                          href={`tel:${clubInfo.phone}`}
                          className="font-medium text-loyal-blue hover:underline"
                        >
                          {clubInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-cool-gray-200">
                    <p className="text-xs text-cool-gray-600">
                      We typically respond to inquiries within 24 hours. For urgent questions about
                      upcoming meetings, please call or text.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Visit as Guest */}
              <Card className="bg-gradient-to-br from-happy-yellow to-yellow-400 text-loyal-blue">
                <CardHeader>
                  <CardTitle className="text-loyal-blue flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Visit as a Guest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-loyal-blue mb-4">
                    You're welcome to attend up to 3 meetings as a guest before deciding to join.
                    No advance notice required!
                  </p>
                  <div className="space-y-2 text-sm text-loyal-blue">
                    <p>• Arrive 15 minutes early for a warm welcome</p>
                    <p>• Meetings are informal and supportive</p>
                    <p>• Participation is encouraged but not required</p>
                    <p>• Light refreshments provided</p>
                  </div>
                  <Link href="/meetings" className="mt-4 block">
                    <Button variant="outline" className="w-full border-loyal-blue text-loyal-blue hover:bg-loyal-blue hover:text-white">
                      View Meeting Schedule
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-cool-gray-600 max-w-2xl mx-auto">
              Get quick answers to common questions about joining Excellence Speakers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the time commitment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-gray-600">
                  Members typically attend weekly 90-minute meetings. You'll give 2-3 prepared speeches
                  per year and occasionally serve in meeting roles. The program is designed to fit
                  into busy schedules.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much does membership cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-gray-600">
                  Club dues are $45 every 6 months, plus a one-time $20 new member fee.
                  This includes all educational materials and resources. International dues
                  are separate ($45 every 6 months).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need speaking experience?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-gray-600">
                  Not at all! Toastmasters welcomes people at all skill levels. Our program
                  starts with basics and progresses at your pace. Many of our most accomplished
                  speakers started as complete beginners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I visit before joining?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-gray-600">
                  Absolutely! You can visit up to 3 times as a guest. We encourage prospective
                  members to attend several meetings to experience our supportive atmosphere
                  and see if we're the right fit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}