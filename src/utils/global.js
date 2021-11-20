import { MessageBox } from "element-ui";
import { reactive } from "@vue/composition-api";
export function global() {
  // 分类数组，用于储存getInfoCategory()获得的数据
  const categoryItem = reactive({
    item: [],
  });

  /**
   * 获取分类
   */
  // 方法二
  // 使用Vuex，实现异步
  //   方法一
  const getInfoCategory = () => {
    GetCategoryAll({})
      .then((response) => {
        let data = response.data.data;
        categoryItem.item = data;
      })
      .catch((error) => {});
  };

  /**
   * message提示框
   */
  const Comfirm = (params) => {
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
        params.fn && params.fn(params.id || "");
      })
      .catch(() => {
        params.catchFn && params.catchFn(params.id || "");
      });
  };

  return {
    // data
    categoryItem,
    // methods
    getInfoCategory,
    Comfirm,
  };
}
