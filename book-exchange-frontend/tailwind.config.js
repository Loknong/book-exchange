/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          light: "#FFA726",
          DEFAULT: "#FB8C00",
          dark: "#EF6C00",
        },
        gray: {
          light: "#F5F5F5",
          DEFAULT: "#9E9E9E",
          dark: "#616161",
        },
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
