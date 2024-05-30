<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-20 18:52:16
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 21:36:35
-->

<template>
  <div class="case_Top">
    <BaseBorderStyle class="case_box" :titleName="titleName">
      <div class="item" v-for="(item,index) in caseList" :key="index">
        <div>
          <img :src="item.icons" alt="" class="icons">
          <span>{{item.title}}</span>
          <span>{{item.nums}}</span> 个
        </div>
      </div>
    </BaseBorderStyle>
  </div>
</template>

<script>
  import BaseBorderStyle from "../BaseBorderStyle";
  export default {
    name: "BaseCase",
    props: {
      homeInfoData: {
        type: Object, default: () => { }
      }
    },
    components: {
      BaseBorderStyle
    },
    data() {
      return {
        caseList: [
          {
            icons: require('@/assets/home_images/case_Icon.png'),
            title: "案例总数：",
            nums: 15
          },
          {
            icons: require('@/assets/home_images/case_surface.png'),
            title: "发布案例：",
            nums: 2
          }
        ],
        titleName: "案例情况"


      }
    },
    created() {
    

    },
    methods: {
      getInitView() {
        this.caseList[0].nums = Number(this.homeInfoData["published"]) + Number(this.homeInfoData["unpublished"]);
        this.caseList[1].nums = this.homeInfoData["published"];
      }


    },
    watch: {
      homeInfoData: {
        handler(newVal) {
          this.homeInfoData = newVal;
          this.getInitView()
        },
        deep: true

      },

    },
  };
</script>

<style lang='scss' scoped>
  .case_Top {
    width: 100%;


    .case_box {
      width: 100%;
      height: 172px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item {
        >div {
          display: flex;
          justify-content: center;
          align-items: center;

          .icons {
            width: 45px;
            height: 45px;
            margin-right: 10px;
          }

          font-size: 16px;
          font-family: '微软雅黑';
          color: #ffff;
          font-weight: 400;

          &>:nth-child(3) {
            font-size: 32px;
            font-family: '微软雅黑';
            color: #0DDDB6;
            font-weight: 400;
            padding-left: 8px;
          }
        }

      }

    }

  }
</style>