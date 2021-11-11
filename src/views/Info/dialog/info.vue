<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_add_flag"
      @close="closeDialog"
      width="580px"
    >
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, watchEffect } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    //   单项数据流，父传子，不能反向修改数据，使用watch监听可以实现
    openFlag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    /**
     * data
     */
    // 新增会话框的显示flag
    const dialog_info_add_flag = ref(false); // 实际上使用.sync修饰器后子组件内的初始值并没有效果
    // 标识label宽度
    const formLabelWidth = ref("70px");

    // 表单内
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
      textarea: "",
    });

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

    /**
     * methods
     */
    // 关闭新增对话框，并返回给父组件
    const closeDialog = () => {
      // 关闭对话框时，将本组件的dialog_info_add_flag值修改为false
      dialog_info_add_flag.value = false;
      //   //   返回给父组件的值
      //   this.$emit("closeFlag", false);
      //   更简单的方法，直接使用.sync修饰器，将子传父的值绑定
      //   this.$emit 相当于　解构后的emit
      emit("update:openFlag", false);
    };

    return {
      /* ref */
      dialog_info_add_flag,
      formLabelWidth,
      /* reactive */
      form,
      /* methods */
      closeDialog,
    };
  },
};
</script>

<style lang="scss" scope></style>
