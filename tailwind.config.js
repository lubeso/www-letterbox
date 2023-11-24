/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./archetypes/**/*.html",
    "./content/**/*.html",
    "./layouts/**/*.html",
    "./hugo_stats.json",
  ],
  theme: {
    extend: {
      fontFamily: ["Domine", "serif"],
    },
  },
  plugins: [],
}
