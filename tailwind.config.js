/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#510087",
        customWhite: "#e9ecef",
        customBlack: "#02010a",
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        Lato: ['Lato', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
