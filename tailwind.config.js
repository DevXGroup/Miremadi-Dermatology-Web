/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFE4E6', // Light Pink
          DEFAULT: '#F43F5E', // Rose-500
          dark: '#9F1239',
        },
        secondary: {
          light: '#99F6E4', // Teal-200
          DEFAULT: '#14B8A6', // Turquoise/Teal
          dark: '#0F766E',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0F172A', // Slate-900
        },
        surface: {
          light: '#F8FAFC',
          dark: '#1E293B', // Slate-800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Restored user's original sans-serif font
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
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
      }
    },
  },
  plugins: [],
}
