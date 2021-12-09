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
        <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="truename">
          <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="form.phone" placeholder="请输入手机号"> </el-input>
        </el-form-item>
        <!-- 地区 -->
        <el-form-item label="地区:" :label-width="formLabelWidth" prop="region">
          <CityPicker
            :cityPickerInit="data.cityPickerInitDatas"
            :cityPickerDatas.sync="data.cityPickerResults"
          />
        </el-form-item>
        <!-- 是否启用 -->
        <el-form-item label="是否启用:" :label-width="formLabelWidth" prop="status">
          <el-radio v-model="form.status" label="0">禁用</el-radio>
          <el-radio v-model="form.status" label="1">启用</el-radio>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限:" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="form.role">
            <!-- <el-checkbox label="系统管理员"></el-checkbox>-->
            <el-checkbox label="infoSystem">信息管理员</el-checkbox>
            <el-checkbox label="userSystem">用户管理员</el-checkbox>
          </el-checkbox-group>
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
import sha1 from "js-sha1";
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
  setup(props, { root, emit, refs }) {
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
      // 初始化省市区街组件显示的显示个数
      cityPickerInitDatas: [], //["province", "city", "area", "street"]
      // 接收返回出来的结果值
      cityPickerResults: {},
    });
    // 表单内数据model
    const form = reactive({
      username: "", // 用户名
      truename: "", // 真实姓名
      password: "", // 密码
      phone: "", // 手机号
      region: "", // 地区
      status: "0", // 禁启用radio，单选值
      role: [], // 角色，checkList的绑定值
    });
    // 从父组件接收到的分类数据
    const categoryOptions = reactive({
      item: [],
      current: [],
    });

    /**
     * methods
     */
    // 弹窗关闭事件，关闭新增对话框，并在@close返回给父组件
    const closeDialog = () => {
      // 关闭对话框时，将本组件的dialog_info_add_flag值修改为false
      dialog_info_add_flag.value = false;
      emit("update:openFlag", false);
    };
    // 弹窗打开事件，点击新增按钮时把接收父组件的数据存储起来
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
      formValidate();
      /**
       * 深拷贝,(注意：对象会丢失)
       *    JSON.parse(JSON.stringify(data.form)) // 输出字符串，再次转json对象
       * 浅拷贝
       *    Object.assign({}, data.form) // 拷贝出来的就是一个对象
       */
      // JSON的方法是深拷贝，否则浅拷贝的对象引用，会使界面上绑定的值类型变化，导致界面的值绑定失败
      //   let requestData = JSON.parse(JSON.stringify(form));
      let requestData = Object.assign({}, form);
      requestData.password = sha1(requestData.password);
      //   requestData.region = JSON.stringify(data.cityPickerResults);
      requestData.region = data.cityPickerResults;
      requestData.role = requestData.role.join();
      console.log(requestData);
      // 请求接口
      root.$store
        .dispatch("common/userAdd", requestData)
        .then((response) => {
          // console.log(request);
          root.$message.success(response.data.message);
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          resetForm();
        });
    };
    // 表单验证
    const formValidate = () => {
      if (!form.username) {
        root.$message({
          type: "error",
          message: "用户名不能为空！",
        });
        return false;
      }
      if (!form.password) {
        root.$message({
          type: "error",
          message: "密码不能为空！",
        });
        return false;
      }
      if (form.role.length === 0) {
        root.$message({
          type: "error",
          message: "角色权限不能为空！",
        });
        return false;
      }
    };
    // 清除表单
    const resetForm = () => {
      data.cityPickerResults = {};
      // 清除表单
      refs.addInfoForm.resetFields();
    };

    /**
     * watch
     */
    // 监听是否显示dialog组件
    watchEffect(() => {
      // 接收父组件传来的值
      dialog_info_add_flag.value = props.openFlag;
    });
    // CityPicker组件返回有值时储存结果
    watch(
      () => data.cityPickerResults,
      (newValue) => {
        form.region = newValue;
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
    };
  },
};
</script>

<style lang="scss" scope></style>
