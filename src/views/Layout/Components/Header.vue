<template>
  <div id="header-wrap">
    <div class="float-left header-icon" @click="navMenuState">
      <svg-icon iconID="menuHeader" className="menuHeader" />
    </div>
    <div class="float-right">
      <div class="user-info float-left">
        <img src="@/assets/profile.png" alt="profile" />
        <h1 class="float-right">{{ $store.state.app.username }}</h1>
      </div>
      <div class="header-icon float-left" @click="logout">
        <svg-icon iconID="logout" className="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../../../icons/SvgIcon.vue";
import { ref, computed } from "@vue/composition-api";
export default {
  components: { SvgIcon },
  setup(props, { root }) {
    /**
     * data
     */

    /**
     * computed
     */
    const username = computed(() => {
      root.$store.state.app.username;
    });

    /**
     * actions
     */
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };

    // 退出
    const logout = () => {
      root.$store
        .dispatch("app/removeToken")
        .then((response) => {
          root.$router.push({
            name: "Login",
          });
        })
        .catch((error) => {
          root.$message.error("退出失败");
          console.log(error);
        });
    };

    return {
      username,
      navMenuState,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  //   left: $navMenuWidth;
  right: 0;
  height: 75px;
  background-color: #fff;
  z-index: 1;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba($color: #000000, $alpha: 0.1));
  @include webkit(transition, all 0.5s ease 0s);
}
.close {
  #header-wrap {
    left: $navMenuWidthOnClosed;
  }
}
.open {
  #header-wrap {
    left: $navMenuWidth;
  }
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
  img {
    width: 36px;
    height: 36px;
    margin: 20px 0;
  }
  h1 {
    font-size: 14px;
    margin: 0 22px 0 18px;
  }
}
</style>
