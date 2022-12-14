/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // 自定义颜色
    colors: {
      primary: '#1989fa',
      success: '#07c160',
      info: '#2080f0',
      'bg-color': 'var(--color-bg-color)',
      'text-color': 'var(--color-text-color)',
      'global-color': 'var(--color-global-color)',
      'modal-color': 'var(--color-modal-color)',
      'menu-active': 'var(--menu-active-color)',
      'icon-color': 'var(--icon-color)'
    },
    extend: { // 扩展
      spacing: {
        '50': '50px',
        '21': '20px',
        '41': '40px',
        '101': '100px',
        '400': '400px'
      },
      lineHeight: {
        '50': '50px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
