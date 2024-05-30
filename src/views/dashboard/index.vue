<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-19 20:59:04
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 21:58:33
-->
<template>
  <div class="dashboard-container">
    <!-- 首页 -->
    <el-row :gutter="24">
      <el-col :span="9">
        <div style="padding: 0 10px;">
          <!-- 案例情况 -->
          <BaseCase :homeInfoData="homeInfoData" />
          <!-- 案例状态分析 -->
          <BaseCaseStatus :homeInfoData="homeInfoData" />
          <!-- 运行案例主体资源分布 -->
          <BaseCaseWork @getTitle="getTitle" :publishArray="publishArray" />
        </div>
      </el-col>
      <el-col :span="15" class="right_box">
        <BaseBorderStyle :titleName="titleName">
          <div class="title">
            <span>调峰</span>
          </div>
          <div class="container_r">
            <BaseTitle :caseTitle="caseTitle" />
            <BaseInfo :caseData="caseData" />
          </div>
        </BaseBorderStyle>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BaseCase from './components/BaseCase'
  import BaseCaseStatus from './components/BaseCaseStatus'
  import BaseCaseWork from './components/BaseCaseWork'
  import BaseBorderStyle from './components/BaseBorderStyle'
  import BaseTitle from './components/BaseTitle'
  import BaseInfo from "./components/BaseInfo"
  export default {
    name: 'Dashboard',
    components: {
      BaseCase,
      BaseCaseStatus,
      BaseCaseWork,
      BaseBorderStyle,
      BaseTitle,
      BaseInfo

    },
    data() {
      return {
        caseData: {},//调峰
        caseTitle: {},
        publish_state: '',//状态入参
        publishArray: [],
        homeInfoData: {},
        titleName: "运行案例监控"


      }
    },
    computed: {

    },
    mounted() {
      this.getCaseData();
      setTimeout(() => {
        this.getHomeStatus(this.publish_state);//获取角色
      }, 10)
    },
    methods: {
      getCaseData() {
        this.$api('dashbord').homeInfo().then(res => {
          this.homeInfoData = res.data;
        }).catch(error => {
          console.log(error);
        });
        this.$api('dashbord').homeCaseData().then(res => {
          if (res.code && res.code == 200) {
            if (res.data.Trend_Chart && res.data.Trend_Chart.length > 0) {
              res.data.Trend_Chart = this.sortedItems(res.data.Trend_Chart);
            }
            this.caseData = res.data;
            this.caseTitle = res.data.Element_List;
          } else {
            //暂无数据
          }
        }).catch(error => {
          console.log(error);
        });
      },
      getTitle(index) {
        if (index == 0) {
          this.publish_state = '';
        }
        if (index == 1) {
          this.publish_state = '01'
        }
        if (index == 2) {
          this.publish_state = '02'
        }
        this.getHomeStatus()

      },
      sortedItems(Items) {
        return [...Items].sort((a, b) => a.Step - b.Step);
      },
      getHomeStatus() {
        this.$api('dashbord').homeStatus(this.publish_state).then(res => {
          this.publishArray = res.data;
        }).catch(error => {
          console.log(error);
        });

      }

    },

  }
</script>

<style lang="scss" scoped>
  .dashboard-container {
    width: 100%;
    min-height: 100%;
    /* background-image: url("~@/assets/home_images/home_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat; */
    overflow: hidden;
    padding: 30px 10px;
  }

  .right_box {
    .title {
      width: 90px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("~@/assets/home_images/peakShaving.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;

      >span {
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .container_r {
    margin-top: 10px;
    width: 100%;
    height: auto;
    background: rgba(0, 0, 0, 0.1862745098);
    border-radius: 6px;
    padding: 11px 20px;
  }
</style>