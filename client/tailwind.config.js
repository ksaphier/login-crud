/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        // Custom max-width
        "80%": "80%",
        "navbar": "90%",
      },
    },
  },
  plugins: [],
};
