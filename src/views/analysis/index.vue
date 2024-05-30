<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-28 15:03:10
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 15:14:30
--><!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-28 15:03:10
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 11:55:53
-->
<template>
  <div class="box">
    <div class="top">
      <TipName :tip-name="'分析条件'" />
      <el-form>
        <table>
          <tr>
            <td><span>案例：</span></td>
            <td></td>
          </tr>
          <tr>
            <td><span>分析类型：</span></td>
            <td></td>
          </tr>
          <tr>
            <td><span>分析方法：</span></td>
            <td></td>
          </tr>
        </table>
      </el-form>

    </div>
    <div class="bottom">
      <TipName :tip-name="'分析结果'" />
      <div class="one">
        <div class="tit_box">
          <p>电量分析</p>
        </div>
        <div class="echarts_box">
          <div ref="barEcharts" class='barEcharts' id="barEcharts"></div>
        </div>

      </div>
      <div class="two">
        <div class="tit_box">
          <p>合同分析</p>
        </div>
        <div class="echarts_box">
          <div ref="whiskerEcharts" class='whiskerEcharts' id="whiskerEcharts"></div>
        </div>
      </div>
      <div class="three">


      </div>

    </div>


  </div>
</template>
<script>
  let echarts = require("echarts");
  import TipName from "@/components/TipName"
  export default {
    name: "Analysis",
    components: {
      TipName,
    },
    data() {
      return {
        barChart: null,
        whiskerChart: null,
        


      }
    },
    destroyed() {
      if (this.barChart) {
        this.barChart.dispose();
      }
      if (this.whiskerChart) {
        this.whiskerChart.dispose();
      }
    },
    mounted() {
      this.barEcharts();
      this.whiskerEcharts()

    },
    methods: {
      barEcharts() {
        let barChart = echarts.init(document.getElementById("barEcharts"));
        console.log(barChart)
        this.barChart = barChart;
        window.onresize = barChart.resize();
        let option = {
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#7B7DDC'
              }
            }
          },
          grid: {
            top: '15%',
            right: '3%',
            left: '5%',
            bottom: '12%'
          },
          xAxis: [{
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
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
                fontFamily: 'Microsoft YaHei',
                color: '#ffffff'
              }
            },
          }],
          yAxis: [
            {
              type: "value",
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
                show: false,
                lineStyle: {
                  color: "rgba(77, 128, 254, 0.2)"
                }
              },
              axisLabel: {
                show: true,
                margin: 14,
                fontSize: 12,
                textStyle: {
                  color: "#ffffff"
                  // color: "#65D5FF"
                }
              }
            }
          ],
          series: [
            {
              name: '电量',
              type: 'bar',
              barWidth: 25,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,255,204,0.7)'
                  }, {
                    offset: 1,
                    color: 'rgba(20,100,224,0.72)'
                  }]),
                  barBorderRadius: 4,
                }
              },
              data: [2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654, 2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654, 2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654, 3000, 4000],
            }]
        }
        barChart.setOption(option);
      },
      whiskerEcharts() {
        let whiskerChart = echarts.init(document.getElementById("whiskerEcharts"));
        this.whiskerChart = whiskerChart;
        window.onresize = whiskerChart.resize();
        const option = {
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '15%',
            right: '10%',
          },
          xAxis: {
            type: 'category',
            data: ['电价'],
            nameTextStyle: {
              color: '#ffffff',
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff',
              }
            },
            splitLine: {
              show: false
            }
          },

          yAxis: {
            type: 'value',
            nameTextStyle: {
              color: '#3259B8',
              fontSize: 14,
            },
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false,
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              data: [
                [1000, 2000, 3000, 4000, 6000, 4900]
              ],
              boxWidth: [7, 300],
              itemStyle: {
                normal: {
                  borderColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 10,
                    colorStops: [{
                      offset: 0,
                      color: '#25D2C9' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#25D2C9' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  borderWidth: 1,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(42, 24, 255, 0.3)'  // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(42, 24, 255, 0.3)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                }
              },
              tooltip: {
                formatter: function (param) {
                  return [

                    'Upper: ' + param.data[5],
                    'Q3: ' + param.data[4],
                    'Median: ' + param.data[3],
                    'Q1: ' + param.data[2],
                    'Lower: ' + param.data[1]
                  ].join('<br/>')
                }
              }
            },

          ]
        };
        whiskerChart.setOption(option);

      },
      

    }
  }
</script>
<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    padding: 20px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.7);

    .top {
      width: 100%;
      height: 312px;
      background: rgba(0, 0, 0, 0.1862745098);
      border-radius: 6px;
      padding: 10px;

      /* 样式调整 */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      tr {
        &>:nth-child(1) {
          width: 10%;
          border-right: 1px solid rgba(0, 0, 0, 0.1862745098);

          >span {
            font-size: 13px;
            font-family: "PingFang SC";
            color: #fff;
            font-weight: 500;
          }
        }

        &>:nth-child(2) {
          width: 90%;
        }
      }

      td {
        height: 60px;
        border: 1px solid rgba(0, 0, 0, 0.1862745098);
        text-align: center;
        vertical-align: middle;
        /* padding: 10px; */
        border-left: 0;
        border-right: 0;

      }

    }

    .bottom {
      width: 100%;
      height: auto;
      background: rgba(0, 0, 0, 0.1862745098);
      border-radius: 6px;
      padding: 10px;
      margin-top: 20px;

      .tit_box {
        width: 162px;
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

      .echarts_box {
        width: 100%;
        height: auto;

        .barEcharts {
          width: 100%;
          height: 500px;
        }

        .whiskerEcharts {
          width: 100%;
          height: 500px;
        }
      }
    }

  }
</style>