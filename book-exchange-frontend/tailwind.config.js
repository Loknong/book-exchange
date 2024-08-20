/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6600", // Bright Orange
          dark: "#CC5200", // Darker Orange
          light: "#FF9933", // Lighter Orange
        },
        secondary: {
          DEFAULT: "#1A202C", // Dark Navy Blue
          muted: "#2D3748", // Mid Navy Blue
        },
        neutral: {
          DEFAULT: "#E2E8F0", // Light Gray/Blue
          dark: "#CBD5E0", // Slightly Darker Gray/Blue
          light: "#F7FAFC", // Light Gray
        },
        success: {
          DEFAULT: "#38A169", // Green for Success
        },
        warning: {
          DEFAULT: "#ECC94B", // Yellow for Warning
        },
        danger: {
          DEFAULT: "#E53E3E", // Red for Danger
        },
        background: {
          DEFAULT: "#F7FAFC", // Light Gray Background
        },
        surface: {
          DEFAULT: "#FFFFFF", // Pure White for Surface Areas
        },
        text: {
          primary: "#1A202C", // Dark Navy Blue for Main Text
          secondary: "#4A5568", // Gray/Blue for Secondary Text
          muted: "#718096", // Muted Gray/Blue for Muted Text
        },
        border: {
          DEFAULT: "#CBD5E0", // Light Gray/Blue for Borders
          dark: "#A0AEC0", // Darker Gray/Blue for Prominent Borders
        },
      },
    },
  },
  plugins: [],
};
