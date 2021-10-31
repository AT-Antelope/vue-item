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
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <!-- label 里的 for属性，与某个元素的id绑定，点击此label时聚焦点于绑定元素上 -->
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <label for="password">密码</label>
          <el-input
            id="password"
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
          <label for="passwordVerify">确认密码</label>
          <el-input
            id="passwordVerify"
            type="password"
            v-model="ruleForm.passwordVerify"
            autocomplete="off"
            minlength="8"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="securityCode" class="form-item">
          <label for="securityCode">验证码</label>
          <!-- gutter,栅格间隔 -->
          <!-- 原为v-model.number，去除.number后，解决输入框中输入数字后不能输入字母的问题 -->
          <el-row :gutter="11">
            <el-col :span="16">
              <el-input
                id="securityCode"
                v-model="ruleForm.securityCode"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                class="block securityCodeButton"
                @click="getSms()"
                :disabled="securityCodeStatus.status"
                >{{ securityCodeStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 
             @click="submitForm('ruleForm')"
            el-form里改成了loginForm，所以传参也要改成loginForm
        -->
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="block login-btn"
            plain
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Login, Register } from "@/api/login.js";
import { reactive, ref, isRef, toRef, onMounted } from "@vue/composition-api";
// 在vue.config.js里配置了解析别名(alias)
// 同样配置了自动添加后缀名后，可以省略后缀名
import { stripscript, validateEmail, validatePwd, validateCode } from "@/utils/validate";

export default {
  name: "login",
  /**
   * 这里面放置data数据、生命周期、自定义的函数
   * 解构写法
   *    attrs: (...)        ==> this.$attr
        emit: (...)         ==> this.$emit
        isServer: (...)     ==> this.$isServer
        listeners: (...)    ==> this.$listeners
        parent: (...)       ==> this.$parent
        refs: (...)         ==> this.$refs
        root: (...)         ==> this
   */
  //   setup(props, context) {
  setup(props, { refs, root }) {
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

    /*************************************************************
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

    // 登录按钮禁用状态
    const loginButtonStatus = ref(true);

    // 验证码按钮禁用状态
    // const securityCodeStatus = ref(false);   // 已替换为securityCodeStatus对象

    //   securityCodeStatus.value = true;
    const securityCodeStatus = reactive({
      status: false,
      text: "获取验证码",
    });

    // 倒计时
    const timerCountDown = ref(null);

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

    /**
     * 1.不建议在一个方法里做多件不同的时间(尽可能只做自己本身的事，不要做其他人的事),其他事封装到其他方法里调用就好了
     * 2.尽量把相同的事情封装在一个方法里，通过调用函数执行
     */

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

      clearFormData();

      //   重置获取验证码按钮的文本
      //   securityCodeStatus.text = "获取验证码";
      clearCountDown(); //  这里使用封装好的清除定时器的方法有效完成重新初始化
    };

    // 重置表单
    const clearFormData = () => {
      //   this.$refs[formName].resetFields();    // 2.0写法
      //   refs["loginForm"].resetFields();   // 3.0
      refs.loginForm.resetFields(); //  element-ui的方法
    };

    // 更新按钮状态
    const updateButtonStatus = (params) => {
      securityCodeStatus.status = params.status;
      securityCodeStatus.text = params.text;
    };

    // 获取验证码
    const getSms = () => {
      // 进行提示
      //等价于===false
      //   前端拦截，可减少服务器承载压力
      if (ruleForm.username == "") {
        root.$message({ showClose: true, message: "邮箱不能为空", type: "error" }); //element-ui的message组件_!?报错找不到message(全局变量?)
        return false;
      }
      // 后端接口问题: 出现违反规则也返回成功的情况，进行重新判断一次，或许已修复
      //   if (validateEmail(ruleForm.username)) {
      //     root.$message.error("邮箱格式有误，请重新输入!");
      //     return false;
      //   }

      // 请求的接口，获取验证码
      let request = {
        username: ruleForm.username,
        // module: "login",
        module: model.value,
      };

      // 修改获取验证码按钮禁用状态
      updateButtonStatus({
        status: true,
        text: "获取中",
      });

      // 发送获取验证码请求
      GetSms(request)
        .then((response) => {
          root.$message({
            showClose: true,
            duration: 30000,
            message: response.data.message,
            type: "success",
          });

          // 启用登录/注册按钮
          loginButtonStatus.value = false;

          // 倒计时定时器
          countDown(5);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // 表单数据提交
    const submitForm = (formName) => {
      // 原为$refs[formName]
      // context.refs[formName]，在setup()里传入{refs}，即解构，省略写法
      //   等于refs.forName
      refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证通过
          //   if (model == "login") {
          //     loginData();
          //   } else {
          //     registerData();
          //   }
          model == "login" ? loginData() : registerData();
          alert("submit!");
        } else {
          root.$message({
            message: "提交失败",
            type: "error",
          });
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**
     * 登录
     */
    const loginData = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.securityCode,
        module: "login",
      };
      Login(requestData)
        .then((response) => {
          console.log("登录成功");
        })
        .catch((error) => {
          console.log("出错了");
        });
    };

    /**
     * 注册
     */
    const registerData = () => {
      // 声明参数数据
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.securityCode,
        module: "register",
      };
      // 创建请求
      Register(requestData)
        .then((response) => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success",
          });

          // 注册成功后转到登录界面
          toggleMenu(menuTab[0]);
          //   清除倒计时
          clearCountDown();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    /**
     * 倒计时
     */
    const countDown = (countDownTime) => {
      // 判断定时器是否存在，存在则删除，防止多次触发定时器
      if (timerCountDown.value) {
        clearCountDown();
      }

      let time = countDownTime;
      timerCountDown.value = setInterval(() => {
        time--; // time = time--;
        if (time <= 0) {
          // 清除定时器
          clearInterval(timerCountDown.value);
          //   取消禁用获取验证码按钮，并改变文本
          updateButtonStatus({
            status: false,
            text: "重新获取",
          });
        } else {
          //   securityCodeStatus.text = time;
          securityCodeStatus.text = `${time}秒后重新获取`; // es5
          //   updateButtonStatus({ text: `${time}秒后重新获取` });   //还未验证是否可行
        }
      }, 1000);
    };

    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 清除定时器
      clearInterval(timerCountDown.value);

      // 还原获取验证码按钮的默认状态
      updateButtonStatus({
        status: false,
        text: "获取验证码",
      });
    };

    /**
     * 声明周期
     * 挂载完成后
     */
    onMounted(() => {
      //   console.log(process.env.VUE_APP_ABC);
    });

    return {
      menuTab,
      model,
      loginButtonStatus,
      securityCodeStatus,
      timerCountDown,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      clearFormData,
      updateButtonStatus,
      getSms,
      countDown,
      loginData,
      registerData,
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
  .securityCodeButton {
    color: #fff;
  }
}
</style>
