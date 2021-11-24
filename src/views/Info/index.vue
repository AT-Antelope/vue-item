<template>
  <div>
    <!-- 表单类别 -->
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类: </label>
          <div class="wrap-content">
            <el-select v-model="category_value" placeholder="请选择">
              <el-option
                v-for="item in formType_options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <!-- 选择日期 -->
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期: &nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="datePicker_value"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <!-- 关键字搜索 -->
      <el-col :span="3">
        <!--  -->
        <div class="label-wrap keyword">
          <label for="">关键字: &nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="search_key" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in search_option"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!--  -->
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keyInput"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="getInfo">搜索</el-button>
      </el-col>
      <!-- 必须为有个值才能撑大，为空时无效 -->
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="dialog_info_add_flag = true"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <!-- 用于分离空间，为下面的元素撑出空隙 -->
    <div class="black-space-30"></div>

    <!-- 表格数据 -->
    <el-table
      :data="form_table.item"
      border
      v-loading="table_loading_flag"
      @selection-change="selectionChanged"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" width="830px"> </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类别"
        :formatter="formatToTitle"
        width="130px"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        :formatter="formatToDate"
        width="237px"
      >
      </el-table-column>
      <el-table-column prop="user" label="管理人" width="115px"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row)"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="buttonEditInfo(scope.row.id)"
            >编辑</el-button
          >
          <!-- <router-link :to="{ name: 'InfoDetails' }" class="margin-left-10"> -->
          <el-button type="success" size="mini" @click="buttonDetailsEdit(scope.row)"
            >编辑详情</el-button
          >
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 用于分离空间，为下面的元素撑出空隙 -->
    <div class="black-space-30"></div>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="small" @click="deleteSelected" class="button-color-black"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="float-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="infoTotal"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <!-- <DialogInfo :openFlag.sync="dialog_info_add_flag" @closeFlag="dialogClose" /> -->
    <DialogInfo
      :openFlag.sync="dialog_info_add_flag"
      :category="formType_options.category"
    />
    <!-- 编辑弹窗 -->
    <DialogInfoEdit
      :openFlag.sync="dialog_info_edit_flag"
      :id="editingInfoID"
      :category="formType_options.category"
      @getTitle="getTitle"
      @getList="getInfo"
    />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import DialogInfoEdit from "./dialog/infoEdit";
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global.js";
import { timestampToTime } from "@/utils/common";
export default {
  name: "infoIndex",
  components: { DialogInfo, DialogInfoEdit },
  setup(props, { root }) {
    //   自定义全局方法，调用后声明
    const { Comfirm } = global();

    /**
     * data
     */
    // 新增弹窗显示状态，父传子
    const dialog_info_add_flag = ref(false);
    const dialog_info_edit_flag = ref(false);
    // 表单加载中状态的flag
    const table_loading_flag = ref(false);
    // 表单类别选项框_默认值
    const category_value = ref("");
    // 选择日期
    const datePicker_value = ref("");
    // 关键字选项框_默认值
    const search_key = ref("title");
    // 关键字搜索框
    const search_keyInput = ref("");
    // 修改中的信息ID
    const editingInfoID = ref("");
    // 已勾选项目(删除)
    const selectedItems = ref("");
    // 表单信息总数量
    const infoTotal = ref(0);

    // 表单类别
    const formType_options = reactive({
      category: [],
    });
    // 关键字选项框
    const search_option = reactive([
      {
        value: "title",
        label: "标题",
      },
      {
        value: "id",
        label: "ID",
      },
    ]);
    // 表格数据
    //   {
    //     title: "纽约市长白思豪宣布退出总统竞选，，特朗普发推回应",
    //     category: "国内信息",
    //     date: "2019-09-10 19:31:31",
    //     user: "管理员",
    //   },
    const form_table = reactive({
      item: [],
    });
    const page = reactive({
      currentPage: 1,
      pageSize: 10,
    });

    /**
     * function
     */
    // 底部分页
    // 每页数量改变时触发
    const handleSizeChange = (val) => {
      page.pageSize = val;
    };
    // 改变当前页数时触发
    const handleCurrentChange = (val) => {
      page.currentPage = val;
      getInfo();
    };
    // 左侧选择项值发生变化时
    const selectionChanged = (value) => {
      let id = value.map((item) => item.id);
      selectedItems.value = id;
    };
    // 标题转换，formatter: element-ui组件的方法，返回一个值替换原始值
    const formatToTitle = (row, column, cellValue, index) => {
      let ID = row.categoryId;
      let category = formType_options.category.filter((item) => item.id == ID)[0];
      return category.category_name;
    };
    // 日期格式转换，formatter: element-ui组件的方法，返回一个值替换原始值
    const formatToDate = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate);
    };
    // 简单方法，使用.sync修饰器后，可以实现父子组件同步，直接向父组件修改值
    // 回调时需要做逻辑处理时，不能用修饰器
    // const dialogClose = () => {
    //   // 只进行父传子时，只改变了子组件的值为false，父组件还是true，需要子组件用回调的方式$emit()返回给父组件值后，父组件接收，实现修改父组件的值
    //   dialog_info_add_flag.value = false;
    // };
    // 删除操作
    const deleteItem = (data) => {
      // Vue2.0的方法
      //   root.deleteItem({
      //     msg: "是否删除此信息?",
      //     title: "提示",
      //     fn: "",
      //   });

      //   Vue3.0,(xxxy.value)可以做到监听(watch)到其他组件的值，不在必须在同一组件内调用方法
      Comfirm({
        msg: "是否删除此信息?",
        title: "提示",
        id: data.id,
        fn: deleteItemFn,
        catchFn: () => {},
      });
    };
    // 删除操作执行方法
    const deleteItemFn = (data) => {
      // id: "1,2,3" 或  id: "1"
      let requestData = {
        id: [data],
      };
      root.$store
        .dispatch("common/deleteInfo", requestData)
        .then((response) => {
          console.log(response);
          let data = response.data;
          root.$message({
            type: "success",
            message: data.message,
          });
          getInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 编辑按钮
    const buttonEditInfo = (id) => {
      // 储存当前要修改的信息ID，用于父传子给DialogInfoEdit自定义组件
      editingInfoID.value = id;
      // 显示自定义组件
      dialog_info_edit_flag.value = true;
    };
    // 编辑详情按钮
    const buttonDetailsEdit = (data) => {
      //   // 本在details.vue里，拿到外面来预先储存，否则刷新页面后由于没有值传进去，会把空值储存起来
      //   // commit(同步)，dispatch(异步)
      //   root.$store.commit("infoDetails/SET_ID", data.id);
      //   root.$store.commit("infoDetails/SET_TITLE", data.title);
      // 另一种储存方法(更高级)，在store里循环储存
      root.$store.commit("infoDetails/UPDATE_STATE_VALUE", {
        id: {
          value: data.id,
          sessionKey: "infoId",
          session: true,
        },
        title: {
          value: data.title,
          sessionKey: "infoTitle",
          session: true,
        },
      });

      // 这种方法需要在路由配置里的path属性里，加上需要传的参数，如/:id/:title
      //   root.$router.push({
      //     path: `/infoDetails/${data.id}/${data.title}`,
      //   });
      // vuex 结合 HTML5本地储存，参数不显示，解决传参参数丢失
      root.$router.push({
        name: "InfoDetails",
        params: {
          id: data.id,
          title: data.title,
        },
      });
    };
    // 批量删除
    const deleteSelected = () => {
      if (!selectedItems.value || selectedItems.value.length == 0) {
        root.$message({
          type: "warning",
          message: "请选择需要删除的数据！",
        });
        return false;
      }
      // 自定义全局方法
      Comfirm({
        msg: "是否删除所有已选中的信息?",
        title: "提示",
        fn: deleteSelectedFn,
      });
    };
    // 批量删除执行方法
    const deleteSelectedFn = () => {
      let requestData = { id: selectedItems.value };
      root.$store
        .dispatch("common/deleteInfo", requestData)
        .then((response) => {
          let data = response.data;
          root.$message({
            type: "success",
            message: data.message,
          });
          // 删完后清除待删除暂存数组
          selectedItems.value = "";
          // 刷新数据
          getInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 获取分类信息
    const getInfoCategory = () => {
      root.$store.dispatch("common/getInfoCategory").then((response) => {
        formType_options.category = response;
      });
    };
    // 搜索/筛选条件处理
    const handlerSearchCondition = () => {
      // categoryId: 1,
      // title: "vue3",
      // id: 1,
      // pageNumber: 1,
      // pageSize: 10
      let requestData = {
        pageNumber: page.currentPage,
        pageSize: page.pageSize,
      };
      // 分类ID
      if (category_value.value) {
        requestData.categoryId = category_value.value;
      }
      // 日期
      if (datePicker_value.value.length > 0) {
        requestData.startTime = datePicker_value.value[0];
        requestData.endTime = datePicker_value.value[1];
      }
      // 关键字
      //   if (search_key.value == "id") {
      //     requestData.id = search_keyInput.value;
      //   }
      //   if (search_key.value == "title") {
      //     requestData.title = search_keyInput.value;
      //   }
      requestData[search_key.value] = search_keyInput.value;

      return requestData;
    };
    //获取列表信息_子传父_新增弹窗
    const getInfo = () => {
      let requestData = handlerSearchCondition();
      table_loading_flag.value = true; // 请求前显示加载中状态
      root.$store
        .dispatch("common/getInfoList", requestData)
        .then((response) => {
          let data = response.data;
          form_table.item = data.data; // 更新数据
          infoTotal.value = data.total; // 存储统计数据
          table_loading_flag.value = false; // 请求成功更新加载状态
        })
        .catch((error) => {
          console.log(error);
          table_loading_flag.value = false; // 请求失败也更新加载状态
        });
    };
    // 获取标题_子传父_编辑弹窗
    const getTitle = (returnData) => {
      let data = form_table.item.filter((item) => item.id == returnData.id);
      data[0].title = returnData.title;
    };

    /**
     * life cycle
     */
    onMounted(() => {
      getInfoCategory();
      getInfo();
    });

    return {
      /* ref */
      dialog_info_add_flag,
      dialog_info_edit_flag,
      table_loading_flag,
      category_value,
      datePicker_value,
      search_key,
      search_keyInput,
      editingInfoID,
      selectedItems,
      infoTotal,
      /* reactive */
      formType_options,
      form_table,
      search_option,
      page,
      /* function */
      handleSizeChange,
      handleCurrentChange,
      handlerSearchCondition,
      selectionChanged,
      formatToTitle,
      formatToDate,
      //   dialogClose,
      deleteItem,
      buttonEditInfo,
      buttonDetailsEdit,
      deleteSelected,
      deleteSelectedFn,
      getTitle,
      getInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
// @import "@/styles/config.scss";
button {
  color: white;
}
.label-wrap {
  &.category {
    //   $text-align, $width, $line-height
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keyword {
    @include labelDom(right, 100, 40);
  }
}
</style>
