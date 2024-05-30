<template>
  <!--
  *@Author: 刘凯丽
  *@Descripttion：仿真运行
 -->
  <div class="app-container simulation-container">
    <div class="wrap">
      <div class="content">
        <div class="item-list" v-for="item in simulationList" :key="item.id">
          <BaseSimHead :item="item" />
          <div class="item-content">
            <BaseSimContent :name="'智能主体'" :value="item.Num_AgentTotl" />
            <BaseSimContent :name="'资源'" :value="item.Num_RsrcTotl" />
            <BaseSimContent :name="'创建时间'" :value="item.CREATE_DATE" />
            <BaseSimContent :name="'运行开始时间'" :value="item.start_date" />
          </div>
          <BaseSimFooter :item="item" @operation="handleBtnOperation" @detail="goDetailPage" />
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      class="pagination"
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import BaseSimHead from './components/BaseSimHead'
import BaseSimContent from './components/BaseSimContent'
import BaseSimFooter from './components/BaseSimFooter'
import { request } from '@/utils/request/Request'
export default {
  name: 'SimulationRun',
  components: { BaseSimHead, BaseSimContent, BaseSimFooter },
  data() {
    return {
      pageInfo: {
        page: 1,
        page_size: 10,
        total: 0
      },
      simulationList: []
    }
  },
  methods: {
    // 请求仿真列表数据
    getSimulationList() {
      let _param = {
        page: this.pageInfo.page,
        page_size: this.pageInfo.page_size
      }
      if (_param.page === 1) this.simulationList = []
      request
        .$api('running')
        .requestSimulationList(_param)
        .then((res) => {
          // this.loading = false
          if (res && res?.code === 200 && res?.data.length > 0) {
            this.pageInfo.total = res.total
            this.simulationList = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 仿真操作--start , pause, stop
    handleBtnOperation(_action, ExptID) {
      // _action = start , pause, stop
      const actionApi = _action
      request
        .$api('running')
        .requestSimulationOpertion(actionApi, ExptID)
        .then((res) => {
          if (res && res?.code === 200) {
            this.$message.success(res.msg)
            this.getSimulationList()
          }
        })
        .catch((error) => {
          this.$message.error(error)
          console.log(error)
        })
    },
    // 仿真查看详情/查看结果
    goDetailPage(ExptID) {
      this.$router.push({
        path: '/simulation/detail',
        query: { ExptID }
      })
    },
    handleCurrentChange(page) {
      this.pageInfo.page = page
      this.getSimulationList()
    }
  },

  mounted() {},
  created() {
    this.getSimulationList()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// @import '@/styles/mixin.scss';
.simulation-container {
  padding: 30px;
  .wrap {
    min-height: 700px;
    .content {
      display: flex;
      flex-wrap: wrap;
      // flex-direction: row;
      // flex
      .item-list {
        width: 367px;
        height: 260px;
        margin: 0 30px 30px 7px;
        color: #f2f2f2;
        background-color: rgba(10, 29, 94, 0.1917647059) !important;

        .item-content {
          margin: 0 20px;
          padding: 17px 0;
          font-size: 13px;
          border-bottom: 1px solid #112364;
        }
      }
    }
  }

  .el-pagination {
    width: 42%;
    text-align: center;
    margin-top: 50px;
    margin-left: 403px;

    ::v-deep .btn-prev,
    ::v-deep .btn-next {
      background-color: transparent;
      margin-right: 15px;
      border: 1px solid rgb(20, 100, 244, 0.4);
    }

    ::v-deep .el-icon-arrow-left:before,
    ::v-deep .el-icon-arrow-right:before {
      color: #fff;
      font-size: 12px;
    }
  }

  ::v-deep .el-pagination.is-background .el-pager li {
    border: 1px solid rgb(20, 100, 244, 0.4);
    background-color: transparent;
    color: #fff;
    line-height: 26px;
    font-size: 12px;
    margin-right: 15px;
  }

  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(20, 100, 244);
    color: #fff;
  }
}
</style>
