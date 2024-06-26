import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-header": "url('/assets/suggestions/mobile/background-header.png')",
        "bg-header-desktop":
          "url('/assets/suggestions/desktop/background-header.png')",
        "bg-header-tablet":
          "url('/assets/suggestions/tablet/background-header.png')",
      },
      colors: {
        primary: {
          voilet: "#AD1FEA",
          "light-blue": "#4661E6",
          "dark-blue": "rgb(55, 63, 104)",
        },
        secondary: {
          "light-gray": "#F2F4FF",
          "very-gray": "#F7F8FD",
          "dark-gray": "#3A4374",
          "light-blue": "#647196",
        },
        tetiary: {
          orange: "#F49F85",
          "sea-blue": "#62BCFA",
          hov: "#CFD7FF",
          red: "#D73737",
        },
      },
      gridTemplateColumns: {
        two: "10fr 1fr",
      },
    },
  },
  plugins: [],
};
export default config;
