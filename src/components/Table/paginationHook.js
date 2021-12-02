import { reactive } from "@vue/composition-api";
export function pagination() {
  /**
   * data
   */
  const pageData = reactive({
    pageSize: 10, // 默认显示条数
    pageSizes: [5, 10, 20, 50, 100], // 显示的条数下拉框
    currentPage: 1, // 当前页数
    pageTotal: 0, // 数据总条数
  });

  /**
   * methods
   */
  // 改变总条数
  const pageTotalChanging = (value) => (pageData.pageTotal = value);
  // 显示条数改变时
  const handleSizeChange = (value) => {
    pageData.pageSize = value;
  };
  // 当前页改变时
  const handleCurrentChange = (value) => {
    pageData.currentPage = value;
  };

  return {
    /* data */
    pageData,
    /* methods */
    pageTotalChanging,
    handleSizeChange,
    handleCurrentChange,
  };
}
