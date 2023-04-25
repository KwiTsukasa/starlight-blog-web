import "@/styles/main.scss";
import "@/styles/blog/blog.scss";
import { createApp } from "vue";
import App from "./App.vue";
import BlogLayout from "@/components/blogLayout.vue";
import "animate.css";

import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);
app.component("BlogLayout", BlogLayout);

setupStore(app); // 注册store
setupRouter(app);

app.mount("#app");
