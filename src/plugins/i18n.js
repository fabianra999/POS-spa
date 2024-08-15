import { createI18n } from "vue-i18n";

import esLocales from "./locales/es.json";
import esValidationMessages from "./locales/es-validationMessages.json";
import enLocales from "./locales/en.json";

const messages = {
  es: {
    ...esLocales,
    key: "key",
    validation: {
      required: "Este campo es obligatorio.",
      minLength: "Este campo debe tener al menos {min} caracteres.",
    },
    $vuetify: {
      open: "Abrir",
      close: "Cerrar",
      dataFooter: {
        itemsPerPageText: "Elementos por página",
        itemsPerPageAll: "Todos",
        pageText: "Página",
        firstPage: "Primera página",
        prevPage: "Página anterior",
        nextPage: "Página siguiente",
        lastPage: "Última página",
      },
      pagination: {
        ariaLabel: {
          root: "Paginación",
        },
      },
      confirmEdit: {
        ok: "Confirmar Edición",
        cancel: "Cancelar",
      },
      input: {
        clear: "Limpiar",
      },
      message: {
        change: "cambiar",
      },
      noDataText: "No hay datos disponibles",
    },
    change: "cambiar",
  },
  en: {
    ...enLocales,
    key: "key",
    validation: {
      required: "This field is required.",
      minLength: "This field must have at least {min} characters.",
    },
    $vuetify: {
      open: "Open",
      close: "Close",
      dataFooter: {
        itemsPerPageText: "Items per page:",
        itemsPerPageAll: "All",
        pageText: "Page:",
        firstPage: "First page",
        prevPage: "Previous page",
        nextPage: "Next page",
        lastPage: "Last page",
      },
      pagination: {
        ariaLabel: {
          root: "Pagination",
        },
      },
      confirmEdit: {
        ok: "Confirm Edit",
        cancel: "Cancel",
      },
      input: {
        clear: "Clear",
      },
      message: {
        change: "Change",
      },
      noDataText: "No data available",
    },
    change: "Change",
  },
};

const i18n = createI18n({
  // locale: window.navigator.language.split('-')[0],
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  messages,
});

export default i18n;
