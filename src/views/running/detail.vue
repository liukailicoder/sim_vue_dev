<template>
  <!--
  *@Author: 刘凯丽
  *@Descripttion：仿真运行-详情
 -->
  <div class="app-container detail-container">
    <!-- 案例基本信息 -->
    <DetailTitle :caseTitle="caseTitle" />
    <div class="detail-content">
      <!-- 搜索区 -->
      <div class="search-container">
        <TipName :tip-name="'查询条件'" />
        <BaseTableHead
          :formData="formFieldsData"
          :fields="formFields"
          @input-change="onInputChange"
        >
          <el-form-item>
            <el-button @click="resetSearchForm()">重置</el-button>
            <el-button type="primary" @click="searchSubmit">搜索</el-button>
          </el-form-item>
        </BaseTableHead>
      </div>
      <!-- 图表/table展示区 -->
      <div class="case_Top_Data">
        <div class="header">
          <!-- 实时步长 & 总步长 -->
          <div class="info_tit">
            <div class="tit_bg">
              <span>{{ infoTitle.name }}</span>
              <span>{{ infoTitle.value }}</span>
            </div>
          </div>
          <div class="table">
            <div
              class="select_box"
              v-for="(item, index) in tabList"
              :key="index"
              @click="selectTab(item, index)"
            >
              <div :class="index == nowIndex ? 'blue' : ''">
                <p>{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 图表数据 -->
        <div class="chart" v-show="nowIndex == 0">
          <DetailInfoLine :trendData="Trend_Chart" />
        </div>
        <!-- 表格 -->
        <div v-show="nowIndex == 1">
          <BaseTable
            :pagination="pageInfo"
            :dataList="tableColumns"
            :tableData="tableData"
            @update:pagination="updatePagination"
          >
            <template slot="index" slot-scope="prop">
              {{ (pageInfo.page - 1) * pageInfo.page_size + prop.$index + 1 }}
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTableHead from '@/components/BaseTableHead'
import DetailTitle from './components/DetailTitle'
import DetailInfoLine from './components/DetailInfoLine'
import BaseTable from '@/components/BaseTable/index.vue'
import { request } from '@/utils/request/Request'
export default {
  name: 'Detail',
  components: { BaseTableHead, DetailTitle, DetailInfoLine, BaseTable },
  data() {
    return {
      expt_id: '',
      nowIndex: 0,
      formFields: [
        {
          prop: 'CType',
          type: 'select',
          label: '合同类型',
          options: []
        },
        {
          prop: 'CTrMode',
          type: 'select',
          label: '批发/零售类型',
          options: []
        }
      ],
      formFieldsData: {},
      caseTitle: {},
      infoTitle: {
        name: '实时步长：',
        value: '1567'
      },
      Trend_Chart: [],
      tableData: [],
      cTypeData: [], // 合同类型
      cTrModeData: [], // 批发零售类型
      pageInfo: {
        page: 1,
        page_size: 10,
        total: 0
      },
      tabList: ['趋势图', '表格'],
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
      ]
    }
  },
  methods: {
    // 获取案例基本信息
    getCaseBaseInfo() {
      request
        .$api('running')
        .requestSimulationDetail(this.expt_id)
        .then((res) => {
          if (res && res.code === 200 && res.data.Element_List) {
            this.caseTitle = res.data.Element_List
            console.log('请求----详情--', this.caseTitle)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取图表数据
    getAnalysisChartData() {
      const params = {
        expt_id: this.expt_id
      }
      if (this.formFieldsData.CType) params.CType = this.formFieldsData.CType
      if (this.formFieldsData.CTrMode) params.cTrModeData = this.formFieldsData.cTrModeData
      request
        .$api('running')
        .requestSimulationAnalysisChart(params)
        .then((res) => {
          if (res && res.code === 200 && res.data) {
            this.Trend_Chart = this.sortedItems(res.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取表格数据
    getAnalysisTableData() {
      const params = {
        expt_id: this.expt_id
      }
      if (this.formFieldsData.CType) params.CType = this.formFieldsData.CType
      if (this.formFieldsData.CTrMode) params.cTrModeData = this.formFieldsData.CTrMode
      params.page = this.pageInfo.page
      params.page_size = this.pageInfo.page_size
      request
        .$api('running')
        .requestSimulationAnalysisTable(params)
        .then((res) => {
          if (res && res.code === 200 && res.data) {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取实时步长/总步长
    getStep() {
      const params = {
        expt_id: this.expt_id
      }
      if (this.formFieldsData.CType) params.CType = this.formFieldsData.CType
      if (this.formFieldsData.CTrMode) params.cTrModeData = this.formFieldsData.CTrMode

      request
        .$api('running')
        .requestSimulationStep(params)
        .then((res) => {
          if (res && res.code === 200 && res.data) {
            this.infoTitle = {
              name: '总步长：',
              value: res.data
            }
            console.log('buchang-----')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取合同类型
    getSimulationCType() {
      request
        .$api('running')
        .requestSimulationCType()
        .then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.formFields[0]['options'] = res.data.map((item) => {
              return { name: item, value: item }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取零售类型
    getSimulationCTrMode() {
      request
        .$api('running')
        .requestSimulationCTrMode()
        .then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.formFields[1]['options'] = res.data.map((item) => {
              return { name: item, value: item }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 拿到分页的页数进行更新
    updatePagination(pageInfo) {
      this.pageInfo.page = pageInfo.currentPage
      this.getAnalysisTableData()
    },
    // 拿到输入框的值
    onInputChange({ prop, value }) {
      this.formFieldsData[prop] = value
      console.log('拿到输入框的值---', this.formFieldsData)
    },
    selectTab(itme, index) {
      this.nowIndex = index
    },
    // handleConfirm确定搜索
    searchSubmit() {
      this.getStep()
      this.getAnalysisChartData()
      this.getAnalysisTableData()
    },
    resetSearchForm() {
      this.searchFormData = Object.assign({}, this.searchFormDataDefault)
    },
    sortedItems(Items) {
      return [...Items].sort((a, b) => a.Step - b.Step)
    }
  },

  mounted() {},
  created() {
    this.expt_id = this.$route.query.id || '4'
    this.searchFormDataDefault = Object.assign({}, this.searchFormData)
    this.getCaseBaseInfo()
    this.getSimulationCType()
    this.getSimulationCTrMode()
    this.searchSubmit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-content {
  background-color: rgba(0, 0, 0, 0.1862745098);
  padding: 12px;
  margin-top: 25px;
  .search-container {
    // height: 85px;
    .froms_box {
      padding: 20px 29px;
      height: 67px;
    }
  }
  .case_Top_Data {
    width: 100%;
    padding: 0 30px;
    // margin-top: 15px;
    // background-color: rgba(0, 0, 0, 0.1862745098);
    .header {
      display: flex;
      align-items: center;
      align-items: baseline;
      justify-content: space-between;
      .info_tit {
        // display: flex;
        /* justify-content: center; */
        // align-items: center;

        .tit_bg {
          /* width: 140px; */
          height: 60px;
          background: rgba(18, 15, 55, 0.8);
          margin-right: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px;
          background-image: url('~@/assets/common_images/step.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid rgba(18, 15, 55, 0.8);
          -moz-box-shadow: 0px 0px 10px 0px
            rgba(20, 209, 196, 0.337254901960784) inset;
          -webkit-box-shadow: 0px 0px 10px 0px
            rgba(20, 209, 196, 0.337254901960784) inset;
          box-shadow: 0px 0px 10px 0px rgba(20, 209, 196, 0.337254901960784)
            inset;

          & > :nth-child(1) {
            font-size: 18px;
            font-family: '微软雅黑';
            color: #ffff;
            font-weight: 500;
          }

          & > :nth-child(2) {
            font-size: 32px;
            font-family: '微软雅黑';
            color: #0dddb6;
            font-weight: 500;
            padding-left: 8px;
          }
        }
      }

      .table {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .select_box {
          width: 60px;
          height: 40px;
          line-height: 40px;

          > div {
            width: 100%;
            flex: 1;
            text-align: center;
            cursor: pointer;
            background-image: url('~@/assets/common_images/tab_bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;

            > p {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              color: #81d3f8;
              letter-spacing: 0;
              text-align: center;
              font-weight: 400;
            }
          }
        }

        .blue {
          /* background: #FFFFFF; */
          background-image: url('~@/assets/common_images/tab_active.png') !important;
          background-size: 100% 100%;
          background-repeat: no-repeat;

          > p {
            font-family: PingFangSC-Semibold !important;
            color: #ffffff !important;
            font-weight: 600 !important;
          }
        }
      }
    }
    .chart {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1862745098);
    }
  }
}
</style>
