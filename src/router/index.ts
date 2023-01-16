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
      title: "发布博客",
    },
  },
  {
    path: "/home/user-info",
    name: "userInfo",
    component: () => import("@/views/userInfo/index.vue"),
    meta: {
      title: "个人信息",
    },
  },
  {
    path: "/home/work-space",
    name: "workSpace",
    component: () => import("@/views/workspace/index.vue"),
    redirect:"/home/work-space/group",
    meta: {
      title: "工作台",
    },
    children:[
      {
        path:"/home/work-space/group",
        name:"group",
        component:() => import("@/views/workspace/components/group.vue"),
        meta:{
          title:"crud-分组"
        }
      },
      {
        path:"/home/work-space/blog",
        name:"blog",
        component:() => import("@/views/workspace/components/blog.vue"),
        meta:{
          title:"crud-博客"
        }
      },
      {
        path:"/home/work-space/tag",
        name:"tag",
        component:() => import("@/views/workspace/components/tag.vue"),
        meta:{
          title:"crud-标签"
        }
      },
      {
        path:"/home/work-space/comment",
        name:"comment",
        component:() => import("@/views/workspace/components/comment.vue"),
        meta:{
          title:"crud-评论"
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
  const { userInfo } = storeToRefs(userStore);
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (
      to.path !== "/home/login" &&
      (userInfo.value.access_token === "" ||
        userInfo.value.access_token === undefined ||
        userInfo.value.access_token === null)
    ) {
      ElMessage.warning("请先登录或注册账号");
      router.replace("/home/login");
    } else {
      next();
    }
  });
  router.afterEach((to) => {
    NProgress.done();
  });
  app.use(router);
};
