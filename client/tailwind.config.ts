import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'bgHero':'url("/hero.svg")'
      },
      fontFamily:{
        us:["us","sans-serif"],
        ptMono:['ptMono','sans-serif']
        
      },
    },
    screens:{
      mobile:'320px',
      tablet:'728px',
      laptop:'1024px'
    }
  },
  plugins: [],
};
export default config;
