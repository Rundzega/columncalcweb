module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brandGreen: {
          300: '#71C562'
        },
        brandBlue: {
          300: '#6271C5'
        },
        brandPurple: {
          100: '#6E4C75',
          300: '#8E3A9D',
          400: '#9C32AF'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
  variants: {
    extend: {
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
      backgroundColor: ['disabled'],
      opacity: ['disabled']
  },
  },
}
