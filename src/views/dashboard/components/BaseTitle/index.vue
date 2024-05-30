<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-21 16:43:11
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 14:40:08
-->

<template>
  <div class="case_Top">
    <div class="type_box">
      <div v-for="(item,index) in titleArray" :key="index">
        <span>{{item.ELEMENT_NAME}}：</span>
        <span>{{item.VALUE}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "BaseTitle",
    props: {
      caseTitle: {
        type: Object, default: () => { }
      }

    },
    data() {
      return {
        titleArray: [
          {
            title: "案例ID",
            value: 10
          },
          {
            title: "案例名称",
            value: 10
          },
          {
            title: "仿真次数",
            value: 10
          },
          {
            title: "微网数量",
            value: 10
          },
          {
            title: "组织数量",
            value: 10
          },
          {
            title: "智能主体数量",
            value: 10
          },
          {
            title: "需求主体数量",
            value: 10
          },
          {
            title: "储能主体数量",
            value: 10
          },
          {
            title: "代理主体数量",
            value: 10
          },
          {
            title: "分布式管理主体数量",
            value: 10
          },
          {
            title: "储能数量",
            value: 10
          },
          {
            title: "机组数量",
            value: 10
          },
        ]



      }
    },
    created() {


    },
    methods: {
      getInitView() {
        if (this.caseTitle && Object.keys(this.caseTitle).length > 0) {
          let Element_List = this.caseTitle;
          this.titleArray = this.transFormedArray(Element_List);
          console.log("标题", this.titleArray)
        }
      },
      transFormedArray(elementList) {
        const keys = Object.keys(elementList);
        return keys.map(key => elementList[key]);
      }






    },
    watch: {
      caseTitle: {
        handler(newVal) {
          this.caseTitle = newVal;
          console.log("this.caseTitle===", this.caseTitle)
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
    height: 140px;
    margin: 4px 0;
    border-top: 2px solid rgba(72, 147, 238, 0.4);
    border-bottom: 2px solid rgba(72, 147, 238, 0.4);

    .type_box {
      width: 100%;
      display: flex;
      align-items: center;
      /* padding: 20px 10px; */
      flex-wrap: wrap;
      justify-content: center;
      justify-content: flex-start;


      >div {
        flex-basis: 16%;
        height: 45px;
        line-height: 45px;
        /* padding-bottom: 25px; */
        display: flex;
        align-items: center;

        &>:nth-child(1) {
          font-family: "微软雅黑";
          color: #fff;
          font-size: 14px;
        }

        &>:nth-child(2) {
          font-family: "微软雅黑";
          color: #00CCFF;
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }

  }
</style>