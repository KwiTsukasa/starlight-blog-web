import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/main.scss";
import 'animate.css';
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { setupRouter } from '@/router'
import { setupStore } from '@/store';

import layout from '@/components/layout.vue'

const app = createApp(App);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

setupStore(app); // 注册store
setupRouter(app);

app.component('layout',layout);

app.mount("#app");
