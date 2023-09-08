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
        Rajdhani: ["Rajdhani", "sans-serif"],  // Add this line
        Poppins: ["Rajdhani", "Poppins"],
        Gugi: ["Rajdhani", "Gugi"],
        Iceland: ["Rajdhani", "Iceland"],
        Bruno: ["Rajdhani", "Bruno Ace"],
        Inter: ["Rajdhani", "Inter"],
        Syne: ["Rajdhani", "Syne"],
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
