import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // DQ night-dungeon palette (mirror of the CSS variables in globals.css)
        night: "#0b0b1e",
        dungeon: "#1a1a2e",
        panel: "#141b33",
        treasure: "#f9d56e",
        parchment: "#f5f3e7",
        danger: "#ff6b5e",
        victory: "#3ddc84",
        mana: "#b07ce8",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        quest: ["VT323", '"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
