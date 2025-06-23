import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
                body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
                script: ['var(--font-corinthia)', 'cursive'],
            },
            colors: {
                // Toastmasters Brand Colors (from brand manual)
                'loyal-blue': {
                    DEFAULT: '#004165',
                    50: '#e6f2ff',
                    100: '#cce5ff',
                    200: '#99ccff',
                    300: '#66b2ff',
                    400: '#3399ff',
                    500: '#0080ff',
                    600: '#004165',
                    700: '#003454',
                    800: '#002743',
                    900: '#001a32',
                },
                'happy-yellow': {
                    DEFAULT: '#F7D34A',
                    50: '#fefbf3',
                    100: '#fdf5dc',
                    200: '#fbeab8',
                    300: '#f8de94',
                    400: '#f6d270',
                    500: '#F7D34A',
                    600: '#f5c836',
                    700: '#e6b422',
                    800: '#d19f0f',
                    900: '#b8890d',
                },
                'cool-gray': {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            screens: {
                'xs': '475px',
                '3xl': '1680px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}

export default config