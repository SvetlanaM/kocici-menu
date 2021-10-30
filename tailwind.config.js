/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Public Sans', 'sans-serif'],
      logo: ['Public Sans', 'sans-serif'],
    },
    flex: {
      auto: '0 0 auto',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        purple: {
          light: '#9F9FC6',
          DEFAULT: '#4b4261',
          dark: '#9595bc',
          darkest: '#3e3e70',
        },
        gray: {
          lightest: '#e1e5ee',
          light: '#f0f2f7',
          DEFAULT: '#A2A8B8',
          dark: '#65708D',
          600: '#B3BACC',
        },
        yellow: {
          lightest: '#EED4B2',
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
        200: '200px',
      },
      borderRadius: {
        '1.2xl': '0.43rem',
      },
      borderWidth: {
        1: '1px',
      },
      screens: {
        'xl-custom': '1240px',
        'xxl-custom': '1920px',
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
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  corePlugins: {
    outline: false,
  },
};
