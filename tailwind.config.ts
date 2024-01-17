import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      blue: {
        25: '#fcfcfd',
        50: '#f8f9fc',
        100: '#eaecf5',
        200: '#d5d9eb',
        300: '#b3b8db',
        400: '#717bbc',
        500: '#4e5ba6', // primary
        600: '#3e4784',
        700: '#363f72',
        800: '#293056',
        900: '#101323',
        950: '#0d0f1c',
      },
      grey: {
        25: '#fcfcfd',
        50: '#f9fafb',
        100: '#f2f4f7',
        200: '#eaecf0',
        300: '#d0d5dd',
        400: '#98a2b3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1d2939',
        900: '#101828',
        950: '#0c111d',
      },
      red: {
        25: '#fffbfa',
        50: '#fef3f2',
        100: '#fee4e2',
        200: '#fecdca',
        300: '#fda29b',
        400: '#f97066',
        500: '#f04438',
        600: '#d92d20',
        700: '#b42318',
        800: '#912018',
        900: '#7a271a',
        950: '#55160c',
      },
      green: {
        25: '#f6fef9',
        50: '#ecfdf3',
        100: '#dcfae6',
        200: '#abefc6',
        300: '#75e0a7',
        400: '#47cd89',
        500: '#17b26a',
        600: '#079455',
        700: '#067647',
        800: '#085d3a',
        900: '#074d31',
        950: '#053321',
      },
      primary: '#4e5ba6',
      destructive: '#f04438',
      success: '#17b26a',
      input: '#d0d5dd', // grey-300,
      'light-grey': '#98a2b3', // grey-400
      'medium-grey': '#667085', // grey-500
      'dark-grey': '#344054', // grey-700
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
