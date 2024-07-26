import { defineStore } from "pinia";
import axiosInstance from "../assets/utils/axiosInstance";


export const useInventoryStore = defineStore("inventory", {
  // state
  state: () => ({
    products:[
      {
        id: 1,
        name: "Product 1",
        price: 10,
        quantity: 10,
        location: "A1",
      },
    ]
  }),
  // getters
  getters: {},
  // actions
  actions: {},
});
