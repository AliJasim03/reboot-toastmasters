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
                // Note: In Tailwind v4, use 'sans' and extend it, not custom names
                sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
                serif: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-corinthia)', 'cursive'],
            },
            colors: {
                // Official Toastmasters Brand Colors (from brand manual)
                'loyal-blue': {
                    DEFAULT: '#004165', // Pantone 302
                    50: '#e6f2ff',
                    100: '#cce5ff',
                    200: '#99ccff',
                    300: '#66b2ff',
                    400: '#3399ff',
                    500: '#0080ff',
                    600: '#004165', // Main brand color
                    700: '#003454',
                    800: '#002743',
                    900: '#001a32',
                },
                'true-maroon': {
                    DEFAULT: '#772432', // Pantone 188
                    50: '#fdf2f3',
                    100: '#fce7e8',
                    200: '#f9d2d5',
                    300: '#f4aeb3',
                    400: '#ec7d87',
                    500: '#e1515e',
                    600: '#cd3545',
                    700: '#ab2535',
                    800: '#772432', // Main brand color
                    900: '#651e2a',
                },
                'cool-gray': {
                    DEFAULT: '#A9B2B1', // Pantone 442 - Official Toastmasters gray
                    50: '#f8f9f9',
                    100: '#f1f3f2',
                    200: '#e3e6e5',
                    300: '#d0d5d4',
                    400: '#a9b2b1', // Main brand color
                    500: '#8b9695',
                    600: '#6f7b7a',
                    700: '#5a6564',
                    800: '#4a5453',
                    900: '#3f4645',
                },
                'happy-yellow': {
                    DEFAULT: '#F2DF74', // Pantone 127 - Official Toastmasters yellow
                    50: '#fefdf0',
                    100: '#fefce2',
                    200: '#fef7c6',
                    300: '#fdee9e',
                    400: '#f2df74', // Main brand color
                    500: '#ebc849',
                    600: '#d4a82c',
                    700: '#b18520',
                    800: '#8f671d',
                    900: '#77541d',
                },
                // Additional utility grays for UI components
                'ui-gray': {
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
            backgroundImage: {
                // Official Toastmasters Brand Gradients (from brand manual)
                'loyal-blue-gradient': 'linear-gradient(135deg, #004165 0%, #002743 100%)',
                'loyal-blue-gradient-light': 'linear-gradient(135deg, #cce5ff 0%, #004165 100%)',
                'loyal-blue-gradient-vertical': 'linear-gradient(180deg, #004165 0%, #002743 100%)',

                'true-maroon-gradient': 'linear-gradient(135deg, #772432 0%, #651e2a 100%)',
                'true-maroon-gradient-light': 'linear-gradient(135deg, #f9d2d5 0%, #772432 100%)',
                'true-maroon-gradient-vertical': 'linear-gradient(180deg, #772432 0%, #651e2a 100%)',

                'cool-gray-gradient': 'linear-gradient(135deg, #a9b2b1 0%, #6f7b7a 100%)',
                'cool-gray-gradient-light': 'linear-gradient(135deg, #f1f3f2 0%, #a9b2b1 100%)',
                'cool-gray-gradient-vertical': 'linear-gradient(180deg, #a9b2b1 0%, #6f7b7a 100%)',

                'happy-yellow-gradient': 'linear-gradient(135deg, #f2df74 0%, #d4a82c 100%)',
                'happy-yellow-gradient-light': 'linear-gradient(135deg, #fefce2 0%, #f2df74 100%)',
                'happy-yellow-gradient-vertical': 'linear-gradient(180deg, #f2df74 0%, #d4a82c 100%)',

                // Combined brand gradients for special occasions
                'toastmasters-primary': 'linear-gradient(135deg, #004165 0%, #772432 100%)', // Loyal Blue to True Maroon
                'toastmasters-accent': 'linear-gradient(135deg, #f2df74 0%, #004165 100%)', // Happy Yellow to Loyal Blue
                'toastmasters-hero': 'linear-gradient(135deg, #004165 0%, #002743 50%, #772432 100%)', // Multi-brand gradient

                // Subtle transparency gradients
                'loyal-blue-overlay': 'linear-gradient(135deg, rgba(0, 65, 101, 0.9) 0%, rgba(0, 39, 67, 0.95) 100%)',
                'true-maroon-overlay': 'linear-gradient(135deg, rgba(119, 36, 50, 0.9) 0%, rgba(101, 30, 42, 0.95) 100%)',
                'cool-gray-overlay': 'linear-gradient(135deg, rgba(169, 178, 177, 0.9) 0%, rgba(111, 123, 122, 0.95) 100%)',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            screens: {
                'xs': '475px',
                '3xl': '1680px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient-shift': 'gradientShift 8s ease-in-out infinite',
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
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
}

export default config