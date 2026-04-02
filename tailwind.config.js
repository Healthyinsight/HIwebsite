/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:         '#0F2A3F',
        blue:         '#1A4D6E',
        'blue-mid':   '#2D7DA8',
        'blue-light': '#5095AC',
        'blue-pale':  '#A8CCE0',
        sky:          '#D4EAF5',
        cream:        '#F5F2EC',
        warm:         '#FAFAF7',
        sand:         '#E8E2D8',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
