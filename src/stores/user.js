import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useUserStore = defineStore("user", {
  // state
  state: () => ({
    user: [
      {
        id: null,
        name: "",
        lastName: "",
        documentId: "",
        email: "",
        age: null,
        dateBirth: "",
        role: null,
        password: "",
        country: null,
        city: null,
        state: null,
      },
    ],
    users: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_USER(userId) {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/users/${userId}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async GET_USERS() {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/users`
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async CREATE_USER(user) {
      try {
        const response = await axiosInstance.post(
          `https://api.example.com/users`,
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
          `https://api.example.com/users/${user.id}`,
          user
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  },
});
