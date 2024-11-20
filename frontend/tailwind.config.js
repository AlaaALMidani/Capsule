/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        moveUpDown: 'moveUpDown 3s ease-in-out infinite', 
        'bg-animation': 'backgroundMove 0.5s ease forwards',  
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
      },
    },
  },
  plugins: [],
}
