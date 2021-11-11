<template>
  <div>
    <div id="nav-wrap">
      <h1 class="logoIcon">
        <img src="../../../assets/logo.png" alt="" />
      </h1>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="transparent"
        :collapse="isCollapse"
        text-color="#fff"
        active-text-color="#fff"
        router
      >
        <template v-for="(item, index) in routers">
          <!-- 数值 + 空字符串，可以实现转换为string类型 -->
          <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
            <!-- 一级菜单 -->
            <template slot="title">
              <!-- 自定义全局组件 -->
              <svg-icon :iconID="item.meta.icon" :className="item.meta.icon" />
              <span>{{ item.meta.name }}</span>
            </template>
            <!-- 子级菜单 -->
            <el-menu-item-group>
              <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.id"
                :index="subItem.path"
                >{{ subItem.meta.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * data数据
     */
    // 从router里获取数据
    const routers = root.$router.options.routes;
    // console.log(routers);

    /**
     * computed监听
     */
    //   菜单是否为折叠状态，默认为false(展开)
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });

    /**
     * action
     */

    return {
      isCollapse,
      routers,
    };
  },
};
</script>
<style lang="scss" scoped>
.logoIcon {
  // img为block元素使用 margin:auto 实现居中，这里使用h1包裹
  margin: 0;
  text-align: center;
  img {
    margin: 31px auto 22px;
    width: 70px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  //   width: $navMenuWidth;
  height: 100vh;
  background-color: #344a5f;
  //   调用config.scss中的兼容mixin
  @include webkit(transition, all 0.5s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 12px;
  }
}
.close {
  #nav-wrap {
    width: $navMenuWidthOnClosed;
  }
  .logoIcon img {
    width: 80%;
  }
}
.open {
  #nav-wrap {
    width: $navMenuWidth;
  }
}
</style>
