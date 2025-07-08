// src/app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="font-body min-h-screen flex items-center justify-center bg-fair-gray">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <Image
            src="/toastmasters-logo.png"
            alt="Toastmasters International"
            width={80}
            height={80}
            className="mx-auto mb-6 opacity-50"
          />
          <div className="text-6xl font-bold font-heading text-loyal mb-4">404</div>
          <h1 className="text-2xl font-bold font-heading text-loyal mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-loyal hover:bg-blissful-blue text-white px-6 py-3 rounded-md font-semibold font-heading transition-colors"
          >
            Return Home
          </Link>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/about"
              className="flex-1 border border-loyal text-loyal hover:bg-loyal hover:text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors text-center"
            >
              About Us
            </Link>
            <Link
              href="/meetings"
              className="flex-1 border border-loyal text-loyal hover:bg-loyal hover:text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors text-center"
            >
              Meetings
            </Link>
            <Link
              href="/join"
              className="flex-1 border border-loyal text-loyal hover:bg-loyal hover:text-white px-4 py-2 rounded-md font-semibold font-heading transition-colors text-center"
            >
              Join Us
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>If you think this is an error, please contact us at:</p>
          <a href="mailto:info@excellence-speakers.org" className="text-loyal hover:text-blissful-blue underline">
            info@excellence-speakers.org
          </a>
        </div>
      </div>
    </div>
  )
}