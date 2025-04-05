/** @type {import('tailwindcss').Config} */
import radioAspect from "@tailwindcss/aspect-ratio";
import tailwindScrollbar from "tailwind-scrollbar";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [radioAspect, tailwindScrollbar,],
}