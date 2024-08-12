import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";


export const useCustomerStore = defineStore("customer", {
  // state
  state: () => ({
    count: 0,
    customers: [],
  }),
  // getters
  getters: {
  },
  // actions
  actions: {
    async GET_CUSTOMER(customerId) {
      try {
        const response = await axiosInstance.get(
          `customers/${customerId}`
        );
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    },
    async GET_CUSTOMERS(data) {
      try {
        const response = await axiosInstance.get(
          `customers?_page=${data.page}&_per_page=${data.perPage}`
        );
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    },
    async POST_CUSTOMER(customer) {
      try {
        await axiosInstance.post("customers", customer);
      } catch (error) {
        console.error("Error creating customer:", error);
      }
    },
    async PUT_CUSTOMER(customer) {
      try {
        await axiosInstance.put(
          `customers/${customer.id}`,
          customer.data
        );
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    },
    async DELETE_CUSTOMER(customerId) {
      try {
        await axiosInstance.delete(`customers/${customerId}`);
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    },
  },
});
