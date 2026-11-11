/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f3',
          100: '#dceee3',
          200: '#bbddcb',
          300: '#8ec5ac',
          400: '#5da78a',
          500: '#3c8b6e',
          600: '#2c6f56',
          700: '#235846',
          800: '#174B38', // Brand Primary
          900: '#133e2f',
          950: '#09231a',
        },
        sage: {
          50: '#f6f9f5',
          100: '#ebf2e9',
          200: '#d8e5d4',
          300: '#bed4b8',
          400: '#A8C6A0', // Brand Secondary
          500: '#86aa7c',
          600: '#678c5d',
          700: '#516f49',
          800: '#43593d',
          900: '#384a34',
        },
        sand: {
          50: '#fdfdfb',
          100: '#F8F8F3', // Brand Warm Off-White
          200: '#eeeee3',
          300: '#dfdfcb',
          400: '#cbcbb0',
          500: '#b4b494',
        },
        gold: {
          50: '#fdfbf5',
          100: '#f9f4e4',
          200: '#f2e6bf',
          300: '#E6B85C', // Brand Accent Muted Golden Yellow
          400: '#d99e3a',
          500: '#c58424',
          600: '#aa661b',
        },
        charcoal: {
          DEFAULT: '#252A27', // Brand Text
          50: '#f6f7f6',
          100: '#e2e5e3',
          200: '#c4cbc6',
          300: '#9ea9a2',
          400: '#75837a',
          500: '#59655e',
          600: '#45504a',
          700: '#38413c',
          800: '#252A27',
          900: '#1c201e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'premium': '0 10px 30px -5px rgba(23, 75, 56, 0.08), 0 4px 12px -2px rgba(23, 75, 56, 0.03)',
        'glow': '0 0 25px rgba(230, 184, 92, 0.25)',
      }
    },
  },
  plugins: [],
}
