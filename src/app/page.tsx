// src/app/page.tsx - Updated Homepage with Real Data
import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/PublicLayout";
import { ClubStatsSection } from "@/components/ClubStatsSection";
import { UpcomingMeetingsSection } from "@/components/meetings/UpcomingMeetingsSection";

export default function Home() {
  return (
    <PublicLayout>
      <div className="font-body">
        {/* Hero Section - Brand Compliant */}
        <section className="bg-hero-loyal text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Image
              src="/toastmasters-logo.png"
              alt="Toastmasters International logo"
              width={120}
              height={120}
              priority
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance mb-4">
              Reboot Toastmasters Club
            </h1>
            <p className="text-yellow text-lg sm:text-xl text-balance mb-8">
              Where Leaders Are Made
            </p>
            <p className="text-lg sm:text-xl text-gray-200 text-balance mb-8 max-w-2xl mx-auto">
              Join us to practice public speaking, develop leadership skills, and have fun in a supportive environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="inline-block rounded-md bg-maroon hover:bg-rich-maroon text-white px-8 py-3 font-semibold font-heading shadow-lg transition-colors"
              >
                Visit as a Guest
              </Link>
              <Link
                href="/about"
                className="inline-block rounded-md border-2 border-white text-white hover:bg-white hover:text-loyal px-8 py-3 font-semibold font-heading transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Club Stats Section with Real Data */}
        <ClubStatsSection />

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-loyal mb-4">
                Why Choose Toastmasters?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Develop the skills you need to communicate effectively and lead with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-fair-gray hover-lift">
                <div className="w-16 h-16 bg-loyal rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-loyal mb-2">Public Speaking</h3>
                <p className="text-gray-600">Practice and improve your presentation skills in a supportive environment.</p>
              </div>

              <div className="text-center p-6 rounded-lg bg-fair-gray hover-lift">
                <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-maroon mb-2">Leadership</h3>
                <p className="text-gray-600">Develop leadership skills through club roles and project management.</p>
              </div>

              <div className="text-center p-6 rounded-lg bg-fair-gray hover-lift">
                <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-rich-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-6 0v8.001l2-1 2 1z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-rich-black mb-2">Personal Growth</h3>
                <p className="text-gray-600">Build confidence and achieve your personal and professional goals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Meetings Section with Real Data */}
        <UpcomingMeetingsSection />

        {/* CTA Section */}
        <section className="py-16 bg-maroon text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Take the first step towards becoming a confident speaker and effective leader.
              Visit us as a guest – no commitment required!
            </p>
            <Link
              href="/join"
              className="inline-block rounded-md bg-yellow hover:bg-yellow text-rich-black px-8 py-3 font-bold font-heading shadow-lg transition-colors hover:shadow-xl"
            >
              Visit Our Next Meeting
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
