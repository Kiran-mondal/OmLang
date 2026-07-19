/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <-- এই লাইনটি যুক্ত করা হয়েছে
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
