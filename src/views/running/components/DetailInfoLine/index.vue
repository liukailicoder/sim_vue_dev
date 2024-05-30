<!--
 * @Descripttion:
 * @version:
 * @Author: lkl
-->

<template>
  <div class="box">
    <div ref="infoEcharts" class="infoEcharts" id="infoEcharts"></div>
  </div>
</template>

<script>
let echarts = require('echarts')
export default {
  name: 'BaseCaseStatus',
  props: {
    trendData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  mounted() {},
  destroyed() {
    if (this.myChart) {
      this.myChart.dispose()
    }
  },
  methods: {
    drawEcharts() {
      let myChart = echarts.init(document.getElementById('infoEcharts'))
      this.myChart = myChart
      //
      let xAxisArray = []
      let lineArray = []
      let barArray = []
      this.trendData.forEach((item, index) => {
        xAxisArray.push(item.Step_as_int)
        lineArray.push(item.avg_cprice)
        barArray.push(item.avg_cqunty)
      })
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(31, 31, 31, 0.95)',
          borderColor: 'transparent',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          data: [
            {
              name: '电量',
              icon: 'rect'
            },
            {
              name: '电价',
              icon: 'path://m0.010277,5.945418l24.979446,0l0,2.109164l-24.979446,0l0,-2.109164z'
            }
          ],
          textStyle: {
            //图例文字的样式
            color: '#a1a1a1', //图例文字颜色
            fontSize: 12 //图例文字大小
          },
          // data: ['电量', '电价'],
          top: '4%',
          right: '4%'
        },
        grid: {
          x: '7%',
          width: '87%',
          y: '12%'
        },
        xAxis: {
          data: xAxisArray,
          axisLine: {
            lineStyle: {
              color: '#B4B4B4'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(145, 140, 140, 1)',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 15,
            xAxisIndex: [0],
            bottom: 25,
            // start: 10,
            // end: 80,
            start: 0,
            end: 100,
            // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#90979c'
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],

        series: [
          {
            name: '电价',
            type: 'line',
            smooth: false,
            showAllSymbol: false,
            symbol: 'emptyCircle',
            symbolSize: 0,
            yAxisIndex: 1,
            lineStyle: {
              type: 'dashed' // 设置为虚线
            },
            itemStyle: {
              normal: {
                color: 'rgba(221, 141, 68, 1)'
              }
            },
            data: lineArray
          },
          {
            name: '电量',
            type: 'bar',
            barWidth: 25,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0,255,204,0.7)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(20,100,244,0.72)'
                  }
                ]),
                barBorderRadius: 6
              }
            },
            data: barArray
          }
        ]
      }
      myChart.setOption(option)
      window.onresize = function () {
        console.log('----resize')
        myChart.resize()
      }
    }
  },
  watch: {
    trendData: {
      handler(newVal) {
        // this.Trend_Chart = newVal
        this.drawEcharts()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  .infoEcharts {
    width: 100%;
    height: 480px;
  }
}
</style>
