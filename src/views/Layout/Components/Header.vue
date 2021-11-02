<template>
  <div>
    <div id="header-wrap"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenuWidth;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba($color: #000000, $alpha: 0.1);
  z-index: 1;
}
</style>
