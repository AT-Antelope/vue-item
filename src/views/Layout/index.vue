<template>
  <div :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNavigation />
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNavigation from "./Components/Navigation";

export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNavigation },
  setup(props, { root }) {
    /**
     * computed
     */
    const menuStatus = computed(() => {
      return root.$store.state.isCollapse;
    });

    return {
      menuStatus,
    };
  },
};
</script>
<style lang="scss" scoped></style>
