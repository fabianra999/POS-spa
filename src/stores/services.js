import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";

export const useServicesSoldStore = defineStore("servicesSold", {
  // state
  state: () => ({
    categories: [
      {
        id: 1,
        state: true,
        name: "Service 1",
        description: "Description of service 1",
        location: "Location 1",
      },
    ],
    services: [
      {
        id: 1,
        state: true,
        name: "Service 1",
        price: 100,
        duration: 60,
        description: "Description of service 1",
        category: "Category 1",
        location: "Location 1",
      },
    ],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_CATEGORIES() {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/categories`
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async GET_CATEGORY(categoryId) {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/categories/${categoryId}`
        );
        this.category = response.data;
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },
    async POST_CATEGORY(category) {
      try {
        await axiosInstance.post(
          `https://api.example.com/categories`,
          category
        );
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
    async PUT_CATEGORY(category) {
      try {
        await axiosInstance.put(
          `https://api.example.com/categories/${category.id}`,
          category
        );
      } catch (error) {
        console.error("Error updating category:", error);
      }
    },
    async DELETE_CATEGORY(categoryId) {
      try {
        await axiosInstance.delete(
          `https://api.example.com/categories/${categoryId}`
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
    async GET_SERVICES() {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/services`
        );
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    async POST_SERVICE(service) {
      try {
        await axiosInstance.post(`https://api.example.com/services`, service);
      } catch (error) {
        console.error("Error creating service:", error);
      }
    },
    async PUT_SERVICE(service) {
      try {
        await axiosInstance.put(
          `https://api.example.com/services/${service.id}`,
          service
        );
      } catch (error) {
        console.error("Error updating service:", error);
      }
    },
    async DELETE_SERVICE(serviceId) {
      try {
        await axiosInstance.delete(
          `https://api.example.com/services/${serviceId}`
        );
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    },
  },
});
