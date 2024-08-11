import { defineStore } from "pinia";

export const usethemeStore = defineStore("theme", {
  // state
  state: () => ({
    st_headerPages_h1: {
      color: "#484848",
      fontWeight: "300",
    },

    st_p: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_h1: {
      color: "black",
      fontWeight: "bold",
    },
    st_h2: {
      color: "black",
      size: "bold",
      style: "italic",
    },
    st_input: {
      variant: "outlined",
    },
    st_button: {
      color: "#5865f2",
      rounded: "0",
      size: "large",
      variant: "tonal",
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
