<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { computed, ref } from "@vue/composition-api";
export default {
  name: "svgIcon",
  //   props: ["iconClass", "iconName"],
  props: {
    iconClass: {
      type: String,
      default: "",
      //   required: true, // 是否为必填项
      //   validator: (value) => {
      //     // 校验
      //     return (value = "menu_iconClass");
      //   },
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const msg = ref("component template svgIcon");

    /**
     * 计算属性，得出最终结果并返回，computed(()=>{get:() => {}, set:() => {})
     */
    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      msg,
      iconName,
      svgClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor; // 必须设置fill: currentColor 后，color才能生效
  color: #fff;
  //   &.font12 {
  //     font-size: 12px;
  //   }
  //   &.font50 {
  //     font-size: 50px;
  //   }
}
</style>
