<template>
  <div>
    <div id="main-wrap">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#main-wrap {
  //我的做法
  //   width: 100vw;
  //   height: 100vh;
  //   border: 1px solid blue;
  //   padding: 75px 0 0 250px;
  //   box-sizing: border-box;
  //   margin-top: 30px;
  //   margin-left: 30px;

  //   新的做法
  position: fixed;
  left: $navMenuWidth;
  top: 75px;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  //   box-sizing: border-box后使用border也能实现margin的效果
  //   margin: 30px 0 0 30px;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
</style>
