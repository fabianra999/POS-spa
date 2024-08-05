import { createI18n } from "vue-i18n";
import esLocales from "./locales/es.json";
import enLocales from "./locales/en.json";

const messages = {
  en: {
    ...enLocales,
  },
  es: {
    ...esLocales,
  },
};

const i18n = createI18n({
  locale: "es", // idioma por defecto
  messages,
});

export default i18n;
