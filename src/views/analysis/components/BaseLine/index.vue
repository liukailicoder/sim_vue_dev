<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-29 22:26:58
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 23:02:57
-->
<template>
  <div class="box">
    <div class="tit_box">
      <p>案例1-综合价值评估</p>
    </div>
    <div ref="lineEcharts" class="lineEcharts" id="lineEcharts"></div>
  </div>
</template>

<script>
  let echarts = require('echarts')
  export default {
    name: 'BaseLine',
    props: {

      Trend_Chart: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        myChart: null
      }
    },
    mounted() {
      this.drawEcharts()
    },
    destroyed() {
      if (this.myChart) {
        this.myChart.dispose()
      }
    },
    methods: {
      drawEcharts() {
        let myChart = echarts.init(document.getElementById('lineEcharts'))
        this.myChart = myChart
        window.onresize = myChart.resize();
        let color = [
          "#0090FF",
          "#36CE9E"
        ];
        const option = {
          color: color,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: 'line',
            // textStyle: {                            //图例文字的样式
            //   color: '#a1a1a1',               //图例文字颜色
            //   fontSize: 12                      //图例文字大小
            // },
            top: '4%',
            left: '5%',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisTick: {
              show: false,
            },
          },
          yAxis:
          {
            splitLine: {
              show: true,
              lineStyle: {
                color: "#002636",
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#B4B4B4',
              }
            },
            axisLabel: {
              formatter: '{value} ',
            }
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: 'Union Ads',
              type: 'line',
              data: [220, 182, 191, 234, 290, 330, 310],
            }
          ]
        };
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      }
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
  .box {
    .lineEcharts {
      width: 100%;
      height: 520px;
    }

    .tit_box {
      width: 300px;
      height: 50px;
      line-height: 50px;
      background: rgba(0, 0, 0, 0.1862745098);
      border-left: 2px solid #25D2C9;
      border-right: 2px solid #25D2C9;
      margin: 0 auto;

      >p {
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-family: "微软雅黑";
        font-weight: 600;
      }
    }
  }
</style>