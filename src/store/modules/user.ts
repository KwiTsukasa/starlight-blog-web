import { defineStore } from "pinia";
import { store } from "../index";
import { router } from "@/router";

type UserInfo = {
  user_id: number;
  user_name: string;
  user_psd: string;
  user_email: string;
  user_img: string;
  user_profile: string;
};

export const useUserStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: {
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      } as UserInfo,
      loginState: false,
    };
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    setLoginState(loginState) {
      this.loginState = loginState;
    },
    //退出清空登录信息
    setUserLogout() {
      this.setUserInfo({
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      });
      this.setLoginState(false);
      router.push("/home/login");
    },
  },
  persist: {
    paths: ["loginState", "userInfo"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
