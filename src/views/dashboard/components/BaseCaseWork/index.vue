<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-20 20:37:00
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 21:37:16
-->

<template>
  <div class="case_Top">
    <BaseBorderStyle class="status_box" :titleName="titleName">
      <div class="title_box">
        <div v-for="(item,index) in statusTitle" :key="index" class="tit_bg" @click="getTitle(item,index)"
          :class="{active:index == nowIndex} ">
          <span class="item" :class="{actives:index == nowIndex} ">{{item}}</span>
        </div>
      </div>
      <div ref="barEcharts" class='barEcharts' id="barEcharts"></div>
    </BaseBorderStyle>
  </div>
</template>

<script>
  import BaseBorderStyle from "../BaseBorderStyle";
  let echarts = require("echarts");
  export default {
    name: "BaseCaseStatus",
    components: {
      BaseBorderStyle
    },
    props: {
      publishArray: {
        type: Array, default: () => []
      }
    },
    data() {
      return {
        myChart: null,
        statusTitle: ['全部', '已发布', '未发版'],
        nowIndex: 0,
        titleName: "案例主体资源分布"


      }
    },
    mounted() {
      // this.drawEcharts();

    },
    destroyed() {
      if (this.myChart) {
        this.myChart.dispose();
      }
    },
    methods: {
      drawEcharts() {
        // const myChart = this.$echarts.init(this.$refs.barEcharts);
        let myChart = echarts.init(document.getElementById("barEcharts"));
        this.myChart = myChart;
        window.onresize = myChart.resize();
        let xAxisArray = [];
        let barArray_o = [];
        let barArray_t = [];
        this.publishArray.forEach((item, index) => {
          xAxisArray.push(item.EXPT_NAME);
          barArray_o.push(item.total_main_ele_count)
          barArray_t.push(item.total_resource_ele_count)
        })
        const option = {
          grid: {
            left: '1%',
            right: '3%',
            bottom: '14%',
            top: '4%',
            containLabel: true
          },
          legend: {
            itemHeight: 10,
            itemWidth: 20,
            data: ['主体', '资源'],
            position: 'bottom',
            bottom: "-1%",
            textStyle: {
              color: "#fff"
            },
          },
          xAxis: {
            type: 'category',
            data: xAxisArray,
            // data: ['调峰', '调频', '调峰（现货）', '需求响应'],
            axisLine: {
              lineStyle: {
                color: "rgba(77, 128, 254, 0.2)",
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontFamily: 'Microsoft YaHei'
              }
            },
          },

          yAxis: [
            {
              type: "value",
              gridIndex: 0,
              min: 0,
              max: 100,
              interval: 25,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(77, 128, 254, 0.2)",
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(77, 128, 254, 0.2)"
                }
              },
              axisLabel: {
                show: true,
                margin: 14,
                fontSize: 12,
                textStyle: {
                  color: "#65D5FF"
                }
              }
            },
            {
              type: "value",
              gridIndex: 0,
              min: 0,
              max: 100,
              interval: 25,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(77, 128, 254, 0.2)",
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(77, 128, 254, 0.2)"
                }
              },
              axisLabel: {
                show: false,
                margin: 14,
                fontSize: 12,
                textStyle: {
                  color: "#65D5FF"
                }
              }
            }
          ],

          series: [{
            name: '主体',
            type: 'bar',
            color: "rgba(94, 69, 254, 1)",
            barWidth: 15,
            data: barArray_o,

          },
          {
            name: '资源',
            type: 'bar',
            color: "rgba(3, 205, 255, 1)",
            barWidth: 15,
            data: barArray_t,
          }]
        };
        myChart.setOption(option);
      },
      getTitle(item, index) {
        this.nowIndex = index;
        this.$emit('getTitle', index)
      }
    },
    watch: {
      publishArray: {
        handler(newVal) {
          this.publishArray = newVal;
          this.drawEcharts()
          console.log("publishArray====", this.publishArray)
        },
        deep: true
      }

    },
  };
</script>

<style lang='scss' scoped>
  .case_Top {
    width: 100%;


    .title_box {
      width: 180px;
      display: flex;
      align-items: center;
      background-color: rgba(18, 15, 55, 0.8);
      border-radius: 15px;
      margin: 0 auto;
      margin-bottom: 10px;

      .tit_bg {
        flex: 1;
        text-align: center;
        height: 30px;
        line-height: 26px;
        cursor: pointer;

        .item {
          font-size: 12px;
          text-align: center;
          font-family: "PingFangSC-Regular";
          color: #fff;
        }
      }

      .active {
        background: #fff;
        border-radius: 15px;
      }

      .actives {
        color: #21A3A1 !important;
        font-family: "PingFangSC-Semibold" !important;

      }
    }

    .status_box {
      width: 100%;

      .barEcharts {
        width: 100%;
        height: 250px;
      }


    }

  }
</style>