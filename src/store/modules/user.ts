import { defineStore } from "pinia";
import { store } from "../index";
import { router } from "@/router";

type UserInfo = {
  user_id: number;
  user_name: string;
  user_psd: string;
  user_email: string;
  user_img: string;
};

export const useUserStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo:{} as UserInfo,
      loginState: false,
    };
  },

  actions: {
    setUserInfo(userInfo:UserInfo) {
      this.userInfo = userInfo;
    },
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
    paths: ["loginState","userInfo"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
