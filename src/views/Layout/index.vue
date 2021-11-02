<template>
  <div>
    <LayoutHeader />
    <LayoutMain />
    <LayoutNavigation />
  </div>
</template>
<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNavigation from "./Components/Navigation";

export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNavigation },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
