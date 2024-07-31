// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        customWhite: "#FFFFFF",
        customPurple: "#AFA3FF",
        customLightGray1: "#F7F7F7",
        customLightGray2: "#F0F0F0",
        customBorderGray: "#CECECE",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
