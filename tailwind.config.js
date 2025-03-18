import scrollbarHide from "tailwind-scrollbar-hide"

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "noto-sc": ['"Noto Sans SC"', "sans-serif"]
      }
    }
  },
  plugins: [scrollbarHide]
}
