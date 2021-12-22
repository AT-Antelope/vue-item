<template>
  <div>
    <div id="main-wrap">
      <div class="main-content">
        <div class="content">
          <!-- 需要缓存 -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <!-- 不需要缓存 -->
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
      </div>
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

  //   //   新的做法
  //   position: fixed;
  //   left: $navMenuWidth;
  //   top: 75px;
  //   right: 0;
  //   bottom: 0;
  //   box-sizing: border-box;
  //   //   box-sizing: border-box后使用border也能实现margin的效果
  //   //   margin: 30px 0 0 30px;
  //   border: 30px solid #f7f7f7;
  //   border-bottom: none;

  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeaderHeight;
  //   padding-left: $navMenuWidth;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.close {
  .main-content {
    padding-left: $navMenuWidthOnClosed;
  }
}
.open {
  .main-content {
    padding-left: $navMenuWidth;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  border: 30px solid #e9e9e9;
  border-bottom: none;
  @include webkit(box-sizing, border-box);
}
</style>
