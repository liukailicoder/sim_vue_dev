<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-19 20:59:04
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-21 15:55:06
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" @click="clickLogo">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div class="sidebar_log" v-if="logo">
          <img src="~@/assets/logo_images/logo.png" alt="" class="logo_bg">
        </div>
      </div>
      <div v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="~@/assets/logo_images/logo.png" alt="" class="logo_bg">
        <img src="~@/assets/logo_images/logo_title.png" alt="" class="logo_title">

      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SidebarLogo',
    props: {
      collapse: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        title: '仿真平台',
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
      }
    },
    methods: {
      clickLogo() {
        this.$store.dispatch('app/toggleSideBar')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 80px;
    background: #001529;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .sidebar_log {
        height: 80px;
        position: relative;
        margin-top: 4px;

        >img {
          width: 60px;
          height: 60px;
        }
      }

      .logo_bg {
        width: 45px;
        height: 45px;
        margin-top: 7px;
      }
    }

    .logo_title {
      width: 100%;
      height: auto;
      margin-top: 5px;
    }

    /* &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    } */


  }
</style>