import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { useUserStore } from "@/store";
import Login from "@/views/login/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "index",
    redirect: "/home/all-blog",
  },
  {
    path: "/home/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home/all-blog",
    name: "homeIndex",
    component: () => import("@/views/allBlog/index.vue"),
    meta: {
      title: "所有博客",
    },
  },
  {
    path: "/home/my-blog",
    name: "myBlog",
    component: () => import("@/views/myBlog/index.vue"),
    meta: {
      title: "我的博客",
    },
  },
  {
    path: "/home/editor-blog",
    name: "editorBlog",
    component: () => import("@/views/editBlog/index.vue"),
    meta: {
      title: "我的博客",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const setupRouter = (app: App) => {
  const userStore = useUserStore();
  const { loginState } = storeToRefs(userStore);
  router.beforeEach((to, from, next) => {
    NProgress.start();
    console.log(loginState,to.path)
    if (to.path !== "/home/login" && !loginState.value) {
      router.replace("/home/login");
    } else
      next();
  });
  router.afterEach((to) => {
    NProgress.done();
  });
  app.use(router);
};
