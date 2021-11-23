<template>
  <div></div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "infoDetails",
  setup(props, { root }) {
    const data = reactive({});
    return {
      data,
    };
  },
};
</script>
<style lang="scss" scope></style>
