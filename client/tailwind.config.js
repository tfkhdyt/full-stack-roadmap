module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/data.js'
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|shadow|text|ring)-.+-.+\/.+/,
      variants: ['selection'],
    },
  ],
}
