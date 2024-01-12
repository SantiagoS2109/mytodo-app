/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Red Hat Display, monospace",
    },
    extend: {
      colors: {
        primary: "#1D6D81",
        "primary-darker": "#20596a",

        grey: "#e9ecef",
        "grey-darker": "#868e96",

        secondary: "#2f9e44",
      },
    },
  },
  plugins: [],
};
