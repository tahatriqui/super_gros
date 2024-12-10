/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        "xl-custom": "1400px", // Custom breakpoint
      },
    },
    // Define your standard breakpoints here (optional)
    screens: {
      lg: { min: "925px" },
    },
  },
  plugins: [],
};
