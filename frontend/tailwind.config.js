/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        kinfolk: ['Kinfolk',  'sans-serif'],
        cormorant: ['Cormorant',  'sans-serif'],
        tiempos: ['Tiempos', 'sans-serif'],
        graphikBold: ['Graphik-bold', 'sans-serif'],
        graphikSemiBold: ['Graphik-semi-bold', 'sans-serif'],
        graphik: ['Graphik', 'sans-serif'],
        product: ['Product', 'sans-serif'],
        roboto: ['var(--font-roboto)'],
      },
    },
    screens: {
      ts: "360px",
      xs: "375px",
      ss: "620px",
      sm: "770px",
      md: "900px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
