/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec0ff',
          400: '#599cff',
          500: '#3479fb',
          600: '#205bef',
          700: '#1947d6',
          800: '#1b3cab',
          900: '#1c3787',
        },
        ink: {
          900: '#0b1220',
          700: '#1f2a44',
          500: '#475569',
          300: '#94a3b8',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(15, 23, 42, 0.18)',
        glow: '0 20px 60px -20px rgba(52, 121, 251, 0.55)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
