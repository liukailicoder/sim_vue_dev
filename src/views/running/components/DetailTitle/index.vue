<!--
 * @Descripttion:
 * @version:
 * @Author: liukaili
-->

<template>
  <div class="case_Top">
    <div class="header">
      <TipName :tip-name="'案例基本信息'" />
      <el-button type="primary" @click="goBack" class="bo-dark-button">返回</el-button>
    </div>

    <div class="type_box">
      <div v-for="(item, index) in titleArray" :key="index">
        <span>{{ item.ELEMENT_NAME }}：</span>
        <span>{{ item.VALUE }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    caseTitle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      titleArray: []
    }
  },
  created() {},
  methods: {
    getInitView() {
      if (this.caseTitle && Object.keys(this.caseTitle).length > 0) {
        let Element_List = this.caseTitle;
        this.titleArray = this.transFormedArray(Element_List);
        // console.log("标题",this.titleArray)
      }
    },
    transFormedArray(elementList) {
      const keys = Object.keys(elementList);
      return keys.map(key => elementList[key]);
    },

    goBack() {
      this.$router.push('/simulation/index')
    }
  },
  watch: {
    caseTitle: {
      handler(newVal) {
        this.caseTitle = newVal;
        console.log("--详情-this.caseTitle===", this.caseTitle)
        this.getInitView()
      },
      deep: true

    },

  },
}
</script>

<style lang="scss" scoped>
.case_Top {
  width: 100%;
  height: 160px;
  margin: 4px 0;
  padding: 12px;
  //  border-top:2px solid rgba(72, 147, 238,0.4);
  //   border-bottom:2px solid rgba(72, 147, 238,0.4);
  background-color: rgba(0, 0, 0, 0.1862745098);
  .header {
    display: flex;
    border-bottom: 2px solid rgba(71, 146, 237, 0.4);
    // border-image: linear-gradient(#02113a, #086294, #02113a) 2 10 2;
    .page-card-search-name {
      flex: 1;
    }
  }
  .type_box {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 11px 10px;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: flex-start;

    > div {
      flex-basis: 16%;
      height: 45px;
      line-height: 45px;
      /* padding-bottom: 25px; */
      display: flex;
      align-items: center;

      & > :nth-child(1) {
        font-family: '微软雅黑';
        color: #fff;
        font-size: 14px;
      }

      & > :nth-child(2) {
        font-family: '微软雅黑';
        color: #00ccff;
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
}
</style>
