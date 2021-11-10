<template>
  <div>
    <!-- 表单类别 -->
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型: </label>
          <div class="wrap-content">
            <el-select v-model="typeSelectKey" placeholder="请选择">
              <el-option
                v-for="item in formTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <!-- 选择时间 -->
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期: &nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="datePickerTime"
              type="datetimerange"
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
            <el-select v-model="searchKey" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in searchOption"
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
          v-model="searchKey_input"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%">搜索</el-button>
      </el-col>
      <!-- 必须为有个值才能撑大，为空时无效 -->
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%">新增</el-button>
      </el-col>
    </el-row>

    <!-- 用于分离空间，为下面的元素撑出空隙 -->
    <div class="black-space-30"></div>

    <!-- 表格数据 -->
    <el-table :data="formTable" border style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" width="830px"> </el-table-column>
      <el-table-column prop="category" label="类别" width="130px"> </el-table-column>
      <el-table-column prop="date" label="日期" width="237px"> </el-table-column>
      <el-table-column prop="user" label="管理人" width="115px"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="error" size="mini">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用于分离空间，为下面的元素撑出空隙 -->
    <div class="black-space-30"></div>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="small">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="float-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "infoIndex",
  setup(props, { root }) {
    /**
     * data
     */
    // 表单类别选项框_默认值
    const typeSelectKey = ref(1);

    // 表单类别
    const formTypeOptions = reactive([
      {
        value: 1,
        label: "国际信息",
      },
      {
        value: 2,
        label: "国内信息",
      },
      {
        value: 3,
        label: "行业信息",
      },
    ]);

    // 选择时间
    const datePickerTime = ref("");

    // 关键字选项框_默认值
    const searchKey = ref("id");

    // 关键字选项框
    const searchOption = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);

    // 关键字搜索框
    const searchKey_input = ref("");

    // 表格数据
    const formTable = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选，，特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
      {
        title:
          "习近平在中央政协工作会议庆祝中国人民政治协商会议成立70周年大会上发表重要讲话",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "张三",
      },
      {
        title: "基里巴斯与台当局“断交”系蔡当局上台后断交第7国",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "李四",
      },
      {
        title: "不选了！纽约市长白思豪宣布退出2020美国大选",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "李四",
      },
    ]);

    // 底部分页
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
    };

    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
    };

    return {
      typeSelectKey,
      formTypeOptions,
      datePickerTime,
      searchKey,
      searchOption,
      searchKey_input,
      formTable,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
<style lang="scss" scoped>
// @import "@/styles/config.scss";
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
