<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadConfig.imageAction"
    :data="data.uploadKey"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="data.image" :src="data.image" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { reactive, onMounted, watch } from "@vue/composition-api";
export default {
  /**
   * 1.组件的过程中要做什么事 (七牛云的token，显示默认图片，选择图片后渲染自身图片)
   * 2.最终结果要做什么   (返回选择后的图片路径)
   */
  name: "uploadImg",
  props: {
    // imageUrl 在读取接口后才有值，所以需要监听
    imageUrl: {
      type: String,
      default: "",
    },
    // uploadConfig 一开始就有值，不需要监听
    uploadConfig: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    /**
     * data
     */
    const data = reactive({
      image: "",
      uploadKey: {
        token: "",
        key: "",
      },
    });

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
      let img = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
      data.image = img;
      // 在父组件标签必须要有.sync修饰符，才能反向修改值
      emit("update:imageUrl", img);
    };
    // 获取七牛云token
    const getQiniuToken = () => {
      let requestData = {
        ak: props.uploadConfig.accessKey,
        sk: props.uploadConfig.secretKey,
        buckety: props.uploadConfig.buckety,
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

    /**
     * life cycle
     */
    watch(
      () => props.imageUrl,
      (value) => {
        data.image = value;
      }
    );
    onMounted(() => {
      // 获取七牛云token
      getQiniuToken();
    });

    return {
      /* data */
      data,
      /* methods */
      beforeAvatarUpload,
      handleAvatarSuccess,
      getQiniuToken,
    };
  },
};
</script>
<style lang="scss" scoped></style>
