import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#001f3f",
        "navy-light": "#003366",
        "navy-dark": "#001833",
        "light-green": "#3adb76",
        "light-sky-blue": "#87CEFA",  // Light Sky Blue
        "dark-blue": "#003366",  
      },
    },
  },
  plugins: [],
} satisfies Config;
