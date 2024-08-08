import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useCommonStore = defineStore("common", {
  // state
  state: () => ({
    users: [],
    country: [],
    city: [],
    state: [],
    documentIdType: [],
    role: [],
    paymentMethods: [],
    inventaryType: [],
    categories: [],
    services: [],
    theme: [],
    login: [],
    permissions: [],
    loading: false,
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_Dictionarys(dictionary) {
      try {
        if (dictionary.id) {
          const response = await axiosInstance.get(
            `/${dictionary.name}/${dictionary.id}`
          );
          this[dictionary.name] = response.data;
          return response.data;
        }
        const response = await axiosInstance.get(`/${dictionary.name}`);
        this[dictionary.name] = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  },
});
