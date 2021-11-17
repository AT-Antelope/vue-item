// import { GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
  const categoryItem = reactive({
    item: [],
  });
  /**
   * 获取分类
   */
  //   方法一
  const getInfoCategory = () => {
    GetCategoryAll({})
      .then((response) => {
        let data = response.data.data;
        categoryItem.item = data;
      })
      .catch((error) => {});
  };

  // 方法二
  // 使用Vuex，实现异步

  return {
    categoryItem,
    getInfoCategory,
  };
}
