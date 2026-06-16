import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071013",
        panel: "rgba(9, 18, 24, 0.72)",
        line: "rgba(165, 243, 252, 0.18)",
        cyanSoft: "#8be9ff",
        emeraldSoft: "#64f4ac",
        goldSoft: "#f6c96f"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 50px rgba(100, 244, 172, 0.16)",
        glass: "0 18px 70px rgba(0, 0, 0, 0.34)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 10%, rgba(139, 233, 255, 0.16), transparent 30%), radial-gradient(circle at 80% 20%, rgba(100, 244, 172, 0.14), transparent 26%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      },
      backgroundSize: {
        "radial-grid": "auto, auto, 52px 52px, 52px 52px"
      }
    }
  },
  plugins: []
};

export default config;
