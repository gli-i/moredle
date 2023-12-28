/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        greenlight: 'rgb(100,209,67)',
        greenmed: 'rgb(78,146,57)',
        greendark: 'rgb(56,104,41)',
        yellowmed: 'rgb(255,170,121)',
        graylight: 'rgb(219,219,219)',
        graydark: 'rgb(97,95,95)',
        graydarker: 'rgb(80,76,76)',
        graydarkest: 'rgb(53,51,51)',
      },
      animation : {
        'shake-md': 'shakemed 0.3s',
        'shake-sm': 'shakesmall 0.3s',
        'blink': 'blink 0.5s',
      },
      keyframes : {
        shakemed : {
          '0%' : { transform: 'translateX(0)' },
          '25%' : { transform: 'translateX(30px)' },
          '50%' : { transform: 'translateX(-30px)' },
          '75%' : { transform: 'translateX(30px)' },
          '100%' : { transform: 'translateX(0)' },
        },
        shakesmall : {
          '0%' : { transform: 'translateX(0)' },
          '25%' : { transform: 'translateX(10px)' },
          '50%' : { transform: 'translateX(-10px)' },
          '75%' : { transform: 'translateX(10px)' },
          '100%' : { transform: 'translateX(0)' },
        },
        blink : {
          '25%' : { opacity: '0.5' },
          '50%' : { opacity: '0' },
          '75%' : { opacity: '0.5' },
        }
      },
    },
  },
  plugins: [],
}