import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";


export const useCustomerStore = defineStore("customer", {
  // state
  state: () => ({
    count: 0,
    customer: {
      id: null,
      name: "",
      lastName: "",
      documentId: "",
      age: null,
      dateBirth: "",
      role: null,
      country: null,
      city: null,
      state: null,
    },
  }),
  // getters
  getters: {
  },
  // actions
  actions: {
    async GET_CUSTOMER(userId) {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/users/${userId}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async GET_CUSTOMERS() {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/users`
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async POST_CUSTOMER(user) {
      try {
        await axiosInstance.post("https://api.example.com/users", user);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    async PUT_CUSTOMER(user) {
      try {
        await axiosInstance.put(
          `https://api.example.com/users/${user.id}`,
          user
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  },
});
