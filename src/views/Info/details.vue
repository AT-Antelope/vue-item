<template>
  <div></div>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "infoDetails",
  setup(props, { root }) {
    const data = reactive({});

    /**
     * life cycle
     */
    onMounted(() => {
      console.log(root.$store.getters["infoDetails/infoId"]);
      console.log(root.$store.getters["infoDetails/infoTitle"]);
    });

    return {
      data,
    };
  },
};
</script>
<style lang="scss" scope></style>
