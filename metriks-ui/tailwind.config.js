/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2F80ED",   // Brand blue
        accent: "#56CCF2",
        light: "#F8FAFC",
        dark: "#1F2937"
      }
    }
  },
  plugins: [],
}