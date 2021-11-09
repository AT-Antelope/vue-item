<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
    </el-form>
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

    return {
      typeSelectKey,
      formTypeOptions,
      datePickerTime,
      searchKey,
      searchOption,
      searchKey_input,
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
