/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#01579B",
    secondary: "#B3E5FC",
    background: "#FFFFFF",
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#29B6F6",
    secondary: "#01579B",
    background: "#2c2c2c",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
});
