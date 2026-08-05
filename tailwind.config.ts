import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};

export default config;
