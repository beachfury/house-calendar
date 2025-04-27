// tailwind.config.js
/**
 * Tailwind CSS configuration
 *
 * - darkMode: 'class' so we can toggle .dark on <html>
 * - extend.primary ← CSS var driven by SettingsContext
 */
module.exports = {
  darkMode: 'class',  // toggled via document.documentElement.classList
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--theme-color)',       // your app’s accent color
        // add more CSS-var driven slots here:
        // secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
};
