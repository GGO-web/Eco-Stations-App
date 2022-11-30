/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#5CDB95',
        'light-green': '#8EE4AF',
        'light': 'rgba(237, 245, 225, 0.5)',
        'dark-green': '#379683',
        'dark': '#05386B',
      },
      gridTemplateColumns: {
        'auto-types': 'repeat(auto-fit, minmax(420px, 1fr))'
      }
    }
  },
  plugins: [],
}
