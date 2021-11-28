<template>
  <el-select v-model="data.selectedValue" placeholder="请选择">
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
   * 参数:
   * "userName","name","phone","region","character"
   */
  name: "selectKeyword",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { root }) {
    const data = reactive({
      //下拉框值
      selectedValue: "",
      // 下拉框数据
      selectKeywordOptions: [],
      // 用于初始化的数据
      options: [
        { value: "userName", label: "邮箱/用户名" },
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "region", label: "地区" },
        { value: "character", label: "角色" },
      ],
    });

    // 初始化下拉框数据
    let initOptions = () => {
      // !!! 不要直接对数据绑定的值进行循环操作，否则每次改变都会进项一次重新渲染，影响性能
      let optionsArr = [];
      props.config.forEach((item) => {
        let arr = data.options.filter((filterItem) => filterItem.value == item)[0]; // filter匹配成功后是个数组，需要取下标
        optionsArr.push(arr);
      });
      // 初始化赋值
      data.selectKeywordOptions = optionsArr;
      // 初始化搜索类型
      data.selectedValue = optionsArr[0].value;
    };

    /**
     * life sycle
     */
    onMounted(() => {
      initOptions();
    });
    return {
      data,
    };
  },
};
</script>
<style lang="scss" scoped></style>
