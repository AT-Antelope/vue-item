import { Login } from "@/api/login";
import {
  setToken,
  setUserName,
  removeToken,
  getUserName,
  removeUserName,
} from "@/utils/app";

const state = {
  // isCollapse: false,
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,

  // token
  _token: "",
  username: getUserName() || "",
};

const getters = {
  isCollapse: (state) => state.isCollapse,
};

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    //   Cookie.set("isCollapse", JSON.stringify(state.isCollapse), {
    //     //  生效时间
    //     expires: 1,
    //   });
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state._token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },

  //   test button
  SET_TOKEN_TEST(state) {
    state._token = "testToken";
  },
  SET_USERNAME_TEST(state) {
    state.username = "test@gmail.com";
  },
};

const actions = {
  //   使用actions进行异步登录，即链式编程: 获取到结果后继续做某事
  // 第一个参数为默认的content，为包含state、mutations等的对象
  //    普通版
  //   login(content, requestData) {
  //    解构版
  login({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      // 接口
      Login(requestData)
        .then((response) => {
          let data = response.data.data;
          //  普通版
          //   content.commit("SET_TOKEN", data.token);
          //   content.commit("SET_USERNAME", data.username);
          //  解构版
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.username);

          setToken(data.token);
          setUserName(data.username);

          resolve(response); // 执行 调用这个方法的地方 的.then
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 移除token和username (回到登录页面时)
  removeToken({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeUserName();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  },

  // test button
  loginWithoutValidate({ commit }) {
    commit("SET_TOKEN_TEST");
    commit("SET_USERNAME_TEST");
    setToken("testToken");
    setUserName("test@gmail.com");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
