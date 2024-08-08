import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useUserStore = defineStore("user", {
  // state
  state: () => ({
    user: {},

    users: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_USER(userId) {
      try {
        const response = await axiosInstance.get(
          `users/${userId}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async GET_USERS(data) {
      try {
        const response = await axiosInstance.get(
          `users?_page=${data.page}&_per_page=${data.perPage}`
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async CREATE_USER(user) {
      try {
        const response = await axiosInstance.post(
          `users`,
          user
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    async UPDATE_USER(user) {
      try {
        const response = await axiosInstance.put(
          `users/${user.id}`,
          user.data
        );
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        return error;
      }
    },
    async DELETE_USER(userId) {
      try {
        const response = await axiosInstance.delete(
          `users/${userId}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  },
});
