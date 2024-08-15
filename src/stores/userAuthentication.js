import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useAuthentication = defineStore("authentication", {
  // state
  state: () => ({
    isAuthenticated: false,
  }),
  // getters
  getters: {},
  // actions
  actions: {
    POS_LOGIN() {
      debugger;
      this.isAuthenticated = true;
      localStorage.setItem("authToken", true);
      // try {
      //   const response = await axiosInstance.post(
      //     `auth/login`,
      //     data
      //   );
      //   this.isAuthenticated = true;
      //   return response.data;
      // } catch (error) {
      //   console.error("Error logging in:", error);
      //   return error;
      // }
    },
  },
});
