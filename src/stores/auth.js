import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => ({
    counter: 0,
    token: "",
    user: {},
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getUserData (id) {
      const response = api().get(`/user/${id}?populate=*`);
      if (response.status === 200) {
        return "success"
      }
    },
    async login(data) {
      try {
        const response = await api().post("/auth/local", data);
        if (response.status === 200) {
          console.log("success");
          this.token = response.data.jwt;
          this.user = response.data.user;
          return "success";
        }
      } catch (e) {
        return e.response.data;
      }
    },
    increment() {
      this.counter++;
    },
  },
});
