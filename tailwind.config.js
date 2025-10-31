/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'buytrade-purple': '#6B46C1',
        'buytrade-dark': '#1F2937',
        'buytrade-teal': '#14B8A6',
        'buytrade-cyan': '#06B6D4',
      },
      backgroundImage: {
        'buytrade-gradient': 'linear-gradient(135deg, #6B46C1 0%, #14B8A6 100%)',
        'buytrade-hero': 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)',
        'buytrade-dark-gradient': 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
      }
    },
  },
  plugins: [],
}