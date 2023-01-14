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
  access_token: string;
};

export const useUserStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: {
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      } as UserInfo,
    };
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    //退出清空登录信息
    setUserLogout() {
      this.setUserInfo({
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      });
      router.push("/home/login");
    },
  },
  persist: {
    paths: ["userInfo"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
