import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { useUserStore } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "index",
    redirect: "/home/allBlog",
  },
  {
    path: "/home/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home/allBlog",
    name: "homeIndex",
    component: () => import("@/views/allBlog/index.vue"),
    meta: {
      title: "所有博客",
    },
  },
  {
    path: "/home/myBlog",
    name: "myBlog",
    component: () => import("@/views/myBlog/index.vue"),
    meta: {
      title: "我的博客",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export const setupRouter = (app: App) => {
  const userStore = useUserStore();
  const { loginState } = storeToRefs(userStore);
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path !== "/home/login" && !loginState.value) {
      next((vm) => {
        vm.$router.replace("/home/login");
      });
    } else
      next((vm) => {
        vm.$router.replace(from.path);
      });
  });
  router.afterEach((to) => {
    NProgress.done();
  });
  app.use(router);
};
