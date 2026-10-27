/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        'viewport-frame': '#3B373B',
        'canvas-bg': '#ECEEF9',
        'mesh-pink': '#FF9EB5',
        'mesh-cream': '#FFF6E5',
        'card-surface': '#F5F6FC',
        'card-border': 'rgba(255, 255, 255, 0.6)',
        'text-primary': '#18181B',
        'text-muted': '#71717A',
        'btn-primary-bg': '#18181B',
        'btn-primary-icon': '#FFFFFF',
        'btn-selected-bg': '#E082D5',
        'btn-selected-icon': '#FFFFFF',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'header-padding': '2rem 3rem',
        'container-padding': '1.5rem 3rem 4rem',
        'sidebar-gap': '0.5rem',
        'grid-col-gap': '1.5rem',
        'grid-row-gap': '2.5rem',
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
        'btn': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'btn': '0 2px 8px 0 rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}