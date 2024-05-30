<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-21 16:31:55
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 14:38:51
-->
<template>
  <div class="box">
    <img src="@/assets/home_images/border_top.png" alt="" class="border_top_image">
    <div class="Name">{{ titleName }}</div>
    <slot></slot>
    <img src="@/assets/home_images/border_bot.png" alt="" class="border_bot_image">
  </div>
</template>

<script>
  import TipName from '@/components/TipName'
  let echarts = require("echarts");
  export default {
    name: "BaseCaseStatus",
    props: {
      titleName: {
        type: String,
        default: ''
      }

    },
    components: {
      TipName
    },
    data() {
      return {
        myChart: null,
      }
    },
    methods: {



    },
    watch: {

    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
<style lang='scss' scoped>
  .box {
    width: 100%;
    height: auto;
    padding: 30px 20px;
    margin-bottom: 30px;
    box-shadow: inset 0 0 20px #247CFF;
    border-left: 1px solid #0099FF;
    border-right: 1px solid #0099FF;
    position: relative;

    .Name {
      font-size: 16px;
      font-weight: 600;
      font-family: '微软雅黑';
      margin-left: 10px;
      position: absolute;
      color: #FFFFFF;
      top: -5px;
      left: 9px;

      &::before {
        content: ' ';
        width: 5px;
        height: 19px;
        display: inline-block;
        position: absolute;
        background-color: #409EFF;
        left: -9px;
        top: -1px;
      }
    }
  }

  .box::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(0%);
    width: calc(100% - 150px);
    height: 1px;
    background-color: #0099FF;
  }

  .box::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(0%);
    width: calc(100% - 50px);
    height: 1px;
    background-color: #0099FF;
  }

  .border_top_image {
    width: 38px;
    height: 9px;
    position: absolute;
    position: absolute;
    top: -1px;
    right: calc(100% - 172px);
    transform: translateX(0);

  }

  .border_bot_image {
    width: 43px;
    height: 7px;
    position: absolute;
    bottom: -3px;
    left: calc(100% - 46px);
    transform: translateX(0);
  }
</style>