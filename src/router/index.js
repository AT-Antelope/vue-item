import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入组件
// 引入index时可省略，默认为index
import Layout from "@/views/Layout/index.vue";

// 默认路由，静态路由
export const defualtRouterMap = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页",
    },
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录",
    },
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console",
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          name: "首页",
        },
        component: () => import("../views/Console/index.vue"),
      },
    ],
  },

  /************************ 以下为动态路由部分，需要实现时可删除 *********************************************
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "menu",
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          keepAlive: true,
          name: "信息列表",
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          keepAlive: true,
          name: "信息分类",
        },
        component: () => import("../views/Info/category.vue"),
      },
      {
        // path: "/infoDetails/:id/:title",
        path: "/infoDetails",
        name: "InfoDetails",
        hidden: true,
        meta: {
          keepAlive: true,
          name: "信息详情",
        },
        component: () => import("../views/Info/details.vue"),
      },
    ],
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user",
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          keepAlive: true,
          name: "用户列表",
        },
        component: () => import("../views/User/index"),
      },
    ],
  },
  // ********************************************************************************************************
  /**
   * 404页面，若出现动态路由页面刷新后，会进入404页面的情况，把404放进动态路由里即可
   */
  {
    path: "/page404",
    meta: {
      name: "404",
      icon: "404",
    },
    hidden: true,
    component: Layout,
    children: [
      {
        path: "/404",
        meta: {
          name: "404",
        },
        component: () => import("../views/404/index.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

// 动态路由
export const asyncRouterMap = [
  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      system: "infoSystem",
      name: "信息管理",
      icon: "menu",
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表",
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类",
        },
        component: () => import("../views/Info/category.vue"),
      },
      {
        // path: "/infoDetails/:id/:title",
        path: "/infoDetails",
        name: "InfoDetails",
        hidden: true,
        meta: {
          name: "信息详情",
        },
        component: () => import("../views/Info/details.vue"),
      },
    ],
  },

  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      system: "userSystem",
      name: "用户管理",
      icon: "user",
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表",
        },
        component: () => import("../views/User/index"),
      },
    ],
  },
];

export default new VueRouter({
  routes: defualtRouterMap,
});
