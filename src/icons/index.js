import Vue from "vue";
import SvgIcon from "./SvgIcon";

// 原写法
// Vue.component("svg-icon", {
//   template: "<div>{{ msg }}</div>",
//   data() {
//     return {
//       msg: "component template",
//     };
//   },
//   setup(props) {},
// });

// 提取出来后的写法
Vue.component("svg-icon", SvgIcon);

/**
 * 解析svg文件
 * require.context: 读取指定目录的所有文件，参数: (目录，是否遍历子目录，定义遍历文件规则)
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
