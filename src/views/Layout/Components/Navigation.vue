<template>
  <div>
    <div id="nav-wrap">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="transparent"
        :collapse="isCollapse"
        text-color="#fff"
        active-text-color="#fff"
        router="true"
      >
        <template v-for="(item, index) in routers">
          <el-submenu v-if="!item.hidden" :key="item.id" :index="index">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-location"></i>
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
import { ref } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //   菜单是否为折叠状态，默认为false(展开)
    const isCollapse = ref(false);

    // 从router里获取数据
    const routers = root.$router.options.routes;
    console.log(routers);

    return {
      isCollapse,
      routers,
    };
  },
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenuWidth;
  height: 100vh;
  background-color: #344a5f;
}
</style>
