import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";

export const useCommonStore = defineStore("common", {
  // state
  state: () => ({
    country: [
      {
        name: "Brazil",
        code: "BR",
        id: 1,
      },
    ],
    city: [
      {
        name: "São Paulo",
        code: "SP",
        id: 1,
      },
    ],
    headquarters: [
      {
        name: "Headquarters 1",
        code: "HQ1",
        id: 1,
      },
    ],
    role: [
      {
        name: "Admin",
        code: "ADM",
        id: 1,
      },
      {
        name: "User",
        code: "USR",
        id: 2,
      },
    ],
    paymentMethods: [
      {
        name: "Credit Card",
        code: "CC",
        id: 1,
      },
      {
        name: "Debit Card",
        code: "DC",
        id: 2,
      },
      {
        name: "Bank Slip",
        code: "BS",
        id: 3,
      },
    ],
    documentId: [
      {
        name: "CPF",
        code: "CPF",
        id: 1,
      },
      {
        name: "CNPJ",
        code: "CNPJ",
        id: 2,
      },
    ],
  }),
  // getters
  getters: {},
  // actions
  actions: {},
});
