import { defineStore } from "pinia";
import { store } from "../index";
import { router } from "@/router";

type UserInfo = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_img: string;
  user_profile: string;
  access_token: string;
  refresh_token: string;
  expires_time: number;
};

export const useUserStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: {
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      } as UserInfo,
      timer: "",
    };
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    //退出清空登录信息
    setUserLogout() {
      clearInterval(this.timer);
      this.setUserInfo({
        user_name: "StarLightBlog",
        user_profile: "Revue-StarLight",
      });
      router.push("/home/login");
    },
  },
  persist: {
    paths: ["userInfo", "timer"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
