/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Official Toastmasters International Brand Colors
        'toastmasters': {
          'blue': {
            DEFAULT: '#004165', // Pantone 302 - Loyal Blue (Primary)
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
          'maroon': {
            DEFAULT: '#772432', // Pantone 188 - True Maroon (Secondary)
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
          'gray': {
            DEFAULT: '#A9B2B1', // Pantone 442 - Cool Gray (Neutral)
            50: '#f8f9f9',
            100: '#f1f3f2',
            200: '#e3e7e6',
            300: '#d5dbd9',
            400: '#c7cfcc',
            500: '#A9B2B1', // Main brand color
            600: '#8a9592',
            700: '#6b7773',
            800: '#4c5a54',
            900: '#2d3c35',
          },
        },
        // Semantic colors using Toastmasters palette
        primary: {
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
        secondary: {
          DEFAULT: '#772432',
          50: '#fdf2f3',
          100: '#fce7e8',
          200: '#f9d2d5',
          300: '#f4aeb3',
          400: '#ec7d87',
          500: '#e1515e',
          600: '#cd3545',
          700: '#ab2535',
          800: '#772432',
          900: '#651e2a',
        },
        accent: {
          DEFAULT: '#A9B2B1',
          50: '#f8f9f9',
          100: '#f1f3f2',
          200: '#e3e7e6',
          300: '#d5dbd9',
          400: '#c7cfcc',
          500: '#A9B2B1',
          600: '#8a9592',
          700: '#6b7773',
          800: '#4c5a54',
          900: '#2d3c35',
        },
        // Happy Yellow (Official Toastmasters Accent Color)
        'happy-yellow': {
          DEFAULT: '#F2DF74', // Pantone 127
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#F2DF74', // Main brand color
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Official Toastmasters Gradient Colors
        'blissful-blue': {
          DEFAULT: '#006094', // Used in Loyal Blue gradients
          50: '#e6f3ff',
          100: '#cce6ff',
          200: '#99ccff',
          300: '#66b3ff',
          400: '#3399ff',
          500: '#006094',
          600: '#005080',
          700: '#00406b',
          800: '#003056',
          900: '#002041',
        },
        'rich-maroon': {
          DEFAULT: '#781327', // Used in True Maroon gradients
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d9',
          300: '#f4aebb',
          400: '#ec7d95',
          500: '#781327',
          600: '#6b1122',
          700: '#5e0f1d',
          800: '#510d19',
          900: '#440b14',
        },
        'deep-maroon': {
          DEFAULT: '#3B0104', // Used in True Maroon gradients
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d2d2',
          300: '#f4aeb0',
          400: '#ec7d81',
          500: '#e15156',
          600: '#cd3540',
          700: '#ab2530',
          800: '#3B0104',
          900: '#320103',
        },
        'fair-gray': {
          DEFAULT: '#F5F5F5', // Used in Cool Gray gradients
          50: '#ffffff',
          100: '#fefefe',
          200: '#fafafa',
          300: '#f7f7f7',
          400: '#f5f5f5',
          500: '#F5F5F5', // Main brand color
          600: '#e5e5e5',
          700: '#d4d4d4',
          800: '#a3a3a3',
          900: '#737373',
        },
        // Additional semantic colors
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      // Official Toastmasters Gradient Backgrounds
      backgroundImage: {
        // Loyal Blue Gradients (official brand gradients)
        'loyal-blue-gradient': 'linear-gradient(180deg, #004165 0%, #006094 100%)',
        'loyal-blue-gradient-reverse': 'linear-gradient(0deg, #004165 0%, #006094 100%)',
        'loyal-blue-gradient-horizontal': 'linear-gradient(90deg, #004165 0%, #006094 100%)',
        'loyal-blue-gradient-horizontal-reverse': 'linear-gradient(270deg, #004165 0%, #006094 100%)',
        'loyal-blue-radial': 'radial-gradient(circle, #004165 0%, #006094 100%)',

        // True Maroon Gradients (official brand gradients)
        'true-maroon-gradient': 'linear-gradient(180deg, #3B0104 0%, #781327 100%)',
        'true-maroon-gradient-reverse': 'linear-gradient(0deg, #3B0104 0%, #781327 100%)',
        'true-maroon-gradient-horizontal': 'linear-gradient(90deg, #3B0104 0%, #781327 100%)',
        'true-maroon-gradient-horizontal-reverse': 'linear-gradient(270deg, #3B0104 0%, #781327 100%)',
        'true-maroon-radial': 'radial-gradient(circle, #3B0104 0%, #781327 100%)',

        // Cool Gray Gradients (official brand gradients)
        'cool-gray-gradient': 'linear-gradient(180deg, #A9B2B1 0%, #F5F5F5 100%)',
        'cool-gray-gradient-reverse': 'linear-gradient(0deg, #A9B2B1 0%, #F5F5F5 100%)',
        'cool-gray-gradient-horizontal': 'linear-gradient(90deg, #A9B2B1 0%, #F5F5F5 100%)',
        'cool-gray-gradient-horizontal-reverse': 'linear-gradient(270deg, #A9B2B1 0%, #F5F5F5 100%)',
        'cool-gray-radial': 'radial-gradient(circle, #A9B2B1 0%, #F5F5F5 100%)',

        // Toastmasters Brand Combinations
        'toastmasters-hero': 'linear-gradient(135deg, #004165 0%, #006094 50%, #772432 100%)',
        'toastmasters-overlay': 'linear-gradient(rgba(0, 65, 101, 0.9), rgba(0, 96, 148, 0.8))',
        'toastmasters-subtle': 'linear-gradient(to right, #F5F5F5 0%, #A9B2B1 100%)',

        // Transparency overlays (from brand manual)
        'white-overlay-70': 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))',
        'loyal-blue-overlay-70': 'linear-gradient(rgba(0, 65, 101, 0.7), rgba(0, 65, 101, 0.7))',
        'true-maroon-overlay-70': 'linear-gradient(rgba(119, 36, 50, 0.7), rgba(119, 36, 50, 0.7))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'toastmasters': '0 4px 20px 0 rgb(0 65 101 / 0.15)', // Using Toastmasters blue
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}