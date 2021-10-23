<template>
  <div id="login">
    <div class="login-warp">
      <!-- 顶部选项卡 -->
      <ul class="menu-tab">
        <!-- <li class="selected">login</li>
        <li>register</li> -->
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ selected: item.active }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="8"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwordVerify"
          class="form-item"
          v-show="model === 'register'"
        >
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwordVerify"
            autocomplete="off"
            minlength="8"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="securityCode" class="form-item">
          <label>验证码</label>
          <!-- gutter,栅格间隔 -->
          <el-row :gutter="11">
            <el-col :span="16">
              <el-input
                v-model.number="ruleForm.securityCode"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            plain
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>
<script>
import { reactive, ref, isRef, toRef, onMounted } from "@vue/composition-api";
// 在vue.config.js里配置了解析别名(alias)
// 同样配置了自动添加后缀名后，可以省略后缀名
import { stripscript, validateEmail, validatePwd, validateCode } from "@/utils/validate";
export default {
  name: "login",
  // 这里面放置data数据、生命周期、自定义的函数
  //   setup(props, context) {
  // 解构写法
  setup(props, { refs }) {
    // 验证用户名为邮箱
    let validateUsername = (rule, value, callback) => {
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
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据，更新绑定的数据，
      ruleForm.password = stripscript(value);
      // 再重新传给value来进行验证判断
      value = ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePwd(value)) {
        callback(new Error("密码长度应为8到16位，且同时包含字母和数字"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    let validateSecurityCodeVerify = (rule, value, callback) => {
      // 如果modoelFlag为login时，说明页面上没有重复密码输入框，则跳过验证
      // 由于使用的是v-show，login页面提交时重复密码输入框只是隐藏了，还是会进行验证
      if (model === "login") {
        callback();
      }
      // 过滤后的数据，更新绑定的数据，
      ruleForm.passwordVerify = stripscript(value);
      // 再重新传给value来进行验证判断
      value = ruleForm.passwordVerify;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    let validateSecurityCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      }
      setTimeout(() => {
        if (!validateCode(value)) {
          callback(new Error("请填写正确的验证码"));
        } else {
          callback();
        }
      }, 1000);
    };

    /**
     * 声明数据
     * reactive，声明的数据是对象类型时
     */
    // 顶部选项卡
    const menuTab = reactive([
      { txt: "登录", active: true, modelFlag: "login" },
      { txt: "注册", active: false, modelFlag: "register" },
    ]);

    /**
     *  ref，声明数据是基础类型时，取值时使用.value
     */
    //   模块值，顶部选项卡的flag
    const model = ref("login");
    // 判断是否为基础类型
    // console.log(isRef( model) ? "model是数据类型" : "model是对象类型");
    // console.log(isRef(menuTab) ? "menuTab是数据类型" : "menuTab是对象类型");

    // 表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      securityCode: "",
      passwordVerify: "",
    });

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      securityCode: [{ validator: validateSecurityCode, trigger: "blur" }],
      passwordVerify: [{ validator: validateSecurityCodeVerify, trigger: "blur" }],
    });

    // 改变导航栏选项卡的当前激活状态
    const toggleMenu = (item) => {
      // 曾尝试传入index或使用target/currentTarget来使当前对象改变，失败
      // 先把menuTab中的所有item的active都改为false
      menuTab.forEach((e) => {
        e.active = false;
      });
      // 再把当前的更改为true，高亮
      item.active = true;
      //    更新模块值为当前选项卡的model属性，用于选择其他选项框时改变确认密码输入框的显示状态
      model.value = item.modelFlag;
    };

    // 表单数据
    const submitForm = (formName) => {
      // 原为$refs[formName]
      // context.refs[formName]，在setup()里传入{refs}，即解构，省略写法
      refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**
     * 声明周期
     * 挂载完成后
     */
    onMounted(() => {});

    return {
      menuTab,
      model,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
    };
  },
  data() {
    return {};
  },
  //   created() {},  // vue3.0已去除
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block; //如果使用block会导致每个独占一行
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }
  .selected {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .form-item {
    margin-bottom: 13px;
  }
  .block {
    //   改为块元素后可以占满一整行
    display: block;
    width: 100%;
    padding: 0;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
