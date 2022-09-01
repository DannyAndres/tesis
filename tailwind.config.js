/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './assets/**/*.{vue,js,ts,css}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      zinc: colors.zinc,
      sky: colors.sky,
      red: colors.red,
      gray: colors.gray,
      green: colors.green,
    },
  },
  plugins: [],
  darkMode: 'class',
};
