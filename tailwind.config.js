module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Public Sans', 'sans-serif'],
      logo: ['Quantico', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        purple: {
          light: '#bdbde7',
          DEFAULT: '#4b4261',
          dark: '#9595bc',
          darkest: '#3e3e70',
        },
        gray: {
          lightest: '#e1e5ee',
          light: '#f0f2f7',
          DEFAULT: '#b3bacc',
        },
        yellow: {
          lightest: '#fae3c3',
          light: '#f3daba',
          dark: '#d49544',
        },
      },
      spacing: {
        1.2: '0.31rem',
        3.6: '0.93rem',
        8.5: '2.18rem',
        9.5: '2.81rem',
        225: '225px',
      },
      borderRadius: {
        '1.2xl': '0.43rem',
      },
      borderColor: (theme) => ({
        yellow: theme('colors.yellow.lightest'),
        purple: theme('colors.purple.light'),
        gray: theme('colors.gray.light'),
        gray_lightest: theme('colors.gray.lightest'),
      }),
      divideColor: (theme) => ({
        gray_lightest: theme('colors.gray.lightest'),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
