/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./tailwind/build/*.html'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
    },
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          DEFAULT: '#0fa9e6',
          dark: '#0c87b8',
        },
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
      },
    }
  
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
