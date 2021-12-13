<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_add_flag"
      @close="closeDialog"
      @opened="openDialog"
      width="630px"
    >
      <el-form
        :model="data.form"
        :rules="data.validateRules"
        ref="addInfoForm"
        status-icon
      >
        <!-- 用户名 -->
        <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
          <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
          <el-input v-model="data.form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="w">
          <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model.number="data.form.phone" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <!-- 地区 -->
        <el-form-item label="地区:" :label-width="formLabelWidth">
          <CityPicker
            :cityPickerInit="data.cityPickerInitDatas"
            :cityPickerDatas.sync="data.cityPickerResults"
          />
        </el-form-item>
        <!-- 是否启用 -->
        <el-form-item label="是否启用:" :label-width="formLabelWidth">
          <el-radio v-model="data.form.status" label="0">禁用</el-radio>
          <el-radio v-model="data.form.status" label="1">启用</el-radio>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限:" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="data.form.role">
            <!-- <el-checkbox label="系统管理员"></el-checkbox>-->
            <el-checkbox label="infoSystem">信息管理员</el-checkbox>
            <el-checkbox label="userSystem">用户管理员</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          type="danger"
          :loading="submit_loading_flag"
          @click="submit('addInfoForm')"
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
import { stripscript, validateEmail, validatePwd, validateCode } from "@/utils/validate";
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
    editData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit, refs }) {
    /**
     * ***************************************************************
     * 验证规则
     * 必须在绑定的数据定义前声明，否则定义规则时，验证方法不存在，视为默认通过
     */
    // 验证用户名为邮箱
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
        // 输入格式与正则表达式reg不符时
      } else if (!validateEmail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback(); //返回true
      }
    };

    // 验证密码
    const validatePassword = (rule, value, callback) => {
      if (value) {
        // 过滤后的数据，更新绑定的数据，
        data.form.password = stripscript(value);
        // 再重新传给value来进行验证判断
        value = data.form.password;
      }
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePwd(value)) {
        callback(new Error("密码长度应为8到16位，且同时包含字母和数字"));
      } else {
        callback();
      }
    };
    // ***************************************************************
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
      cityPickerInitDatas: [], // ["province", "city", "area", "street"]
      // 接收返回出来的结果值
      cityPickerResults: {},
      // 验证规则
      validateRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        role: [{ required: true, message: "请选择角色权限", trigger: "change" }],
      },
      // 表单内数据model
      form: {
        username: "", // 用户名
        password: "", // 密码
        truename: "", // 真实姓名
        phone: "", // 手机号
        region: "", // 地区
        status: "0", // 禁启用radio，单选值
        role: [], // 角色，checkList的绑定值
      },
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
      // 储存从父组件传进来的数据
      categoryOptions.item = props.category;
      let editData = props.editData;
      editData.role = editData.role.split(",");
      data.form = editData;
    };
    // element-ui的select组件的change:选中值发生变化时触发事件
    const categorySelectChanged = (value) => {
      // 储存当前分类的id
      categoryOptions.current = { id: value };
    };
    // 提交按钮
    const submit = (formName) => {
      /**
       * 深拷贝,(注意：对象会丢失)
       *    JSON.parse(JSON.stringify(data.form)) // 输出字符串，再次转json对象
       * 浅拷贝
       *    Object.assign({}, data.form) // 拷贝出来的就是一个对象
       */
      // JSON的方法是深拷贝，否则浅拷贝的对象引用，会使界面上绑定的值类型变化，导致界面的值绑定失败
      //   let requestData = JSON.parse(JSON.stringify(form));
      // 表单验证
      refs[formName].validate((valid) => {
        if (valid) {
          let requestData = Object.assign({}, data.form);
          requestData.password = sha1(requestData.password);
          //   requestData.region = JSON.stringify(data.cityPickerResults);
          requestData.region = data.cityPickerResults;
          requestData.role = requestData.role.join();
          // 请求接口
          root.$store
            .dispatch("common/userAdd", requestData)
            .then((response) => {
              // console.log(request);
              root.$message.success(response.data.message);
              resetForm();
              closeDialog();
              emit("refreshData");
            })
            .catch((error) => {
              console.log(error);
              resetForm();
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
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
        data.form.region = newValue;
      }
    );

    return {
      /* ref */
      dialog_info_add_flag,
      formLabelWidth,
      submit_loading_flag,
      /* reactive */
      data,
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
