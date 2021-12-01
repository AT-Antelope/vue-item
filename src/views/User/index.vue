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
    <TableComponent :config="data.configTable">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.switchFlag"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </template>
      <template v-slot:buttons="slotData">
        <el-button type="danger" size="mini" @click="btnDelete(slotData)">删除</el-button>
        <el-button type="success" size="mini" @click="btnManage(slotData)"
          >管理</el-button
        >
      </template>
    </TableComponent>
  </div>
</template>
<script>
import { apiRequestUrl } from "@/api/requestUrl.js";
import TableComponent from "@c/Table";
import SelectKeyword from "@c/Select";
import { reactive } from "@vue/composition-api";
export default {
  name: "userIndex",
  components: { SelectKeyword, TableComponent },
  setup(props, { root }) {
    const data = reactive({
      // 关键字下拉框配置项
      configOptions: {
        waitForInitOptions: ["userName", "name", "region"],
      },
      // 表格配置项
      configTable: {
        selectionFlag: true,
        tableHeaderOptions: [
          { label: "邮箱/用户名", value: "email" },
          { label: "真实姓名", value: "truename" },
          { label: "手机号", value: "phone" },
          { label: "地区", value: "region" },
          { label: "角色", value: "role" },
          {
            label: "禁启用状态",
            value: "status",
            columnType: "slot",
            slotName: "status",
          },
          { label: "操作", value: "operate", columnType: "slot", slotName: "buttons" },
        ],
        requestData: {
          url: apiRequestUrl.getUserList,
          //   method: apiRequestUrl.requestMethod,
          //   data: {},
        },
      },
      // 关键字输入框
      inputKeyword: "",
      // 开关值
      switchFlag: false,
    });

    /**
     * methods
     */
    // 删除按钮
    const btnDelete = (slotData) => {
      console.log(slotData);
    };
    const btnManage = (slotData) => {
      console.log(slotData);
    };

    return {
      /* data */
      data,
      /* methods */
      btnDelete,
      btnManage,
    };
  },
};
</script>
<style lang="scss" scoped>
/* 顶部栏 */
.label-wrap {
  @include labelDom(left, 60, 40);
}
.el-table {
  margin-top: 30px;
}
</style>
