/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A2517",
        soft: "#ACC8A2",
        darkbg: "#0F150E",
        card: "#1F2B1C",
      },
    },
  },
  plugins: [],
};
