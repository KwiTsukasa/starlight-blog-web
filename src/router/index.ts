import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "index",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/wel/index.vue"),
    meta: {
      title: "首页",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const setupRouter = (app: App) => {
	const userStore = useUserStore();
  const { loginState } = storeToRefs(userStore);
	router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path !== "/login" && !loginState) {
      next({ path: "/login" });
    } else next();
  });
	app.use(router);
};
