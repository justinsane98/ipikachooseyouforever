/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'ping-slow': 'ping 1.5s linear infinite',
      },
      colors: {
        transparent: "transparent",
        white: {
          light: "#fff",
          DEFAULT: "#fff",
          dark: "#fff",
          90 : "rgba(255, 255, 255, 0.90)",
          75 : "rgba(255, 255, 255, 0.75)",
          50: "rgba(255, 255, 255, 0.5)",
          25: "rgba(255, 255, 255, 0.2)",
          10: "rgba(255, 255, 255, 0.1)",
          5: "rgba(255, 255, 255, 0.03)",
          1: "rgba(255, 255, 255, 0.01)"
        },
        black: {
          light: '#111',
          DEFAULT: "#000",
          dark: '#000000',
          90 : "rgba(0, 0, 0, 0.90)",
          75 : "rgba(0, 0, 0, 0.75)",
          50: "rgba(0, 0, 0, 0.5)",
          25: "rgba(0, 0, 0, 0.2)",
          10: "rgba(0, 0, 0, 0.1)"
        },
        red: "#E3170A",
        green: "#499F68",
        // pink: "#F00699",
        yellow: "#EED54E"
      },
    }
  },
  plugins: [],
}