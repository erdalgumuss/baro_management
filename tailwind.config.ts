
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css", // CSS dosyaları için doğru glob deseni
    "./src/ui/**/*.{js,ts,jsx,tsx}", // UI bileşenleri
    "./src/shared/**/*.{js,ts,jsx,tsx}", // Paylaşılan bileşenler
    "./src/context/**/*.{js,ts,jsx,tsx}", // Context API dosyaları
    "./src/hooks/**/*.{js,ts,jsx,tsx}", // Custom hook'lar
    "./public/**/*.html" // Statik HTML dosyaları
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#9333ea",
        foreground: "#374151",
        background: "#f3f4f6",
      },
    },
  },
  plugins: [],
};

module.exports = config;
