<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-20 19:32:32
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 14:39:13
-->

<template>
  <div class="case_Top">
    <BaseBorderStyle class="status_box" :titleName="titleName">
      <div ref="pieEcharts" class='pieEcharts' id="pieEcharts"></div>
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
      homeInfoData: {
        type: Object, default: () => { }
      }

    },
    data() {
      return {
        myChart: null,
        titleName: "案例状态分析"


      }
    },
    mounted() {


    },
    destroyed() {
      if (this.myChart) {
        this.myChart.dispose();
      }
    },
    methods: {
      drawEcharts() {
        let total = Number(this.homeInfoData.published) + Number(this.homeInfoData.unpublished);
        let published = this.homeInfoData.published / total * 100;
        let unpublished = this.homeInfoData.unpublished / total * 100;
        console.log("total", total)
        console.log("published", published)
        console.log("unpublished", unpublished)
        // const myChart = this.$echarts.init(this.$refs.pieEcharts);
        let myChart = echarts.init(document.getElementById("pieEcharts"));
        this.myChart = myChart;
        window.onresize = myChart.resize();
        const option = {
          legend: {
            show: false,
          },
          tooltip: {
            show: false,
          },
          // echarts 设置饼图中间添加图片
          graphic: {
            type: 'image',
            id: 'logo',
            left: 'center', // 图片居中
            top: 'center', // 图片居中
            style: {
              Image: "~@/assets/home_images/work_bg.png",
              // image:'https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280',
              // image: "/src/assets/home_images/pie_img.png", // 图片的链接
              width: 50,
              height: 50
            }
          },
          series: [
            {
              type: 'pie',
              zlevel: 3,
              silent: true,
              radius: ['73%', '74%'],
              label: {
                normal: {
                  show: false
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this._pie3()
            },
            {
              name: '半径模式',
              hoverAnimation: false,
              avoidLabelOverlap: false,
              color: ['rgba(0,255,204,0.7)', 'rgba(20,100,244,0.72)'],
              type: 'pie',
              radius: ['30%', '60%'],
              roseType: 'radius',
              //折现图样式
              label: {
                position: "outside", // 设置位置在饼状图的外面 inside为内部
                show: true,// 设置为false不显示数据
                formatter: function (params) {
                  // params 是一个包含数据信息的对象
                  return params.name + '\n' + params.value + "%";
                },
                color: "#fffdef",
                minMargin: 8,
                edgeDistance: 10,
                lineHeight: 20,
                rich: {
                  fontSize: 10,
                  color: '#999'
                }
              },
              labelLine: {
                normal: {
                  length: 20, //第一条线
                  length2: 30, //第二条线
                  lineStyle: {
                    width: 2, // 线条的宽度
                  }
                }
              },
              data: [{ value: published, name: '已发布' }, { value: unpublished, name: '未发布' }]
            },
            { //最内层
              type: 'pie',
              radius: ['0%', '25%'],
              center: ["50%", "50%"],
              hoverAnimation: false,
              clockWise: false,
              itemStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.493,
                    r: 0.5,
                    colorStops: [{
                      offset: 0,
                      color: 'transparent' // 0% 处的颜色

                    },
                    {
                      offset: .9,
                      color: 'transparent' // 90% 处的颜色

                    },
                    {
                      offset: .95,
                      color: '#137EA9' // 95% 处的颜色
                    }, {
                      offset: 1,
                      color: '#137EA9' // 100% 外侧的颜色

                    }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowBlur: 10,
                  shadowColor: 'transparent',
                },

              },
              label: {
                show: false
              },
              data: [100]
            },
          ]
        }
        myChart.setOption(option);
      },
      _pie3() {
        let dataArr = [];
        for (var i = 0; i < 100; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 25,
              itemStyle: {
                normal: {
                  color: "rgb(126,190,255)",
                  borderWidth: 0,
                  borderColor: "rgba(0,0,0,0)"
                }
              }
            })
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0,
                  borderColor: "rgba(0,0,0,0)"
                }
              }
            })
          }

        }
        return dataArr

      }


    },
    watch: {
      homeInfoData: {
        handler(newVal) {
          this.homeInfoData = newVal;
          this.drawEcharts();
        },
        deep: true

      },

    },
  };
</script>

<style lang='scss' scoped>
  .case_Top {
    width: 100%;

    .status_box {
      width: 100%;
      padding: 30px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .pieEcharts {
        width: 100%;
        height: 260px;
      }


    }

  }
</style>