import router from "./index";
import { getToken, removeToken, removeUserName } from "@/utils/app";
import store from "@/store";

const whiteList = ["/login"];

// to and from are both route objects. must call `next`.
/**
 * 1.直接进入index的时候，参数to被改成了"/index"，触发路由指向，会跑beforeEach
 * 2.由于路由里设置了redirect，再一次next指向了login，再次发生路由指向，再跑beforeEach，参数的to被改为"/login"
 * 3.白名单判断存在，则直接执行next()，因为没哟参数，所以不会再次触发beforeEach
 */
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // token已存在时
    //   路由动态添加，分配菜单，每个角色分配不同菜单
    console.log("有token");

    // 安全性，当用户回到登录界面时，清除token，只能重新登录
    if (to.path === "/login") {
      store.dispatch("app/removeToken");
      next();
      console.log("有token,回到了login");
    } else {
      next();
      console.log("有token，进入非login");
    }
  } else {
    //   token不存在时
    // indexOf，判断数组中是否存在指定的某个对象，不存在则否返回-1
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是白名单的页面则直接进入
      next(); // 不带参数返回to的值，不带参数的next()不会重复触发beforeEach()
      console.log("没有token,但此页面是白名单");
    } else {
      // 没有token且不在白名单内返回到登录页面
      next("/login");
      console.log("不是白名单，回到登录页");
    }
  }

  //   next();
});
