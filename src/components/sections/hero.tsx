import { Button } from '@/components/ui/button'
import { Calendar, Users, Award, ArrowRight, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-loyal-blue to-loyal-blue-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-opacity-10">
                <svg className="absolute inset-0 h-full w-full" fill="white" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
                            Where Leaders Are{' '}
                            <span className="text-happy-yellow font-script text-4xl sm:text-5xl lg:text-7xl block lg:inline">
                Made
              </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl animate-slide-up">
                            Develop your communication and leadership skills in a supportive,
                            encouraging environment. Join Excellence Speakers Toastmasters Club
                            and discover your potential.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link href="/meetings">
                                <Button size="lg" variant="accent" className="text-base">
                                    Join Our Next Meeting
                                    <Calendar className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button size="lg" variant="secondary" className="text-base">
                                    Learn More About Us
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-happy-yellow">50+</div>
                                <div className="text-sm text-blue-200">Active Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-happy-yellow">100+</div>
                                <div className="text-sm text-blue-200">Meetings Held</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-happy-yellow">5</div>
                                <div className="text-sm text-blue-200">Years Strong</div>
                            </div>
                        </div>
                    </div>

                    {/* Meeting Info Card */}
                    <div className="relative">
                        <div className="bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-6 lg:p-8">
                            <div className="text-center">
                                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-happy-yellow rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <Users className="h-10 w-10 lg:h-12 lg:w-12 text-loyal-blue" />
                                </div>

                                <h3 className="text-xl lg:text-2xl font-semibold mb-4">Next Meeting</h3>

                                <div className="space-y-3 text-blue-100">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Every Tuesday</span>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2">
                                        <Clock className="h-4 w-4" />
                                        <span>7:00 PM - 8:30 PM</span>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>Community Center</span>
                                    </div>
                                </div>

                                <Link href="/contact">
                                    <Button className="mt-6 w-full" variant="accent">
                                        Get Directions
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}