import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

import axiosInstance from "../plugins/axiosInstance";

export const useCommonStore = defineStore("common", {
  // state
  state: () => ({
    users: [],
    usersList: [],
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
    pages: [],
    loading: false,
  }),
  // getters
  getters: {
    pages_gt: (state) =>{
      return state.pages.filter((page) => page.state === true);
    }
  },
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
    async GET_USERS(data) {
      const userStore = useUserStore();
      try {
        await userStore.GET_USERS({ page: data.page, perPage: data.perPage }).then((response) => {
          this.usersList = response.data;
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
