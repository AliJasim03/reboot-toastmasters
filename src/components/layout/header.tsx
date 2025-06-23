'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Calendar, Users, Award, Phone, Home, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigation = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About', href: '/about', icon: Info },
        { name: 'Meetings', href: '/meetings', icon: Calendar },
        { name: 'Members', href: '/members', icon: Users },
        { name: 'Events', href: '/events', icon: Award },
        { name: 'Pathways', href: '/pathways' },
        { name: 'Contact', href: '/contact', icon: Phone },
    ]

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/public" className="flex items-center space-x-3">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-loyal-blue rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg lg:text-xl">TM</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg lg:text-xl font-bold text-loyal-blue">
                                Excellence Speakers
                            </h1>
                            <p className="text-xs lg:text-sm text-cool-gray-600">
                                Toastmasters Club
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-cool-gray-700 hover:text-loyal-blue px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button size="sm">
                            Join Us
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-cool-gray-700 hover:text-loyal-blue"
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-cool-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-3 text-cool-gray-700 hover:text-loyal-blue block px-3 py-2 text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.icon && <item.icon size={20} />}
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                            <div className="px-3 py-2">
                                <Button size="sm" className="w-full">
                                    Join Us
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}