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
// 在vue.config.js里配置了解析别名(alias)
// 同样配置了自动添加后缀名后，可以省略后缀名
import { stripscript, validateEmail, validatePwd, validateCode } from "@/utils/validate";
export default {
  name: "login",
  data() {
    // 验证用户名为邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
        // 输入格式与正则表达式reg不符时
      } else if (validateEmail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback(); //返回true
      }
    };

    // 验证密码
    var validatePassword = (rule, value, callback) => {
      // 过滤后的数据，更新绑定的数据，
      this.ruleForm.password = stripscript(value);
      // 再重新传给value来进行验证判断
      value = this.ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePwd(value)) {
        callback(new Error("密码长度应为8到16位，且同时包含字母和数字"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    var validateSecurityCodeVerify = (rule, value, callback) => {
      // 如果modoelFlag为login时，说明页面上没有重复密码输入框，则跳过验证
      // 由于使用的是v-show，login页面提交时重复密码输入框只是隐藏了，还是会进行验证
      if (this.model === "login") {
        callback();
      }
      // 过滤后的数据，更新绑定的数据，
      this.ruleForm.passwordVerify = stripscript(value);
      // 再重新传给value来进行验证判断
      value = this.ruleForm.passwordVerify;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    var validateSecurityCode = (rule, value, callback) => {
      //  使用验证会出现数字开头会被删去数字，以及数字开头时无法输入字母
      //   // 过滤后的数据，更新绑定的数据，
      //   this.ruleForm.securityCode = stripscript(value);
      //   // 再重新传给value来进行验证判断
      //   value = this.ruleForm.securityCode;

      if (value === "") {
        return callback(new Error("请输入验证码"));
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("验证码格式有误"));
        // } else {
        if (!validateCode(value)) {
          callback(new Error("请填写正确的验证码"));
        } else {
          callback();
          // }
        }
      }, 1000);
    };
    return {
      // 顶部选项卡
      menuTab: [
        { txt: "登录", active: true, modelFlag: "login" },
        { txt: "注册", active: false, modelFlag: "register" },
      ],
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        securityCode: "",
        passwordVerify: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        securityCode: [{ validator: validateSecurityCode, trigger: "blur" }],
        passwordVerify: [{ validator: validateSecurityCodeVerify, trigger: "blur" }],
      },
      //   模块值，顶部选项卡的flag
      model: "login",
    };
  },
  created() {},
  mounted() {},
  methods: {
    // vue 数据驱动视频渲染
    // js 操作DOM元素

    // 改变导航栏选项卡的当前激活状态
    toggleMenu(item) {
      // 曾尝试传入index或使用target/currentTarget来使当前对象改变，失败
      // 先把menuTab中的所有item的active都改为false
      this.menuTab.forEach((e) => {
        e.active = false;
      });
      // 再把当前的更改为true，高亮
      item.active = true;
      //    更新模块值为当前选项卡的model属性，用于选择其他选项框时改变确认密码输入框的显示状态
      this.model = item.modelFlag;
    },
    // 表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
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
