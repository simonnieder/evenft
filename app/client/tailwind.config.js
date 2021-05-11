module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screen:{
        '2xl': '1536px'
      },
      fontFamily: {
        header: ["DM Sans", "ui-serif"],
        body: ["Poppins", "ui-serif"],
      },
      colors: {
        neutrals: {
          100: "#FCFCFD",
          200: "#F4F5F6",
          300: "#E6E8EC",
          400: "#B1B5C3",
          500: "#777E90",
          600: "#353945",
          700: "#23262F",
          800: "#141416",
        },
        primary: {
          blue: "#3772FF",
          lightblue:"#5285ff",
          purple: "#9757D7",
          red: "#EF466F",
          green: "#45B26B",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
