import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        dark: {
          1: "#161925",
          2: "#1C1F2E",
          3: '#0E78F9',
          4: "#2d3748",
        },
        orange: {
          1: '#FF742E'
        },
        blue: {
          1: '#0E78F9',
          2: '#252A41'
        },
        violet: {
          1: '#830EF9'
        },
        yellow: {
          1: '#F9A90E'
        }
      },
      backgroundImage: {
        "hero": "url('https://source.unsplash.com/a-close-up-of-a-yellow-and-white-wall-5DD7-L4A4Uw')"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config