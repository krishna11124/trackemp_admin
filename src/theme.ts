import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#a2e0da", // Lightest
      100: "#8fdad3",
      200: "#7dd4cc",
      300: "#6acdc5",
      400: "#58c7bd", // Middle
      500: "#45c1b6",
      600: "#3bb1a6",
      700: "#349d94",
      800: "#2e8a81",
      900: "#27766f", // Darkest
    },
    primary: {
        50: "#cc",
        100:"rgba(242, 242, 242, 0.4)",
        200: "rgba(218, 222, 227, 1)",
        300: "#8d9fad",
        400: "#677e8e",
        500: "rgba(6, 26, 58, 1)",
        600: "rgba(6, 26, 58, 0.8)", // This is the main primary color
        700: "#2b3543",
        800: "#182028",
        900: "#040a0d",
        dark: "#34495e", // A darker shade for hover effect, adjust as needed
      },

    secondary:{
        50: "rgba(255, 145, 54, 0.1)",
        100: "rgba(255, 145, 54, 0.2)",
        200: "rgba(255, 145, 54, 0.3)",
        300: "rgba(255, 145, 54, 0.4)",
        400: "rgba(255, 145, 54, 0.5)",
        500: "rgba(255, 145, 54, 0.6)",
        600: "rgba(255, 145, 54, 0.7)",
        700: "rgba(255, 145, 54, 0.8)",
        800: "rgba(255, 145, 54, 0.9)",
        900: "rgba(255, 145, 54, 1)",
    }
  },
  components: {
   Button: {
      baseStyle: {
        borderRadius: "full", // Button border radius
        height: '60px',
      },
    },
    Input: {
      baseStyle: {
        rounded: "full",
      },
    },
  },
});

export default theme;
