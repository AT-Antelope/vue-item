import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/main.scss";
import "./router/permit";
// 自定义全局方法,Vue2.0
// import globalFunction from "./utils/global.js";
// 自定义全局组件，需要在vue.config.js中把vue的runtime模式改为compiler模式，且需要配置chainWebpack
import "@/icons";

Vue.use(ElementUI);
// Vue.use(globalFunction); //Vue2.0
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
