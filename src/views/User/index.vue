<template>
  <div>
    <!-- 顶部栏 -->
    <el-row :gutter="15">
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字: </label>
          <div class="wrap-content">
            <el-row :gutter="15">
              <el-col :span="3">
                <SelectKeyword :config="data.configOptions" />
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="data.inputKeyword"
                  placeholder="请输入关键字"
                ></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger" size="small">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" size="small" class="float-right">新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SelectKeyword from "@c/Select";
import { reactive } from "@vue/composition-api";
export default {
  name: "userIndex",
  components: { SelectKeyword },
  setup(props, { root }) {
    const data = reactive({
      // 关键字下拉框
      configOptions: ["userName", "name", "region"],
      // 关键字输入框
      inputKeyword: "",
    });
    return {
      /* data */
      data,
    };
  },
};
</script>
<style lang="scss" scoped>
/* 顶部栏 */
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>
