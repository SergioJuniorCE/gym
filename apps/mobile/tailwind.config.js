/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e', // Dark purple background
          light: '#2d2d44', // Lighter purple for cards
          dark: '#3d3d54', // Darker purple for borders
        },
        accent: {
          DEFAULT: '#22c55e', // Green accent
          light: '#4ade80', // Lighter green
          dark: '#16a34a', // Darker green
        },
        surface: {
          DEFAULT: '#2d2d44', // Card background
          light: '#3d3d54', // Lighter surface
          dark: '#1a1a2e', // Darker surface
        },
      },
    },
  },
  plugins: [],
};
