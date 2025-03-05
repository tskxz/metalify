import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
    userID: null,
    token: null,
  }),
  actions: {
    setUser(user) {
      this.username = user.username;
      this.userID = user.userID;
      this.token = user.token;
      
      if (process.client) { 
        localStorage.setItem("token", user.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("userID", user.userID);
      }
    },
    logout() {
      this.username = null;
      this.userID = null;
      this.token = null;

      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
      }
    },
    loadUserFromLocalStorage() {
      if (process.client) {
        this.token = localStorage.getItem("token") || null;
        this.username = localStorage.getItem("username") || null;
        this.userID = localStorage.getItem("userID") || null;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
