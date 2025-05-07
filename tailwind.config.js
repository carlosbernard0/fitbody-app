/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        black: '#232323',
        white: '#ffffff',
        limegreen: '#E2F163',
        purple: '#896CFE',
        lightpurple: '#B3A0FF',
      },
      fontFamily: {
        poppins: ['Poppins_700Bold', 'sans-serif'],
        leaguespartan: ['LeagueSpartan_400Regular'],
      },
    },
  },
  plugins: [],
}
