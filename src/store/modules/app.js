const state = {
  // isCollapse: false,
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
};

const getters = {};

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    //   Cookie.set("isCollapse", JSON.stringify(state.isCollapse), {
    //     //  生效时间
    //     expires: 1,
    //   });
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
};

const actions = {
  //   使用actions进行异步登录，即链式编程: 获取到结果后继续做某事
  // 第一个参数为默认的content，为包含state、mutations等的对象
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      // 接口
      Login(requestData)
        .then((response) => {
          resolve(); // 执行 调用这个方法的地方 的.then
        })
        .catch((error) => {
          reject();
        });
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
