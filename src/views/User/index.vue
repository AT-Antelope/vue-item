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
        <el-button
          type="danger"
          size="small"
          class="float-right"
          @click="data.openFlag = true"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <TableComponent
      ref="userTable"
      :config="data.configTable"
      :tableRowData.sync="data.tableRowDatas"
    >
      <!-- 插槽 -->
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-value="1"
          inactive-value="0"
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
      <template v-slot:tableFooterLeft>
        <el-button size="mini" @click="btnDeleteSelected">批量删除</el-button>
      </template>
      <!-- /插槽 -->
    </TableComponent>
    <!-- dialog组件 -->
    <DialogUserAdd :openFlag.sync="data.openFlag" />
  </div>
</template>
<script>
import { global } from "@/utils/global.js";
import DialogUserAdd from "./dialog/add";
import { apiRequestUrl } from "@/api/requestUrl.js";
import TableComponent from "@c/Table";
import SelectKeyword from "@c/Select";
import { reactive } from "@vue/composition-api";
export default {
  name: "userIndex",
  components: { SelectKeyword, TableComponent, DialogUserAdd },
  setup(props, { root, refs }) {
    const { Comfirm } = global();
    const data = reactive({
      // 储存当前操作的对象值
      userCurrentDatas: {},
      // 关键字下拉框配置项
      configOptions: {
        waitForInitOptions: ["userName", "name", "region"],
      },
      // 用于接收table表格的当前行数据
      tableRowDatas: {},
      // 表格配置项
      configTable: {
        selectionFlag: true,
        tableHeaderOptions: [
          { label: "邮箱/用户名", value: "username" },
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
          method: apiRequestUrl.requestMethod,
          data: {
            pageNumber: 1,
            pageSize: 10,
          },
        },
        // 页码组件
        paginationFlag: true, // 是否显示组件
        paginationLayout: "total, sizes, prev, pager, next, jumper", // 显示的参数,"total, sizes, prev, pager, next, jumper"
      },
      // 关键字输入框
      inputKeyword: "",
      // 开关值
      switchFlag: false,
      // dialog组件，显示flag
      openFlag: false,
    });

    /**
     * methods
     */
    // 删除按钮
    const btnDelete = (slotData) => {
      data.userCurrentDatas = slotData.data;
      // 确认弹窗
      Comfirm({
        msg: "是否确认删除用户？确认后将无法恢复!",
        title: "警告",
        fn: deleteFn,
        catchFn: () => {},
      });
    };
    // 删除按钮，确认执行方法
    const deleteFn = () => {
      let requestData = { id: Array.of(data.userCurrentDatas.id) };
      root.$store
        .dispatch("common/userDelete", requestData)
        .then((response) => {
          root.$message.success(response.data.message);
          // 组件通讯，通过table组件的ref值，来调用组件内的方法
          refs.userTable.tableRefreshData();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 编辑按钮
    const btnManage = (slotData) => {
      data.userCurrentDatas = slotData.data;
      console.log(slotData);
    };
    // 批量删除按钮
    const btnDeleteSelected = () => {
      let selectedID = data.tableRowDatas.id;
      // 没有选中的id时提示，第一次没选之前，tableRowDatas里没有key为id，选之后才有
      if (!selectedID || selectedID.length === 0) {
        root.$message.error("请勾选需要删除的用户!");
        return false;
      }
      // 确认弹窗
      Comfirm({
        msg: "是否确认删除选中的用户？确认后将无法恢复!",
        title: "警告",
        fn: deleteSelectedFn,
        catchFn: () => {},
      });
    };
    // 批量删除，确认执行方法
    const deleteSelectedFn = () => {
      let requestData = {
        id: data.tableRowDatas.id,
      };
      root.$store
        .dispatch("common/userDelete", requestData)
        .then((response) => {
          root.$message.success(response.data.message);
          // 组件通讯，通过table组件的ref值，来调用组件内的方法
          refs.userTable.tableRefreshData();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      /* data */
      data,
      /* methods */
      btnDelete,
      btnManage,
      btnDeleteSelected,
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
