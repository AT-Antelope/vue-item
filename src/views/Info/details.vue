<template>
  <el-form ref="form" :model="form" label-width="12 0px">
    <!-- 信息分类 -->
    <el-form-item label="信息分类:">
      <el-select v-model="form.categoryId">
        <el-option
          v-for="item in data.category"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 新闻标题 -->
    <el-form-item label="新闻标题:">
      <el-input v-model="form.title" class="inputTitle"></el-input>
    </el-form-item>
    <!-- 图片上传 -->
    <el-form-item label="缩略图:" label-position="right" label-width="71px">
      <el-upload
        class="avatar-uploader"
        action="http://up-z2.qiniup.com"
        :data="data.uploadKey"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- 发布日期 -->
    <el-form-item label="发布日期:">
      <el-date-picker
        v-model="form.createDate"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="form.pickerOptions"
        :disabled="form.date_picker_disabled"
      >
      </el-date-picker>
    </el-form-item>
    <!-- 详细内容 -->
    <el-form-item label="详细内容:">
      <!-- <div class="edit_container"> -->
      <quill-editor
        v-model="form.editorContent"
        ref="myQuillEditor"
        :options="form.editorOption"
      />
      <!-- </div> -->
    </el-form-item>
    <!-- 底部按钮部分 -->
    <el-form-item>
      <el-button
        type="primary"
        @click="buttonSubmit"
        :loading="data.submit_loading_flag.value"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { timestampToTime } from "@/utils/common.js";
import { reactive, onMounted } from "@vue/composition-api";
// 富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "infoDetails",
  components: { quillEditor },
  setup(props, { root }) {
    /**
     * data
     */
    const data = reactive({
      category: [],
      // (第一次进入)从Info/index.vue里把id传进来，(刷新页面后)拿不到接收的值就从vuex获取
      id: root.$route.params.id || root.$store.getters["infoDetails/infoId"],
      // 提交按钮加载中状态
      submit_loading_flag: false,
      uploadKey: {
        token: "",
        key: "",
      },
    });
    // 要提交的数据
    const form = reactive({
      categoryId: "",
      title: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      createDate: "",
      date_picker_disabled: true,
      // 图片上传
      imageUrl: "",
      // 富文本文本框配置
      editorContent: "",
      editorOption: {
        placeholder: "请在这里输入",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
      },
    });

    /**
     * methods
     */
    // 获取分类信息
    const getInfoCategory = () => {
      root.$store.dispatch("common/getInfoCategory").then((response) => {
        data.category = response;
      });
    };
    // 获取信息
    const getInfo = () => {
      let requestData = {
        id: data.id,
        pageNumber: 1,
        pageSize: 1,
      };
      root.$store
        .dispatch("common/getInfoList", requestData)
        .then((response) => {
          let responseData = response.data.data[0];
          // 更新form数据
          form.categoryId = responseData.categoryId;
          form.title = responseData.title;
          form.createDate = timestampToTime(responseData.createDate);
          form.editorContent = responseData.content;
          form.imageUrl = responseData.imgUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 图片上传
    // ---选择文件后
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadKey.key = key;

      return isJPG && isLt2M;
    };
    // ---上传成功后
    const handleAvatarSuccess = (res, file) => {
      /**
       * res:{
       *    hash:"...",
       *    key:"..."
       * }
       */
      form.imageUrl = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
      //   form.imageUrl = URL.createObjectURL(file.raw);
    };
    // 获取七牛云token
    const getQiniuToken = () => {
      let requestData = {
        ak: "AXs9_jiNK_Fy4HyYRzujTuxFSm3x6V7M",
        sk: "gUsR1ngTi08vf4f43p6A7U3B3wT3tvt-bVEW",
        buckety: "vue-item",
      };
      root.$store
        .dispatch("common/qiniuToken", requestData)
        .then((response) => {
          let responseData = response.data;
          let token = responseData.data.token;
          data.uploadKey.token = token;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 确定按钮(提交)
    const buttonSubmit = () => {
      // 有输入框为空时，提示用户
      if (form.title == "" || form.content == "") {
        root.$message({
          type: "error",
          message: "标题、类型不能为空！",
        });
        return false;
      }
      // 改变按钮状态为加载中
      data.submit_loading_flag = true;
      // 请求参数
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.editorContent,
        createDate: form.createDate,
        imageUrl: form.imageUrl,
        // status: "",
      };
      root.$store
        .dispatch("common/editInfo", requestData)
        .then((response) => {
          let data = response.data;
          root.$message({
            type: "success",
            message: data.message,
          });
          // 取消按钮加载中状态
          data.submit_loading_flag = false;
        })
        .catch((error) => {
          console.log(error);
          // 取消按钮加载中状态
          data.submit_loading_flag = false;
        });
    };

    /**
     * life cycle
     */
    onMounted(() => {
      //   let id = root.$route.params.id || root.$store.getters["infoDetails/infoId"];
      //   let title =
      //     root.$route.params.title || root.$store.getters["infoDetails/infoTitle"];

      // 获取分类信息
      getInfoCategory();
      // 获取信息数据
      getInfo();
      // 获取七牛云token
      getQiniuToken();
    });

    return {
      /* data */
      data,
      form,
      /* methods */
      buttonSubmit,
      handleAvatarSuccess,
      beforeAvatarUpload,
      getInfo,
    };
  },
};
</script>
<style lang="scss" scope>
.inputTitle {
  width: 367px;
}
.quill-editor {
  display: inline-block;
  .ql-container {
    .ql-editor {
      height: 300px;
    }
  }
}
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
