<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <!-- <li class="selected">login</li>
        <li>register</li> -->
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ selected: item.active }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      menuTab: [
        { txt: "login", active: true },
        { txt: "register", active: false },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    // vue 数据驱动视频渲染
    // js 操作DOM元素

    // 改变导航栏选项卡的当前激活状态
    toggleMenu(item) {
      // 曾尝试传入index或使用target/currentTarget来使当前对象改变，失败
      // 先把menuTab中的所有item的active都改为false，再把当前的更改为true
      this.menuTab.forEach((e) => {
        e.active = false;
      });
      item.active = true;
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block; //如果使用block会导致每个独占一行
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }
  .selected {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}
</style>
