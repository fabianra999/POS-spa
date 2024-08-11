import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useInventoryStore = defineStore("inventory", {
  // state
  state: () => ({
    products: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_INVENTARY(idInventary) {
      try {
        const response = await axiosInstance.get(`inventary/${idInventary}`);
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching inventary:", error);
      }
    },
    async GET_INVENTARIES(data) {
      try {
        const response = await axiosInstance.get(
          `inventary?_page=${data.page}&_per_page=${data.perPage}`
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching inventaries:", error);
      }
    },
    async CREATE_INVENTARY(inventary) {
      try {
        const response = await axiosInstance.post(`inventary`, inventary);
        this.products = response.data;
      } catch (error) {
        console.error("Error creating inventary:", error);
      }
    },
    async UPDATE_INVENTORY(inventary) {
      try {
        const response = await axiosInstance.put(
          `inventary/${inventary.id}`,
          inventary.data
        );
        this.products = response.data;
        return response.data;
      } catch (error) {
        console.error("Error updating inventary:", error);
        return error;
      }
    },
    async DELETE_INVENTORY(idInventary) {
      try {
        const response = await axiosInstance.delete(`inventary/${idInventary}`);
        this.products = response.data;
      } catch (error) {
        console.error("Error deleting inventary:", error);
      }
    },
  },
});
