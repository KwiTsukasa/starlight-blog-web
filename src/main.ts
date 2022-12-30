import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import '@/styles/main.scss';
import locale from "element-plus/lib/locale/lang/zh-cn"; // 因element-plus默认是英文，我们指定一下默认中文
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import router from '@/router/index'

import layout from '@/components/layout.vue'

const app = createApp(App);
// 注册ElementPlus
app.use(ElementPlus, {
  locale, // 语言设置
  // size: Cookies.get('size') || 'medium' // 设置默认尺寸
});
app.use(router);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('layout',layout);

app.mount("#app");
