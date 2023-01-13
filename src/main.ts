import "@/styles/main.scss";
import "@/styles/blog/blog.scss";
import "@wangeditor/editor/dist/css/style.css"; 
import { createApp } from "vue";
import App from "./App.vue";
import BlogLayout from "@/components/blogLayout.vue";
import "animate.css";
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);
app.component("BlogLayout", BlogLayout);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

setupStore(app); // 注册store
setupRouter(app);

app.mount("#app");
