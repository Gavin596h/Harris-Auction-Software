/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira: ["Fira Sans Condensed", "sans-serif"],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}

