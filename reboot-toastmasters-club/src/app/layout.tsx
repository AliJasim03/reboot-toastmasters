import type { Metadata } from 'next'
import { Montserrat, Source_Sans_3, Corinthia } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-source-sans',
    display: 'swap',
})

const corinthia = Corinthia({
    subsets: ['latin'],
    variable: '--font-corinthia',
    weight: ['400', '700'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'Excellence Speakers Toastmasters Club',
        template: '%s | Excellence Speakers'
    },
    description: 'Develop your communication and leadership skills in a supportive environment. Join Excellence Speakers Toastmasters Club - Where Leaders Are Made.',
    keywords: ['Toastmasters', 'Public Speaking', 'Leadership', 'Communication', 'Personal Development'],
    authors: [{ name: 'Excellence Speakers Toastmasters Club' }],
    creator: 'Excellence Speakers Toastmasters Club',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://excellence-speakers.toastmasters.org',
        title: 'Excellence Speakers Toastmasters Club',
        description: 'Develop your communication and leadership skills in a supportive environment.',
        siteName: 'Excellence Speakers Toastmasters Club',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Excellence Speakers Toastmasters Club',
        description: 'Develop your communication and leadership skills in a supportive environment.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${montserrat.variable} ${sourceSans.variable} ${corinthia.variable}`}>
        <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    )
}