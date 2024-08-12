import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useServicesSoldStore = defineStore("servicesSold", {
  // state
  state: () => ({
    services: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_SERVICE(serviceId){
      try {
        const response = await axiosInstance.get(
          `services/${serviceId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    },
    async GET_SERVICES(data) {
      try {
        const response = await axiosInstance.get(
          `services?_page=${data.page}&_per_page=${data.perPage}`
        );
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    async POST_SERVICE(service) {
      try {
        await axiosInstance.post(`services`, service);
      } catch (error) {
        console.error("Error creating service:", error);
      }
    },
    async PUT_SERVICE(service) {
      try {
        await axiosInstance.put(
          `services/${service.id}`,
          service.data
        );
      } catch (error) {
        console.error("Error updating service:", error);
      }
    },
    async DELETE_SERVICE(serviceId) {
      try {
        await axiosInstance.delete(
          `services/${serviceId}`
        );
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    },
  },
});
