/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slow-bounce': {
          '0%, 100%': { transform: 'translateY(-5%)' }, 
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slow-bounce': 'slow-bounce 5s infinite',
      },
    },
  },
  plugins: [],
} 

