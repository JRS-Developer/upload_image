const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      neutral: colors.neutral,
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      green: colors.green,

      primary: "#2F80ED",
      success: "#219653",
      gray: {
        2: "#4F4F4F",
        3: "#828282",
        4: "#BDBDBD",
        5: "#E0E0E0",
        6: "#F2F2F2",
      },
    },
    extend: {
      boxShadow: {
        md: "0px 4px 12px 0px #0000001A",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        indeterminate:
          "indeterminate 2s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
      },
      keyframes: {
        indeterminate: {
          "0%": {
            left: "-35%",
            right: "100%",
          },
          "60%": {
            left: "100%",
            right: "-90%",
          },
          "100%": {
            left: "100%",
            right: "-90%",
          },
        },
      },
    },
  },
  plugins: [],
};
