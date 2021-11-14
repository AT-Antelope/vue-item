import { MessageBox } from "element-ui";
export function global() {
  const deleteTableItem = (params) => {
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
        console.log("canceled");
      });
  };
  return {
    deleteTableItem,
  };
}
