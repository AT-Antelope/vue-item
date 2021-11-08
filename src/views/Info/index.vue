<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="类型: ">
            <el-select v-model="typeSelectKey" placeholder="请选择">
              <el-option
                v-for="item in formTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="日期: ">
            <el-date-picker
              v-model="datePickerTime"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="关键字: ">
            <el-select v-model="searchKey" placeholder="请选择">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="3">
          <el-input v-model="searchKey_input" placeholder="请输入内容"></el-input>
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
<style lang="scss" scoped></style>
