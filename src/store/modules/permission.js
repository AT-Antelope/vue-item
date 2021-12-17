import { LoadTableData as GetRoles } from "@/api/user";
import { Promise } from "core-js";
import { defualtRouterMap, asyncRouterMap } from "@/router";

const state = {
  roles: [],
  addRouter: [],
  allRouter: defualtRouterMap,
};

const getters = {
  roles: (state) => state.roles,
  addRouter: (state) => state.addRouter, // 匹配的
  allRouter: (state) => state.allRouter, // 所有的
};

const mutations = {
  SET_ROLES(state, value) {
    state.roles = value;
  },
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
          content.commit("SET_ROLES", responseData);
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
      console.log(role);
      if (role.includes("admin")) {
        addRouters = asyncRouterMap;
      } else {
        addRouters = asyncRouterMap.filter((item) => {
          // es6 includes，包含，路由里的system匹配的上就返回
          if (role.includes(item.meta.system)) {
            return item;
          }
        });
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
