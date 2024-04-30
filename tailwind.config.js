/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,css}",
  ],

  theme: {
    colors : {
      "white" : "#f2f2f2",
      "bordo": "#6d0606",
      "mostaza" : "#d8ae15",
      "red" : "#f30e0e",
      "diente" : "#f6c202"
    },
 
    fontFamily :{
      display: ["Montserrat", "sans-serif"],
    },
    extend: {
    
    },
  },
  plugins: [],
}

