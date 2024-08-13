import { defineStore } from "pinia";
import axiosInstance from "../plugins/axiosInstance";

export const useBillingStore = defineStore("billing", {
  // state
  state: () => ({
    invoice: [],
  }),
  // getters
  getters: {},
  // actions
  actions: {
    async GET_BILLING(billId) {
      try {
        const response = await axiosInstance.get(
          `billings/${billId}`
        );
        this.invoice = response.data;
      } catch (error) {
        console.error("Error fetching bill:", error);
      }
    },
    async GET_BILLS(data) {
      try {
        const response = await axiosInstance.get(
          `billings?_page=${data.page}&_per_page=${data.perPage}`
        );
        this.invoice = response.data;
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    }, 
    async CREATE_BILL(bill) {
      try {
        const response = await axiosInstance.post(
          `billings`,
          bill
        );
        this.invoice = response.data;
      } catch (error) {
        console.error("Error creating bill:", error);
      }
    },
    async UPDATE_BILL(bill) {
      try {
        const response = await axiosInstance.put(
          `billings/${bill.id}`,
          bill.data
        );
        this.invoice = response.data;
        return response.data;
      } catch (error) {
        console.error("Error updating bill:", error);
        return error;
      }
    },
    async DELETE_BILL(billId) {
      try {
        const response = await axiosInstance.delete(
          `billings/${billId}`
        );
        this.invoice = response.data;
        return response.data;
      } catch (error) {
        console.error("Error deleting bill:", error);
        return error;
      }
    }
  },
});
