/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        sender: "linear-gradient(45deg, #f3f2eb 0%, #322c2b 100%)",
      },
      colors: {
        secondary: {
          default: "#624981",
        },
        primary: {
          500:"#624981",
          400: "#7350a0",
          300: "#9c60ac",
          200: "#ef91c3",
          100:"#eeeaf9",
        },
        darks: {
          700: "#212121",
          600: "#2f2f2f",
          500: "#424242",
          400: "#322C2B",
        },
      },
      fontSize: {
        "h1-size": "40px",
        "h2-size": "32px",
        "h3-size": "24px",
        "h4-size": "20px",
        "b1-size": "16px",
        "b2-size": "14px",
        "b3-size": "15px",
        "b4-size": "13px",
        "s1-size": "12px",
        "s2-size": "10px",
      },
    },

    backgroundImage: {
      loginpage: "linear-gradient(90deg, #c9d6ff 0%, #e2e2e2 100%)!important",
      button:
        "linear-gradient(to right, #5E0BFF 0%, 18.083003952569168%, #8242FF 49.80237154150198%, 79.74308300395256%, #6516FF 100%)",
    },
  },
  plugins: [],
};
