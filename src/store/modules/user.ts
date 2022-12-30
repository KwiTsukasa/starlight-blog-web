import { defineStore } from "pinia";
import { store } from "../index";
import { router } from "@/router";

export const useUserStore = defineStore("userInfo", {
  state: () => {
    return {
      loginState: false,
    };
  },

  actions: {
    setLoginState(loginState) {
      this.loginState = loginState;
    },
    //退出清空登录信息
    setUserLogout() {
      router.push("/login");
      this.setLoginState(false);
    },
  },
  persist: {
    paths: ["loginState"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
