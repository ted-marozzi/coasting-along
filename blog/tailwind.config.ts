import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#6b7d5c",
            secondary: "#fa39da",
            background: "#f6efdc",
            focus: "#fa39da",
          },
        },
      },
    }),
  ],
};
export default config;
