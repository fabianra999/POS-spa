import { defineStore } from "pinia";

export const usethemeStore = defineStore("theme", {
  // state
  state: () => ({
    st_p: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_h1: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_h2: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_input: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_button: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_header: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_footer: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_body: {
      color: "black",
      size: "bold",
      style: "italic",
    },
  }),
  // getters
  getters: {},
  // actions
  actions: {},
});
