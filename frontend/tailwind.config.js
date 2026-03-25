/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      animation: {
        float: 'float 10s infinite alternate',
        'float-reverse': 'float 8s infinite alternate-reverse',
        slideUp: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-50px) scale(1.1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
