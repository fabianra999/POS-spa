import { createI18n } from "vue-i18n";


import esLocales from "./locales/es.json";
import esValidationMessages from "./locales/es-validationMessages.json";
import enLocales from "./locales/en.json";

const messages = {
  en: {
    ...enLocales,
    validation: {
      required: 'This field is required.',
      minLength: 'This field must have at least {min} characters.'
    },
    $vuetify: {
      open: 'Open',
    },
  },
  es: {
    ...esLocales,
    validation: {
      required: 'Este campo es obligatorio.',
      minLength: 'Este campo debe tener al menos {min} caracteres.'
    },
    $vuetify: {
      open: 'Abrir',
    },
  },
};

const i18n = createI18n({
  // locale: window.navigator.language.split('-')[0],
  legacy: false,
  locale: "es",
  fallbackLocale: 'en',
  messages,
});

export default i18n;
