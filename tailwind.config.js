/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
      extend: {
        backgroundImage: {
          history: "url('/public/assets/images/pexels-bg-history.jpg')",
          main: "url('/public/assets/images/pexels-bg-main-coffee1.jpg')",
          profile: "url('/public/assets/images/pexels-bg-profile3-op.jpg')",
          cart: "url('/public/assets/images/pexels-bg-cart2-op.jpg')",
        },
        boxShadow: {
          primary: "0px 6px 20px 0px #00000020;",
        },
        spacing: {
          22: "7rem",
        },
        colors: {
          primary: "#4F5665",
          "primary-context": "#7C828A",
          secondary: "#ffba33",
          "secondary-200": "#f4a200",
          tertiary: "#D2691E",
          quartenary: "#0b132a",
          brown: '#6D4C41', // You can replace '#6D4C41' with your desired shade of brown
          'olive-green': '#556B2F', // You can replace '#556B2F' with your desired shade of olive green
          beige: '#F5F5DC', // You can replace '#F5F5DC' with your desired shade of beige
          umber: '#D2691E', // You can replace '#D2691E' with your desired shade of umber
          'dark-orange': '#FF8C00', // You can replace '#FF8C00' with your desired shade of dark orange
        
        },
        borderWidth: {
          1: "1px",
        },
      },
    },
    daisyui: {
      themes: [
        {
          jokopi: {
            primary: "#D2691E",
            secondary: "#ffba33",
            accent: "#0b132a",
            neutral: "#9f9f9f",
            //"base-100": "#F5F5DC",
            info: "#3ABFF8",
            success: "#36D399",
            warning: "#FBBD23",
            error: "#F87272",
            "plain-white": "#FFF",
          },
        },
      ],
    },
    plugins: [require("daisyui")],
  };
  
  /** 
  module.exports = {
    theme: {
      extend: {
        backgroundImage: {
          history: "url('/public/assets/images/cold-brew.webp')",
          main: "url('/public/assets/images/bg-main-coffee.webp')",
          profile: "url('/public/assets/images/bg-profile.webp')",
          cart: "url('/public/assets/images/bg-cart.webp')",
        },
        boxShadow: {
          primary: "0px 6px 20px 0px #00000020;",
        },
        spacing: {
          22: "7rem",
        },
        colors: {
          primary: "#4F5665",
          "primary-context": "#7C828A",
          secondary: "#ffba33",
          "secondary-200": "#f4a200",
          tertiary: "#6A4029",
          quartenary: "#0b132a",
        },
        borderWidth: {
          1: "1px",
        },
      },
    },
    daisyui: {
      themes: [
        {
          jokopi: {
            primary: "#6A4029",
            secondary: "#ffba33",
            accent: "#0b132a",
            neutral: "#9f9f9f",
            "base-100": "#fff",
            info: "#3ABFF8",
            success: "#36D399",
            warning: "#FBBD23",
            error: "#F87272",
            "plain-white": "#FFF",
          },
        },
      ],
    },
    plugins: [require("daisyui")],
  };**/