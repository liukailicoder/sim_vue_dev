<template>
  <i :class="icon" :style="style" v-if="icon.includes('el-icon')" />
  <svg-icon v-else :icon-class="icon" :style="style" />
</template>
<script>
export default {
  name: "Icon",
  computed: {
    style() {
      let style = {
        width: this.size,
        height: this.size,
        color: this.color
      };
      return style;
    },
  },
  props: {
    color: {
      type: String,
      default: 'currentColor',
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "1em",
    },
  },
};
</script>
