import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        blue: '#C9DBF8',
        green: '#D9EAD3',
        yellow: '#FFF3CC',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
}
