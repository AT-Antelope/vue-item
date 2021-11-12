import { MessageBox } from "element-ui";
export default {
  install(Vue, option) {
    /**
     * Vue2.0版需要在main里引入
     */
    // 在Vue的原型上添加方法，实现全局调用
    Vue.prototype.deleteItem = (params) => {
      MessageBox.confirm(params.msg, params.title || "提示", {
        confirmButtonText: params.confirmButtonText || "确定",
        cancelButtonText: params.cancelButtonText || "取消",
        type: params.type || "warning",
        center: params.center || true,
      })
        .then(() => {
          //   if (params.fn) {
          //     params.fn();
          //   }
          //   fn存在时为true，然后才执行fn()，相当于true && params.fn()
          params.fn && params.fn();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    };
  },
};
