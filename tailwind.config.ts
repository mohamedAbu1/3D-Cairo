import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06181c",
        cream: "#f4d29b",
        sand: "#eabf7d",
        lagoon: "#26d5d0",
      },
      boxShadow: {
        glow: "0 0 42px rgba(23, 216, 218, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
