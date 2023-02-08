/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{jsx,js}", "./app/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9100",
        black: "#000000",
        red: "#FF0000",
        grey: "#808080",
        grey100: "#3D3D3D",
        lightgrey: "#DADADA",
        orangecol: "#FF9100",
        transperent: "hsla(0,0%,100%,.08)",
      },
      backgroundColor: {
        blackcol: "#0A0704",
        orangecol: "#FF9100",
        lightcol: "#FFF2E3",
        lightbluecol: "#DEF1FF",
        lightgreencol: "#E0FFEB",
        darkgreencol: "#ABE7BF",
        white: {
          100: "#F7F7F7",
          200: "#fff",
          300: "#F7F8F9",
          400: "#FFF7EE",
          500: "#F1F3F5",
          600: "rgba(255,255,255,0.65)",
          700: "#EEEEEE",
          800: "#D8D8D8",
          900: "rgba(255,255,255,0.76)",
        },
        red: {
          600: "#DC3A34",
          700: "#B9302A",
        },
      },
      backgroundImage: {
        "p-bg": "url('~/images/p-bg.webp')",
        "nature-dark": "url('/nature-dark.jpg')",
      },
      boxShadow: {
        "8xl": "0 16px 25px 6px rgba(0,16,147,0.01)",
        "9xl": "0 16px 25px 6px rgba(0,16,147,0.02)",
        "10xl": "0 3px 12px 0 rgba(128,75,5,0.08)",
      },
      keyframes: {
        moveSlideshow: {
          "100%": { transform: "translateX(-1%)" },
        },
        wiggle: {
          "0%": { "background-position": "0% 15%" },
          "50%": { "background-position": "100% 80%" },
          "100%": { "background-position": "0% 15%" },
        },
      },
      fontSize: {},
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "4.375rem",
      },
      screens: {
        xl: "1280px",
      },
    },
    fontFamily: {
      gorditablack: ["gorditablack"],
      gorditabold: ["gorditabold"],
      gorditalight: ["gorditalight"],
      gorditamedium: ["gorditamedium"],
      gorditaregular: ["gorditaregular"],
      blancotrialbold: ["blanco_trialbold"],
      blancotrialextrabold: ["blanco_trialextra_bold"],
      blancotrialmedium: ["blanco_trialmedium"],
      blancotrialregular: ["blanco_trialregular"],
    },
  },
  plugins: [],
};
