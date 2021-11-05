import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // isCollapse: false,
    // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  },
  getters: {},
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //   Cookie.set("isCollapse", JSON.stringify(state.isCollapse), {
      //     //  生效时间
      //     expires: 1,
      //   });
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
  },
  actions: {},
  modules: {},
});
