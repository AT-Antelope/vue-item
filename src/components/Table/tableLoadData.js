import { reactive } from "@vue/composition-api";
// 加载表格数据
export function loadData() {
  const tableData = reactive({
    item: [],
    pageTotal: 0,
  });
  // 初始化请求数据
  const tableLoadData = (params, root) => {
    let requestData = {
      url: params.url,
      method: params.method,
      data: params.data,
    };
    // 获取用户列表
    root.$store
      .dispatch("common/loadTableData", requestData)
      .then((response) => {
          let responseData = response.data.data.data;
        // 数据检验，有时返回的数据可能为null，现后台已做返回必定是个数组，无论是否为空
        // if (responseData && responseData.length > 0) {
        // }
        tableData.item = responseData;
        tableData.pageTotal =
          responseData.length === 0 ? 0 : response.data.data.total;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    /* data */
    tableData,
    /* methods */
    tableLoadData,
  };
}
