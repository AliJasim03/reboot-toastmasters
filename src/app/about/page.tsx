'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { clubInfo } from '@/lib/data/club-info'
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
  AlertCircle
} from 'lucide-react'
import { useState, FormEvent } from 'react'

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
      const { error } = await supabase
        .from('questionnaires')
        .insert([formData])

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
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-happy-yellow text-loyal-blue">
              <MessageCircle className="h-4 w-4 mr-1" />
              Get In Touch
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Contact Excellence Speakers
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Ready to begin your journey in communication and leadership?
              We'd love to hear from you and welcome you to our community.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send Us a Message
                </CardTitle>
                <p className="text-cool-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-800">
                      Thank you! Your message has been sent successfully. We'll contact you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-800">
                      Sorry, there was an error sending your message. Please try again.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />

                  <Select
                    label="Interest Level"
                    placeholder="How interested are you in joining?"
                    value={formData.interest_level}
                    onChange={(e) => handleChange('interest_level', e.target.value)}
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
                    onChange={(e) => handleChange('preferred_contact', e.target.value)}
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
                    onChange={(e) => handleChange('message', e.target.value)}
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
                      <>Sending Message...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Meeting Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Meeting Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-loyal-blue" />
                  <div>
                    <p className="font-medium">Every {clubInfo.meetingDay}</p>
                    <p className="text-sm text-cool-gray-600">Weekly meetings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-loyal-blue" />
                  <div>
                    <p className="font-medium">7:00 PM - 8:30 PM</p>
                    <p className="text-sm text-cool-gray-600">90 minutes</p>
                  </div>
                </div>
                <div className="bg-happy-yellow/10 border border-happy-yellow/20 rounded-lg p-4 mt-4">
                  <p className="text-sm font-medium text-loyal-blue mb-1">
                    First-time guests attend FREE!
                  </p>
                  <p className="text-xs text-cool-gray-600">
                    No registration required - just show up and discover what we're about.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location & Directions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{clubInfo.location.venue}</p>
                  <p className="text-cool-gray-600">
                    {clubInfo.location.address}<br />
                    {clubInfo.location.city}, {clubInfo.location.state} {clubInfo.location.zipCode}
                  </p>
                </div>

                {clubInfo.location.directions && (
                  <div className="bg-cool-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-loyal-blue mb-1">Directions:</p>
                    <p className="text-sm text-cool-gray-600">{clubInfo.location.directions}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {clubInfo.location.parkingInfo && (
                    <div className="flex items-start space-x-2">
                      <Car className="h-4 w-4 text-loyal-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Parking</p>
                        <p className="text-xs text-cool-gray-600">{clubInfo.location.parkingInfo}</p>
                      </div>
                    </div>
                  )}

                  {clubInfo.location.accessibilityInfo && (
                    <div className="flex items-start space-x-2">
                      <Accessibility className="h-4 w-4 text-loyal-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Accessibility</p>
                        <p className="text-xs text-cool-gray-600">{clubInfo.location.accessibilityInfo}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Open in Maps
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
                  <p className="text-sm text-cool-gray-600 mb-2">Follow us on social media:</p>
                  <div className="flex space-x-3">
                    {clubInfo.socialMedia.facebook && (
                      <a
                        href={clubInfo.socialMedia.facebook}
                        className="text-loyal-blue hover:text-loyal-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </a>
                    )}
                    {clubInfo.socialMedia.linkedin && (
                      <a
                        href={clubInfo.socialMedia.linkedin}
                        className="text-loyal-blue hover:text-loyal-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {clubInfo.socialMedia.instagram && (
                      <a
                        href={clubInfo.socialMedia.instagram}
                        className="text-loyal-blue hover:text-loyal-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-cool-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-loyal-blue mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-cool-gray-600">
              Quick answers to common questions about visiting our club.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Do I need to register to attend?",
                answer: "No registration required! Just show up on any Tuesday at 7:00 PM. First-time guests attend free."
              },
              {
                question: "What should I expect at my first meeting?",
                answer: "You'll be warmly welcomed, given a brief introduction to Toastmasters, and can observe our structured meeting format."
              },
              {
                question: "Will I have to speak at my first meeting?",
                answer: "Absolutely not! You can observe and participate at your comfort level. There's no pressure to speak until you're ready."
              },
              {
                question: "How much does membership cost?",
                answer: `New member fee is $${clubInfo.membershipFees.newMember}, with annual renewals at $${clubInfo.membershipFees.renewalFee}. This includes all Toastmasters materials and resources.`
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cool-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}