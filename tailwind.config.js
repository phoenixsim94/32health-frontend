/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
            "./node_modules/flowbite/**/*.js"
            ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#240D57',
          2: '#501FC1',
          3: '#8456EC',
          4: '#E87BF8'
        },
        secondary: {
          1: 'CCB6FF',
          2: 'EDE5FF',
          3: 'F6F2FF'
        },
        alert: {
          1:'#FFD7E0',
          2: '#E61445',
          3: '#D3FFE2',
          4: '#00805E'
        },
        neutrals: {
          1: '#4F4F4F',
          2: '#828282',
          3: '#BDBDBD',
          4: '#E0E0E0',
          5: '#F2F2F2',
          6: '#BDBDBD'
        }
      },
      fontWeight: {
        bold: 700,
        light: 300
      },
      fontSize: {
        1: '64px',
        2: '24px',
        3: '20px',
        4: '48px',
        5: '18px'
      },
      dropShadow: {
        '3xl': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '4xl': '0px 0px 5px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'helvetica': 'Helvetica'
      }
    },
  },
  plugins: [
    
  ]
}
