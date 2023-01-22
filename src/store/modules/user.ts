import { defineStore } from "pinia";
import { store } from "../index";
import { router } from "@/router";
import { refreshToken } from "@/apis/auth";

type UserInfo = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_img: string;
  user_profile: string;
  access_token: string;
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

    setRefreshTokenTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.userInfo.expires_time > 2600) {
          console.log(this.userInfo.expires_time);
          this.userInfo.expires_time -= 1;
        } else {
          clearInterval(this.timer);
          refreshToken({
            user_name: this.userInfo.user_name,
            user_id: this.userInfo.user_id,
          }).then((res) => {
            this.userInfo.access_token = res.data;
            this.userInfo.expires_time = 1 * 60 * 60;
            useUserStore().setRefreshTokenTime();
          });
        }
      }, 1000);
    },
  },
  persist: {
    paths: ["userInfo", "timer"],
  },
});

export const useUserStoreOut = () => {
  return useUserStore(store);
};
