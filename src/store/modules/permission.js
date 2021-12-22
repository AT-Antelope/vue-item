import { LoadTableData as GetRoles } from "@/api/user";
import { Promise } from "core-js";
import { defualtRouterMap, asyncRouterMap } from "@/router";

const state = {
  addRouter: [],
  allRouter: defualtRouterMap,
};

const getters = {
  addRouter: (state) => state.addRouter, // 匹配的
  allRouter: (state) => state.allRouter, // 所有的
};

const mutations = {
  SET_ROUTER(state, value) {
    state.addRouter = value;
    state.allRouter = defualtRouterMap.concat(value);
  },
};

const actions = {
  // 原为从服务器获取所有的系统，因接口文档缺失，现使用获取全部类型不完全代替效果
  getRoles(content, requestData) {
    return new Promise((resolve, reject) => {
      GetRoles(requestData)
        .then((response) => {
          let responseData = response.data.data.data[0].role.split(",");
          resolve(responseData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 储存要更新的新路由
  createRouter(content, role) {
    return new Promise((resolve, reject) => {
      let addRouters = [];
      // 超管状态
      if (role.includes("admin")) {
        addRouters = asyncRouterMap;
      } else {
        // 普通管理员
        addRouters = asyncRouterMap.filter((item) => {
          // es6 includes，包含，路由里的system匹配的上就返回
          if (role.includes(item.meta.system)) {
            return item;
          }
        });
        // 把404页面加入到路由中，普通管理员会匹配不到404页面(现404页面放到默认路由中不会出现此问题)
        addRouters.push(asyncRouterMap[asyncRouterMap.length - 1]);
      }
      // 更新路由
      content.commit("SET_ROUTER", addRouters);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
