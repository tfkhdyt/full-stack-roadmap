module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/data.js',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'gradient-xy': 'gradient-xy 2s linear infinite',
        'pop-out': 'pop-out 0.25s ease-in-out'
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'pop-out': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.375)',
          },
        },
      },
    },
    fontFamily: {
      sans: ['Source Sans Pro'],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|shadow|text|ring|fill|from|to)-*-*\/*/,
      variants: ['hover', 'selection'],
    },
  ],
}
