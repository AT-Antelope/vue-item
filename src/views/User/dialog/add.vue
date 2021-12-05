<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_add_flag"
      @close="closeDialog"
      @opened="openDialog"
      width="630px"
    >
      <el-form :model="form" ref="addInfoForm">
        <!-- 用户名 -->
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="form.userName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="form.truename" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <!-- 地区 -->
        <el-form-item label="地区:" :label-width="formLabelWidth">
          <CityPicker :cityPickerDatas.sync="data.cityPickerResults" />
        </el-form-item>
        <!-- 是否启用 -->
        <el-form-item label="是否启用:" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色:" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入内容"> </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="danger" :loading="submit_loading_flag" @click="submit"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CityPicker from "@c/cityPicker";
import { AddInfo } from "@/api/news";
import { ref, reactive, watch, watchEffect } from "@vue/composition-api";
export default {
  /**
   * element弹窗组件
   * 接收参数：
   *      openFlag：弹窗的显示flag
   *      category：对应的分类类别
   */
  name: "dialogInfo",
  components: { CityPicker },
  props: {
    //   单项数据流，父传子，不能反向修改数据，使用watch监听可以实现
    openFlag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { root, emit }) {
    /**
     * data
     */
    // 新增会话框的显示flag
    const dialog_info_add_flag = ref(false); // 实际上使用.sync修饰器后子组件内的初始值并没有效果
    // 标识label宽度
    const formLabelWidth = ref("90px");
    // 确定按钮的是否加载中状态
    const submit_loading_flag = ref(false);

    const data = reactive({
      cityPickerResults: {},
    });
    // 表单内数据model
    const form = reactive({
      userName: "",
      truename: "",
      phone: "",
    });
    // 从父组件接收到的分类数据
    const categoryOptions = reactive({
      item: [],
      current: [],
    });

    /**
     * methods
     */
    // 关闭新增对话框，并在@close返回给父组件
    const closeDialog = () => {
      // 关闭对话框时，将本组件的dialog_info_add_flag值修改为false
      dialog_info_add_flag.value = false;
      //   //   返回给父组件的值
      //   this.$emit("closeFlag", false);
      //   更简单的方法，直接使用.sync修饰器，将子传父的值绑定
      //   this.$emit 相当于　解构后的emit
      emit("update:openFlag", false);
      resetForm();
    };
    // 点击新增按钮时把接收父组件的数据存储起来
    const openDialog = () => {
      categoryOptions.item = props.category;
    };
    // element-ui的select组件的change:选中值发生变化时触发事件
    const categorySelectChanged = (value) => {
      // 储存当前分类的id
      categoryOptions.current = { id: value };
    };
    // 提交按钮
    const submit = () => {
      // 有输入框为空时，提示用户
      if (form.title == "" || form.content == "") {
        root.$message({
          type: "error",
          message: "标题、类型不能为空！",
        });
        return false;
      }
      // 改变按钮状态为加载中
      submit_loading_flag.value = true;
      let data = {
        category_id: categoryOptions.current.id,
        title: form.title,
        content: form.content,
        // create_date: "2021-06-25 16:39:38",
        // image_url: "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg",
        // status: "1",
      };
      AddInfo(data)
        .then((response) => {
          let data = response.data;
          root.$message({
            type: "success",
            message: data.message,
          });
          // 取消按钮加载中状态
          submit_loading_flag.value = false;
          resetForm();
          // 成功后关闭新增页面
          emit("update:openFlag", false);
        })
        .catch((error) => {
          console.log(error);
          // 取消按钮加载中状态
          submit_loading_flag.value = false;
        });
    };
    // 清除表单，element-ui的resetFields()无效，采用传统方法
    const resetForm = () => {
      // 清除分类选择器
      form.category = "";
      form.title = "";
      form.content = "";
    };

    /**
     * watch
     */
    //   watch: {   // vue2.0
    //     openFlag: {
    //       // 接收父组件传来的值
    //       handler(newValue, oldValue) {
    //         this.dialog_info_add_flag = newValue;
    //       },
    //     },
    //   },
    watchEffect(() => {
      // 接收父组件传来的值
      dialog_info_add_flag.value = props.openFlag;
    });
    // 监听时，貌似只能监听当前对象内第一层的值变化，内部key的value变化时并不会执行，不知道为什么
    watch(
      [
        () => data.cityPickerResults.selectProvince,
        () => data.cityPickerResults.selectCity,
        () => data.cityPickerResults.selectArea,
        () => data.cityPickerResults.selectStreet,
      ],
      ([resultProvince, resultCity, resultArea, resultStreet]) => {
        console.log(data.cityPickerResults);
      }
    );

    return {
      /* ref */
      dialog_info_add_flag,
      formLabelWidth,
      submit_loading_flag,
      /* reactive */
      data,
      form,
      categoryOptions,
      /* methods */
      closeDialog,
      openDialog,
      categorySelectChanged,
      submit,
      resetForm,
    };
  },
};
</script>

<style lang="scss" scope></style>
