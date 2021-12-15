<template>
  <el-select v-model="data.selectedValue" placeholder="请选择" @change="selectOnChange">
    <el-option
      v-for="item in data.selectKeywordOptions"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  /**
   * 组件目录: src/components/Select/index.vue
   * 引用方式: import SelectKeyword from "@c/Select";
   * template: <SelectKeyword :config="..." />
   * 参数配置: {
   *             config : ["username","truename","phone"]
   *          }
   *
   */
  name: "selectKeyword",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    searchSelectedData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const data = reactive({
      //下拉框值
      selectedValue: "",
      // 下拉框数据
      selectKeywordOptions: [],
      // 用于初始化的数据
      options: [
        { value: "username", label: "邮箱/用户名" },
        { value: "truename", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "region", label: "地区" },
        { value: "role", label: "角色" },
      ],
    });

    /**
     * methods
     */
    // 初始化下拉框数据
    let initOptions = () => {
      let waitForInitOptions = props.config.waitForInitOptions;
      // 数据检验
      if (waitForInitOptions.length === 0) {
        console.log("传进来的config的参数是空的，无法显示下拉菜单");
        return false;
      }
      // !!! 不要直接对数据绑定的值进行循环操作，否则每次改变都会进项一次重新渲染，影响性能
      let optionsArr = [];
      waitForInitOptions.forEach((item) => {
        let arr = data.options.filter((filterItem) => filterItem.value == item); // filter匹配成功后是个数组，需要取下标
        if (arr.length > 0) {
          optionsArr.push(arr[0]);
        }
      });
      // 数据检验
      if (optionsArr.length === 0) {
        console.log("匹配的数据optionsArr为空");
        return false;
      }
      // 初始化赋值
      data.selectKeywordOptions = optionsArr;
      // 初始化搜索类型
      data.selectedValue = optionsArr[0].value;
    };
    // 搜索类型选择值改变时
    const selectOnChange = (value) => {
      let filterData = data.options.filter((item) => item.value == value)[0];
      emit("update:searchSelectedData", filterData);
    };

    /**
     * life sycle
     */
    onMounted(() => {
      initOptions();
    });
    return {
      /* data */
      data,
      /* methods */
      selectOnChange,
    };
  },
};
</script>
<style lang="scss" scoped></style>
