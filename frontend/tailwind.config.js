/**
 * Tailwind CSS configuration
 *
 * - darkMode: 'class' so we can use the .dark class for dark variants
 * - content: includes CSS files so @apply works
 * - colors.primary: still mapped to --theme-color, in case themes use it
 */
module.exports = {
  darkMode: 'class', 
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--theme-color)',
      },
    },
  },
  plugins: [],
};
