/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'olive': '#B5A279',
        'creme' : '#ECDAC2',
        'brown' : '#483113',
        'grey' : '#9B9186'
      }
    },
  },
  plugins: [],
}