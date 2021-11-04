<template>
  <div id="header-wrap">
    <div class="float-left header-icon">
      <svg-icon iconID="menuHeader" className="menuHeader" />
    </div>
    <div class="float-right">
      <div class="user-info float-left">管理员</div>
      <div class="header-icon float-left">
        <svg-icon iconID="logout" className="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../../../icons/SvgIcon.vue";
export default {
  components: { SvgIcon },
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenuWidth;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba($color: #000000, $alpha: 0.1);
  z-index: 1;
  line-height: 75px;
}
.header-icon {
  padding: 0 28px;
  svg {
    color: #344a5f !important;
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 22px;
  border-right: 1px solid #ededed;
  // + 表示 next(下一个)
  + .header-icon {
    padding: 0 28px;
  }
}
</style>
