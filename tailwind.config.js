/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-kawaii': '#FFC2E2',
        'purple-dream': '#D4C2FF',
        'yellow-sunbeam': '#FFFAC2',
        'mint-fresh': '#C2FFD9',
        'text-dark': '#5C5470',
        'text-light': '#a39dae',
      },
      fontFamily: {
        'bubbly': ['"Comic Sans MS"', 'cursive'], // A placeholder for a cute font
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}