/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./components/buttons/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#683AE6",
        primaryDark: "#4832CB",
        dark: '#1A1A1A',
        highlight: '#272727',
        'highlight-secondary': '#404040',
        'highlight-tertiary': '#5A5A5A',
        'ios-blue': '#007AFF',
      },
      borderRadius: {
        'primary': '20px',
      }
    },
  },
  plugins: [],
}

