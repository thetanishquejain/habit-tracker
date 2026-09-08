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
        // Habit category colors
        category: {
          health: '#10b981',      // green-500
          fitness: '#3b82f6',     // blue-500
          productivity: '#a855f7', // purple-500
          learning: '#eab308',    // yellow-500
          mindfulness: '#ec4899', // pink-500
          social: '#6366f1',      // indigo-500
          other: '#6b7280',       // gray-500
        },
      },
    },
  },
  plugins: [],
}
