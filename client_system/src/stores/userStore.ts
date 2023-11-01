import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {
      role: '',
      name: ''
    },
  }),
  actions: {
    setUserData(role, name) {
      this.user.role = role;
      this.user.name = name;
    }, 
    deleteUserData() {
      this.user.role = '';
      this.user.name = '';
    }, 
  }
});
