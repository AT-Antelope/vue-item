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
    <TableComponent :config="data.configTable" />
  </div>
</template>
<script>
import TableComponent from "@c/Table";
import SelectKeyword from "@c/Select";
import { reactive } from "@vue/composition-api";
export default {
  name: "userIndex",
  components: { SelectKeyword, TableComponent },
  setup(props, { root }) {
    const data = reactive({
      // 关键字下拉框
      configOptions: {
        waitForInitOptions: ["userName", "name", "region"],
      },
      configTable: {
        selectionFlag: true,
        tableHeaderOptions: [
          { label: "邮箱/用户名", value: "email" },
          { label: "真实姓名", value: "name" },
          { label: "手机号", value: "phone" },
          { label: "地区", value: "address" },
          { label: "角色", value: "role" },
        ],
      },
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
