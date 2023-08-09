/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'gray1': '#F7F6F5',
      'gray2': '#D0CECC',
      'gray3': '#B4B2B0',
      'black': '#271D16',
      'light-orange': '#FFEFE5',
      'primary-orange': '#FD9E5E',
      'point-orange': '#F38049',
      'success-green': '#44D1A3',
      'danger-red': '#FF4600'
    },
    extend: {},
  },
  plugins: [],
}

