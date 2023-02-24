const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p) => path.join(__dirname, p)

/** @type {import('tailwindcss').Config} */
module.exports = {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],

  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1500px',
    },
    colors: {
      // color scheme is defined in /app.css
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      gray: {
        storm: 'var(--color-grey-storm)',
        overcast: 'var(--color-grey-overcast)',
        broken: 'var(--color-grey-broken)',
        scattered: 'var(--color-grey-scattered)',
        few: 'var(--color-grey-few)',
      },
      blue: {
        light: 'var(--color-light-blue)',
        lightmorning: 'var(--color-lightmorning-blue)',
        afternoon: 'var(--color-afternoon-blue)',
        schiphol: 'var(--color-schiphol-blue)',
      },
      pink: {
        lightmorning: 'var(--color-lightmorning-pink)',
        morning: 'var(--color-morning-pink)',
        evening: 'var(--color-evening-pink)',
        'evening-lilac': 'var(--color-evening-lilac)',
      },
      dusk: {
        green: 'var(--color-dusk-green)',
        blue: 'var(--color-dusk-blue)',
      },
      red: {
        DEFAULT: 'var(--color-dark-red)',
      },
      green: {
        DEFAULT: 'var(--color-green)',
        light: 'var(--color-light-green)',
      },
      yellow: {
        light: 'var(--color-light-yellow)',
        seebuyfly: 'var(--color-seebuyfly-yellow)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Neue Frutiger', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '7xl': '60rem', // container width (960px)
      },
      spacing: {
        '8vw': '8vw', // page margin
      },
      backgroundImage: {
        'gradient-flights': 'var(--gradient-flights)',
        'gradient-parking': 'var(--gradient-parking)',
        'gradient-at-schiphol': 'var(--gradient-at-schiphol)',
        'gradient-more': 'var(--gradient-more)',
        'gradient-privium': 'var(--gradient-privium)',
      },
    },
  },
}
