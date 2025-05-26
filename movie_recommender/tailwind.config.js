/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Roboto Slab"', 'serif'],
      },
      colors: {
        'custom-purple': 'rgb(73, 1, 73)',
      },
      boxShadow: {
        'text-custom': '3px 3px 3px rgb(11, 4, 4)',
        'text-custom-footer': '2px 2px 2px rgba(89, 7, 47, 0.394)',
        'inner-custom': '2px 2px 3px rgba(255, 235, 235, 0.173) inset',
        'inner-custom-reverse': '-2px 2px 3px rgba(255, 235, 235, 0.173) inset',
        'inner-custom-dark': '2px 2px 3px rgba(255, 255, 255, 0.485) inset',
      },
      screens: {
        'xl': '1441px',
      },
    },
  },
  plugins: [],
}
