import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";

export const useBillingStore = defineStore("billing", {
  // state
  state: () => ({
    bills: [
      {
        id: 1,
        date: "2021-01-01",
        value: 100,
        customer: "Customer 1",
        paymentMethods: 1,
        paid: false,
        cashier: "Cashier 1",
      },
    ],
  }),
  // getters
  getters: {},
  // actions
  actions: {},
});
