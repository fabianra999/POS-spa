import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";

export const useServicesSoldStore = defineStore("servicesSold", {
  // state
  state: () => ({
    servicesSold: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_SERVICE_SOLD(serviceSoldId) {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/services-sold/${serviceSoldId}`
        );
        this.serviceSold = response.data;
      } catch (error) {
        console.error("Error fetching service sold:", error);
      }
    },
    async GET_SERVICES_SOLD() {
      try {
        const response = await axiosInstance.get(
          `https://api.example.com/services-sold`
        );
        this.servicesSold = response.data;
      } catch (error) {
        console.error("Error fetching services sold:", error);
      }
    },
    async POST_SERVICE_SOLD(serviceSold) {
      try {
        await axiosInstance.post(
          `https://api.example.com/services-sold`,
          serviceSold
        );
      } catch (error) {
        console.error("Error creating service sold:", error);
      }
    },
    async PUT_SERVICE_SOLD(serviceSold) {
      try {
        await axiosInstance.put(
          `https://api.example.com/services-sold/${serviceSold.id}`,
          serviceSold
        );
      } catch (error) {
        console.error("Error updating service sold:", error);
      }
    },
  },
});
