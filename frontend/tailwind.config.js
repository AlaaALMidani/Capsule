/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        moveUpDown: 'moveUpDown 3s ease-in-out infinite', 
        backgroundMove: 'backgroundMove 0.5s ease forwards',  
        popup: 'popupAnimation 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards', 
      },
      keyframes: {
        moveUpDown: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)', 
          },
        },
        backgroundMove: {
          '0%': {
            backgroundPosition: 'center',
          },
          '50%': {
            backgroundPosition: 'center 20%',
          },
          '100%': {
            backgroundPosition: 'center', 
          },
        },

        popupAnimation: {
            '0%': { transform: 'scale(0.8)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
