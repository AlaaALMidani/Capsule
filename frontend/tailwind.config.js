/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        moveUpDown: 'moveUpDown 3s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
