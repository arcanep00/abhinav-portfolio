import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        /* new design system */
        void: "#050508",
        ink: "#050508",
        surface: "rgba(10,10,20,0.80)",
        glass: "rgba(255,255,255,0.04)",
        /* primary accents */
        green: "#00ff9d",
        cyan: "#00f5ff",
        purple: "#a78bfa",
        /* legacy aliases — keep for existing components */
        emeraldSoft: "#00ff9d",
        cyanSoft: "#00f5ff",
        goldSoft: "#a78bfa",
        /* dim variants */
        dimgreen: "rgba(0,255,157,0.12)",
        dimcyan: "rgba(0,245,255,0.12)"
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"]
      },
      boxShadow: {
        green: "0 0 30px rgba(0,255,157,0.25), 0 0 80px rgba(0,255,157,0.08)",
        cyan: "0 0 30px rgba(0,245,255,0.25), 0 0 80px rgba(0,245,255,0.08)",
        glow: "0 0 30px rgba(0,255,157,0.22), 0 0 80px rgba(0,255,157,0.08)",
        glass: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,255,157,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.025) 1px, transparent 1px)",
        "radial-grid":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,255,157,0.09), transparent)"
      },
      backgroundSize: {
        "grid-pattern": "60px 60px",
        "radial-grid": "auto"
      }
    }
  },
  plugins: []
};

export default config;
