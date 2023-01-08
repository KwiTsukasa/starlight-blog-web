import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from 'nprogress'
import { useUserStore } from '@/store';

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
      title: "登录",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/wel/index.vue"),
    children:[
      {
        path: "",
        name: "homeIndex",
        component:() => import("@/views/allBlog/index.vue"),
      },
      {
        path:"/home/myBlog",
        name:"myBlog",
        component:() => import("@/views/myBlog/index.vue"),
        meta:{
          title:"我的博客",
        }
      }
    ]
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
    if (to.path !== "/login" && !loginState.value) {
      next({ path: "/login" });
    } else next();
  });
  router.afterEach(to => {
    NProgress.done()
  })
	app.use(router);
};
