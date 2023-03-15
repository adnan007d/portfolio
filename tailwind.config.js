/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#8956f1",
        secondary: "#cb80ff",
      },
    },
    boxShadow: {
      banner: "1px 1px 7px 30px",
    },
  },
  plugins: [],
};
