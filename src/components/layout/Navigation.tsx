'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Members', href: '/members' },
    { name: 'Meetings', href: '/meetings' },
    { name: 'Events', href: '/events' },
    { name: 'Join Us', href: '/join' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white shadow-lg border-b-2 border-loyal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Club Name */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/toastmasters-logo.png"
                alt="Toastmasters International"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-xl text-loyal">
                  Reboot Toastmasters
                </span>
                <p className="text-xs text-maroon font-medium">
                  Where Leaders Are Made
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium font-heading transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-loyal text-white'
                      : 'text-loyal hover:bg-loyal hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/join"
              className="bg-maroon hover:bg-rich-maroon text-white px-4 py-2 rounded-md text-sm font-medium font-heading transition-colors duration-200 shadow-md"
            >
              Visit Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-loyal inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow hover:bg-blissful-blue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-fair-gray border-t border-gray">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium font-heading transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-loyal text-white'
                    : 'text-loyal hover:bg-loyal hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/join"
                className="block w-full text-center bg-maroon hover:bg-rich-maroon text-white px-4 py-2 rounded-md text-base font-medium font-heading transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation