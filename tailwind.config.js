/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      fontFamily:{
        orbitron: ["Orbitron", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"]
      },
      colors: {
        darkGrey: "#4e5156",
        lightGrey: "rgb(23,23,23)"
      }
    },
  },
  plugins: [],
}
