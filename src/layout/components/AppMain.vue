<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-19 20:59:04
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-21 11:44:08
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("~@/assets/home_images/home_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
