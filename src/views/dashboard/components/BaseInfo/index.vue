<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-21 17:15:15
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 21:54:53
-->
<template>
  <div class="case_Top">
    <div class="info_tit">
      <div v-for="(item,index) in infoTitle" :key="index" class="tit_bg">
        <span>{{item.name}}</span>
        <span v-for="(number,ind) in splitNumber(item.value)" :key="ind" class="green" >{{number}}</span>
      </div>
    </div>
    <div>
      <div class="tables">
        <div class="select_box" v-for="(item,index) in tabList" :key='index' @click="selectTab(item,index)">
          <div :class="index == nowIndex ?'blue':'' ">
            <p>{{item}}</p>
          </div>
        </div>
      </div>
      <div v-show="nowIndex ==0">
        <BaseInfoLine :caseData="caseData" />
      </div>
      <div v-show="nowIndex ==1">
        <BaseTable :pagination="pageInfo" :dataList="tableColumns" :tableData="tableData"
          @update:pagination="updatePagination">
          <template slot="index" slot-scope="prop">
            {{ (pageInfo.page - 1) * pageInfo.page_size + prop.$index + 1 }}
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseInfoLine from "../BaseInfoLine"
  import BaseTable from '@/components/BaseTable/index.vue'
  export default {
    name: "BaseInfo",
    components: {
      BaseInfoLine,
      BaseTable
    },
    props: {
      caseData: {
        type: Object, default: () => { }
      }
    },
    data() {
      return {
        infoTitle: [
          {
            name: "循环次数：",
            value: ''
          },
          {

            name: "实时步长：",
            value: ''
          }
        ],
        nowIndex: 0,
        tabList: ['趋势图', '表格'],
        tableData: [],
        tableColumns: [
          { label: '序号', prop: 'index', slot: true },
          { label: '实验编号', prop: 'ExptID' },
          { label: '循环次数', prop: 'Cycle' },
          { label: '步长', prop: 'Step' },
          { label: '月', prop: 'Month' },
          { label: '天', prop: 'Day' },
          { label: '小时', prop: 'Hour' },
          { label: '实时', prop: 'CQuaActSQunty' }, // x-时点实际执行供应电量
          { label: '合同编号', prop: 'CID' },
          { label: '合同时间', prop: 'CTimeID' },
          { label: '合同类型', prop: 'CType' },
          { label: '合同状态', prop: 'CStatus' },
          { label: '批发/零售', prop: 'CTrMode' },
          { label: '合同供给方', prop: 'CAgtOtID' }, // 卖方
          { label: '合同需求方', prop: 'CAgtInID' }, // 买方
          { label: '电量', prop: 'CQunty' }, // 合同电量
          { label: '电价', prop: 'CPrice' }
        ],
        pageInfo: {
          page: 1,
          page_size: 10,
          total: 0
        },

      }
    },
    mounted() {
      
      
    },
    methods: {
      selectTab(itme, index) {
        this.nowIndex = index;
        if (index == 1) {
          this.getAnalysisTableData()
        }
      },
      // 获取表格数据
      getAnalysisTableData() {
        const params = {
          expt_id: '4'
        }
        params.page = this.pageInfo.page;
        params.page_size = this.pageInfo.page_size;
        this.$api('running').requestSimulationAnalysisTable(params).then(res => {
          if (res && res.code === 200 && res.data) {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
          }
        }).catch(error => {
        });
      },
      // 拿到分页的页数进行更新
      updatePagination(pageInfo) {
        this.pageInfo.page = pageInfo.currentPage
        this.getAnalysisTableData()
      },
      //截取
      splitNumber(number) {
        return number.toString().split('');
      }
    },
    watch: {
      caseData: {
        handler(newVal) {
          this.caseData = newVal;
          this.infoTitle[0].value = this.caseData["max_cycle_value"];
          this.infoTitle[1].value = this.caseData["max_step_value"];
        },
        deep: true

      },

    },
  };
</script>

<style lang='scss' scoped>
  .case_Top {
    width: 100%;
    margin-top: 15px;

    .info_tit {
      width: 100%;
      display: flex;
      /* justify-content: center; */
      align-items: center;

      .tit_bg {
        /* width: 140px; */
        height: 60px;
        background: rgba(18, 15, 55, 0.8);
        margin-right: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 20px;
        background-image: url("~@/assets/home_images/work_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border: 1px solid rgba(18, 15, 55, 0.8);

        &>:nth-child(1) {
          font-size: 18px;
          font-family: '微软雅黑';
          color: #ffff;
          font-weight: 500;
        }

        .green {
          width: 28px;
          height: 40px;
          line-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-family: '微软雅黑';
          color: #0DDDB6;
          font-weight: 500;
          background-image: url("~@/assets/home_images/num_bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 8px;
          text-align: center;

        }
      }
    }

    .tables {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .select_box {
        width: 60px;
        height: 40px;
        line-height: 40px;

        >div {
          width: 100%;
          flex: 1;
          text-align: center;
          cursor: pointer;
          background-image: url("~@/assets/home_images/tab_bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;

          >p {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            color: #81D3F8;
            letter-spacing: 0;
            text-align: center;
            font-weight: 400;
          }
        }
      }

      .blue {
        /* background: #FFFFFF; */
        background-image: url("~@/assets/home_images/tab_active.png") !important;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        >p {
          font-family: PingFangSC-Semibold !important;
          color: #ffffff !important;
          font-weight: 600 !important;
        }
      }
    }

  }
</style>