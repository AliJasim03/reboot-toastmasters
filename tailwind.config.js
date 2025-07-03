/** @type {import('tailwindcss').Config} */
module.exports = {
  // This file now ONLY defines the content paths.
  // The theme itself is configured in globals.css.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}