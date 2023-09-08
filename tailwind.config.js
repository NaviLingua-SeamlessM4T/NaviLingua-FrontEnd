/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-home": "url('/emigration.jpeg')",
      },
      zIndex: {
        100: "100",
      },
      colors: {
        customColor: "#DFDBDB",
        blueColor: "#0B5CA7",
        darkwhite: "#CCC6C6",
        secondbackground: "#0A0909",
        secondText: "#7C7272",
        footerbackground: "#0A0909",
        firstLogo: "#6C5744",
        secondLogo: "#DCCBCB",
        thirdLogo: "#DEDACB",
        altLogo: "#F1E6E6",
        darkPurple: "#593C79",
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],  // Add this line
        poppins: ["Poppins", "sans"],
        Gugi: ["Gugi", "sans"],
        Iceland: ["Iceland", "sans"],
        Bruno: ["Bruno Ace", "sans"],
        Inter: ["Inter", "sans"],
        Syne: ["Syne", "sans"],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'body': { fontFamily: 'Rajdhani, sans-serif' },  // Set Rajdhani as the default font
      });
    },
  ],
};
