/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#b2b2ac',
        customLightGray: '#f5f6f6', // Add your custom color here
      },
    },
  },
  plugins: [],
}
