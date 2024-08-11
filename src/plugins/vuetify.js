/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files


import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import i18n from "@/plugins/i18n";
import { aliases, md } from "vuetify/iconsets/md";

// Composables
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  icons: {
    // https://fonts.google.com/icons?icon.size=24&icon.color=%23e8eaed&icon.platform=web&icon.query=home
    // defaultSet: 'md',
    // aliases,
    sets: {
      md,
    },
  },
  components: {
    VDateInput,
  },
});
