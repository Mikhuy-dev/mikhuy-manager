/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-img': 'slideInImg 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.2s ease-out',  // 👈 aquí agrego la animación del filtro
      },
      keyframes: {
        slideInImg: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideDown: {  // 👈 Aquí la animación del filtro
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
