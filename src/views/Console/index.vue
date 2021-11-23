<template>
  <div class="outter-wrap">
    <div class="outter">
      <h1>欢迎进入首页</h1>
      <h3><-- 请在导航栏选择想进行的操作</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "console",
  setup(props, { root }) {},
};
</script>
<style lang="scss" scoped>
.outter-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .outter {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    font-size: 3em;
    text-align: center;
    padding: 10px;
    border: 4mm ridge rgba(gold, 0.8);
    h1 {
      /* 将背景裁剪成文字的前景色 */
      @include webkit(background-clip, text);
      color: transparent;
      background-image: linear-gradient(
          217deg,
          rgba(255, 0, 0, 0.8),
          rgba(255, 0, 0, 0) 70.71%
        ),
        linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
        linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
    }
    h3 {
      font-size: 1em;
      /* 字体渐变 */
      @include webkit(background-clip, text);
      color: transparent;
      background-image: linear-gradient(to right, orange, purple);
    }
  }
}
</style>
