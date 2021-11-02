import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login/index"),
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Layout/index"),
    children: [
      {
        path: "/console",
        name: "Console",
        component: () => import("../views/Console/index"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
