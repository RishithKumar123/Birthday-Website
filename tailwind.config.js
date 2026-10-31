/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        rosegold: {
          light: '#fce8eb',
          DEFAULT: '#b76e79',
          dark: '#9c535e',
          shimmer: '#e0a9af',
          deep: '#733841',
        },
        champagne: {
          light: '#fff9ed',
          DEFAULT: '#f7e7ce',
          dark: '#d4af37',
          gold: '#e5c158',
          rich: '#c59b27',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ece1',
          300: '#ede1d0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-rose': '0 0 25px -3px rgba(183, 110, 121, 0.45)',
        'glow-gold': '0 0 30px -4px rgba(212, 175, 55, 0.45)',
        'luxury': '0 15px 35px -5px rgba(183, 110, 121, 0.18), 0 5px 15px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(212, 175, 55, 0.95))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
