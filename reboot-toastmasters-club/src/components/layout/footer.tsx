import Link from 'next/link'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-loyal-blue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Club Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-happy-yellow rounded-full flex items-center justify-center">
                                <span className="text-loyal-blue font-bold text-lg">TM</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Excellence Speakers</h3>
                                <p className="text-blue-200">Toastmasters Club</p>
                            </div>
                        </div>
                        <p className="text-blue-100 mb-4 max-w-md">
                            Develop your communication and leadership skills in a supportive,
                            encouraging environment. Where Leaders Are Made.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-blue-200 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://linkedin.com" className="text-blue-200 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-blue-200 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/meetings" className="text-blue-200 hover:text-white transition-colors">Meetings</Link></li>
                            <li><Link href="/members" className="text-blue-200 hover:text-white transition-colors">Members</Link></li>
                            <li><Link href="/events" className="text-blue-200 hover:text-white transition-colors">Events</Link></li>
                            <li><Link href="/pathways" className="text-blue-200 hover:text-white transition-colors">Pathways</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-blue-200">
                                <Mail size={16} />
                                <span className="text-sm">info@excellence-speakers.org</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-200">
                                <Phone size={16} />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start space-x-2 text-blue-200">
                                <MapPin size={16} className="mt-0.5" />
                                <div className="text-sm">
                                    <p>Community Learning Center</p>
                                    <p>123 Excellence Blvd</p>
                                    <p>Your City, YS 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-blue-600 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-blue-200 text-sm">
                            © 2024 Excellence Speakers Toastmasters Club. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-blue-200 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-blue-200 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>

                    {/* Required Toastmasters Disclaimer */}
                    <div className="mt-6 pt-6 border-t border-blue-600">
                        <p className="toastmasters-disclaimer">
                            "The information on this website is for the sole use of Toastmasters' members,
                            for Toastmasters business only. It is not to be used for solicitation and
                            distribution of non-Toastmasters material or information."
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}