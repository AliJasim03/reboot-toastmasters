// src/app/admin/layout.tsx
import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminLayoutWrapper({
                                             children,
                                           }: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}

// src/components/PublicLayout.tsx
'use client'

import Navigation from '@/components/Navigation'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-loyal text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Club Info */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-4 text-yellow">Reboot Toastmasters Club</h3>
              <p className="text-sm text-gray-200 mb-2">Where Leaders Are Made</p>
              <p className="text-sm text-gray-300">
                Building confidence and communication skills through public speaking and leadership development.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-4 text-yellow">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Our Club</a></li>
                <li><a href="/meetings" className="text-gray-300 hover:text-white transition-colors">Meeting Schedule</a></li>
                <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Upcoming Events</a></li>
                <li><a href="/join" className="text-gray-300 hover:text-white transition-colors">Join as Guest</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-4 text-yellow">Contact Us</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>📧 info@excellence-speakers.org</p>
                <p>📅 Every Tuesday, 7:00 PM</p>
                <p>📍 Meeting Location TBD</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blissful-blue mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Reboot Toastmasters Club. All rights reserved.</p>
            <p className="mt-2 text-xs">
              "The information on this website is for the sole use of Toastmasters' members, for Toastmasters business only.
              It is not to be used for solicitation and distribution of non-Toastmasters material or information."
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Updated src/app/layout.tsx - Clean server component
import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Corinthia, Luxurious_Script } from "next/font/google";
import "./globals.css";

// Configure all fonts with the 'variable' option
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-source-sans-3' });
const corinthia = Corinthia({ subsets: ["latin"], weight: '700', variable: '--font-corinthia' });
const luxuriousScript = Luxurious_Script({ subsets: ["latin"], weight: '400', variable: '--font-luxurious-script' });

export const metadata: Metadata = {
  title: "Reboot Toastmasters Club",
  description: "Where Leaders Are Made - Join Reboot Toastmasters Club for public speaking, leadership development, and personal growth in a supportive environment.",
  keywords: "toastmasters, public speaking, leadership, communication skills, personal development",
  authors: [{ name: "Reboot Toastmasters Club" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${montserrat.variable} ${sourceSans3.variable} ${corinthia.variable} ${luxuriousScript.variable} font-body antialiased bg-fair-gray text-rich-black`}>
    {children}
    </body>
    </html>
  );
}