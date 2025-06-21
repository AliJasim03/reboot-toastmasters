// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Toastmasters Brand Colors
                'loyal-blue': {
                    DEFAULT: '#004165',
                    50: '#e6f0f7',
                    100: '#cce1ef',
                    200: '#99c3df',
                    300: '#66a5cf',
                    400: '#3387bf',
                    500: '#004165',
                    600: '#003451',
                    700: '#00273d',
                    800: '#001a29',
                    900: '#000d15',
                },
                'true-maroon': {
                    DEFAULT: '#772432',
                    50: '#f5e8ea',
                    100: '#ebd1d5',
                    200: '#d7a3ab',
                    300: '#c37581',
                    400: '#af4757',
                    500: '#772432',
                    600: '#5f1d28',
                    700: '#47161e',
                    800: '#2f0e14',
                    900: '#17070a',
                },
                'cool-gray': {
                    DEFAULT: '#A9B2B1',
                    50: '#f7f8f8',
                    100: '#eef0f0',
                    200: '#dde1e0',
                    300: '#ccd2d1',
                    400: '#bbc3c1',
                    500: '#A9B2B1',
                    600: '#878f8e',
                    700: '#656b6a',
                    800: '#434747',
                    900: '#212323',
                },
                'happy-yellow': {
                    DEFAULT: '#F2DF74',
                    50: '#fefdfb',
                    100: '#fefbf7',
                    200: '#fcf6ef',
                    300: '#faf1e7',
                    400: '#f8ecdf',
                    500: '#F2DF74',
                    600: '#c2b25d',
                    700: '#918646',
                    800: '#61592f',
                    900: '#302d18',
                },
            },
            fontFamily: {
                // Primary: Gotham (fallback to Montserrat)
                'sans': ['Montserrat', 'system-ui', 'sans-serif'],
                // Body: Myriad Pro (fallback to Source Sans 3)
                'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
                // Script for special occasions
                'script': ['Corinthia', 'cursive'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
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