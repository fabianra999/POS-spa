import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";
import { useTheme } from "vuetify";

// const theme = useTheme();

export const usethemeStore = defineStore("theme", {
  // state
  state: () => ({
    themeVue: useTheme(),
    theme: {
      id: 1,
      themeName: "appTheme",
      logo: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      common: {
        background: "#FFFFFF",
        navBar: "#465F7D",
        sidebar: "#ADBACA",
        footer: "#D9E9FD",
        title: "#465F7D",
        titleFontWeight: "300",
        iconHeaderSize: "20em",
        text: "#6B737D",
        iconHeader: "#8CC0FF",
      },
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
      autocomple: {
        variant: "solo",
        color: "red",
        bgColor: "",
        baseColor: "#00ffff",
        clearable: false,
        chips: false,
      },
      textField: {
        variant: "outlined",
        color: "red",
        bgColor: "",
        baseColor: "#00ffff",
        clearable: false,
      },
      buttonField: {
        variant: "outlined",
        size: "small",
        rounded: "0",
        color: "#00ffff",
      },
    },
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_THEM() {
      // const theme = useTheme();
      try {
        const response = await axiosInstance.get(`theme`);
        this.theme = response.data;
        this.themeVue.global.name = this.theme.themeName;

        if (this.themeVue.global.name === "appTheme") {
          this.themeVue.current.colors.background =
            this.theme.common.background;
          this.themeVue.current.colors.navBar = this.theme.common.navBar;
          this.themeVue.current.colors.sidebar = this.theme.common.sidebar;
          this.themeVue.current.colors.footer = this.theme.common.footer;
          this.themeVue.current.colors.title = this.theme.common.title;
          this.themeVue.current.colors.text = this.theme.common.text;
          this.themeVue.current.colors.iconHeader =
            this.theme.common.iconHeader;

          this.themeVue.current.variables.titleFontWeight =
            this.theme.common.titleFontWeight;
          this.themeVue.current.variables.iconHeaderSize =
            this.theme.common.iconHeaderSize;

          this.themeVue.current.variables.autocomple = this.theme.autocomple;
          this.themeVue.current.variables.textField = this.theme.textField;
          this.themeVue.current.variables.buttonField = this.theme.buttonField;
          this.themeVue.current.variables.common = this.theme.common;
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async PUT_THEME() {
      try {
        const response = await axiosInstance.put(`theme`, this.theme);
        this.theme = response.data;
        this.themeVue.global.name = this.theme.themeName;
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    SET_THEME_NAME() {
      this.themeVue.global.name = this.theme.themeName;
    },
    SET_COMPONENT(typepayload, payload) {
      this.theme = payload;
      this.PUT_THEME();
    },
  },
});
