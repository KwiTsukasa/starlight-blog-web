import { defineStore } from "pinia";
import { store } from "../index";

type ClassSetting = {
  font: string;
  themeModel: string;
  themeColor: string;
};

export const useThemeStore = defineStore("classSetting", {
  state: () => {
    return {
      classSetting: {
        font: "Comfortaa",
        themeModel: "light-container",
        themeColor: "#5e72e4",
      } as ClassSetting,
    };
  },

  actions: {
    setClassSetting(classSetting: ClassSetting) {
      this.classSetting = classSetting;
    },
    //默认主题
    setDefaultTheme() {
      this.setClassSetting({
        font: "Comfortaa",
        themeModel: "light-container",
        themeColor: "#5e72e4",
      });
    },
  },
  persist: {
    paths: ["classSetting"],
  },
});

export const useThemeStoreOut = () => {
  return useThemeStore(store);
};
