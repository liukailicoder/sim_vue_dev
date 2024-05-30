<template>
  <!--
  *@Author: 刘凯丽
  *@Descripttion：数据管理--数据表管理
 -->
  <div class="app-container datamanger-container">
    <!-- 搜索区域 -->
    <PageSearch :searchFormData="searchFormData" @getTableDataList="getTableDataList" @handleResetClick="resetSearchForm" />

    <!-- 展示区域 -->
    <section class="page-conent">
      <!-- 区域名称 -->
      <TipName :tip-name="'查询结果'" />

      <!-- 下方内容区域 -->
      <div class="content">
        <!-- 操作按钮：新增&批量删除 -->
        <div class="header">
          <el-button type="primary" icon="el-icon-plus" circle @click="addTableRow()"></el-button>
          <el-button type="success" icon="el-icon-delete" circle @click="delTableMultipleRows()"></el-button>
        </div>
        <!-- table区域 -->
        <PageTable
          ref="tableRef"
          :loading="loading"
          :tableData="tableData"
          :tableColumnList="tableColumnList"
          :pagination="pagination"
          @upateTableRow="upateTableRow"
          @delTableRow="delTableRow"
          @getTableDataList="getTableDataList"
        />
      </div>
    </section>

    <!-- 新增&编辑弹框 -->
    <PageModal :Msg="Msg" :modelData="tableColumnList" @update="tableUpdateApi" />
    <!-- 删除角色弹窗 -->
    <BaseDialog :visible.sync="dialogDelete" :showClose="false" @confirm="handleDeleteConfirm()" header-visible="false">
      <div>
        <p style="text-align: center; color: #fff">{{ delTip }}</p>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import { request } from '@/utils/request/Request'
import BaseDialog from '@/components/BaseDialog'
import PageSearch from './components/PageSearch.vue'
import PageTable from './components/PageTable.vue'
import PageModal from './components/PageModal.vue'
import { filterObj } from '@/utils/index'
export default {
  name: 'datamanage',
  components: { PageSearch, PageTable, PageModal, BaseDialog },
  data() {
    return {
      table_name: '',
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      searchFormData: {}, // 搜索数据
      tableColumnList: [], //table栏
      tableData: [], //table数据
      modelData: {}, // 弹框数据
      Msg: {
        isShow: false,
        title: ''
      },
      multipleSelection: [],
      dialogDelete: false, // 删除弹框提示
      delIds: [], // 需要删除的ids
      delTip: '' // 删除提示
    }
  },
  methods: {
    // 获取表结构
    getColumnsData() {
      return new Promise((resolve) => {
        request
          .$api('DataManage')
          .getTableStructure(this.table_name)
          .then((res) => {
            if (res && res.code === 200 && res.data) {
              const _data = res.data
              // 成功之后，resolve进行table数据的查询
              resolve(res.code)
              // 取数据表前3个作为搜索条件
              if (_data.columns && _data.columns.length > 0) {
                const filterData = _data?.columns?.length > 3 ? _data.columns.slice(0, 3) : _data.columns
                // 处理数据{}
                this.searchFormData = this.handleFormData(filterData)
                // table的栏目 && 新增数据操作
                this.tableColumnList = _data.columns
                // 设置默认搜索条件，重置的时候需要
                this.searchFormDataDefault = Object.assign({}, this.searchFormData)

                // 获取主键id
                this.PRIKEY = this.getTablePriKey(this.tableColumnList)
              }
            }
          })
      })
    },

    // 获取表数据
    getTableDataList(page) {
      const _self = this
      if (page) {
        _self.pagination.page = page
      }
      console.log(_self.pagination.page)
      let param = {
        table_name: _self.table_name,
        page: _self.pagination.page,
        pageSize: _self.pagination.pageSize,
        top_filter: filterObj(_self.searchFormData)
      }
      this.loading = true
      // 请求时把tableData清空，防止接口报错，页面还有旧数据
      this.tableData = []
      request
        .$api('DataManage')
        .requestTableDataList(param)
        .then((res) => {
          this.loading = false
          if (res && res.code === 200) {
            _self.tableData = res.data.list
            _self.pagination.total = res.data.total
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },
    // 新增弹框
    addTableRow() {
      // 新增数据
      this.Msg.isShow = true
      this.Msg.title = '新增'
      this.Msg.data = ''
    },
    //编辑弹框
    upateTableRow(row) {
      this.Msg.data = row
      this.Msg.isShow = true
      this.Msg.title = '编辑'
    },
    // 新增或者编辑数据接口
    tableUpdateApi(type, _data) {
      let param = {
        table_name: this.table_name,
        data: _data
      }
      if (type === 'add') {
        param.data = filterObj(_data)
        request
          .$api('DataManage')
          .getAddTableData(param)
          .then((res) => {
            if (res?.code === 200) {
              this.$message.success(res.msg)
              this.getTableDataList() // 操作成功更新接口
            }else{
              this.$message.error(res.msg)
            }
          })
          .catch((error) => {
            this.$message.error(error.msg)
            console.log(error)
          })
      } else if (type === 'update') {
        request
          .$api('DataManage')
          .getUpdateTableData(param)
          .then((res) => {
            if (res?.code === 200) {
              this.$message.success(res.msg)
              this.getTableDataList() // 操作成功更新接口
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch((error) => {
            this.$message.error(error.msg)
            console.log(error)
          })
      }
    },
    handleDeleteConfirm() {
      if (this.delIds.length === 0) return
      // 处理需要的data格式
      let ids = {
        [this.PRIKEY]: []
      }
      this.delIds.forEach((element) => {
        ids[this.PRIKEY].push(element[this.PRIKEY])
      })
      let params = {
        table_name: this.table_name,
        data: ids
      }
      request
        .$api('DataManage')
        .delTableData(params)
        .then((res) => {
          if (res && res?.code === 200) {
            this.delIds = []
            this.getTableDataList()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 处理多选
    delTableMultipleRows() {
      // 先看一下有没有数据
      const _rows = this.$refs.tableRef.multipleSelection
      if (_rows.length === 0) {
        this.dialogDelete = true
        this.delTip = '请先选择需要删除的数据'
      } else {
        // 进行数据处理
        this.delTableRow(_rows)
      }
    },
    // 单选删除
    delTableRow(_data) {
      this.delIds = _data // 需要删除的数据
      this.dialogDelete = true
      this.delTip = '确定删除当前数据吗？'
    },
    resetSearchForm() {
      this.searchFormData = Object.assign({}, this.searchFormDataDefault)
      this.getTableDataList(1)
      // this.$refs[Name].resetFields()
    },
    // -----数据处理方法
    handleFormData(data) {
      // 使用Object.fromEntries将name和value转换为对象的键和值
      return Object.fromEntries(data.map((n) => [n.name, n.default_value]))
    },
    // 根据数据结构获取数据的主键id
    getTablePriKey(tableColumn) {
      return tableColumn.filter((item) => {
        return item.is_primary_key === 'PRI' && item.name
      })[0]?.name
    }
  },
  watch: {
    '$route.query'(query) {
      this.table_name = query.table_name
      this.getColumnsData().then((code) => {
        if (code === 200) {
          this.getTableDataList(1)
        }
      })
    }
  },
  mounted() {},
  created() {
    this.table_name = this.$route.query.table_name
    // 栏目请求成功，再去请求数据
    // this.getColumnsData()
    this.getColumnsData().then((code) => {
      if (code === 200) {
        this.getTableDataList()
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.datamanger-container {
  color: #f2f2f2;
  font-size: 14px;
  padding: 20px;
  .page-conent {
    margin-top: 20px;
    background-color: rgba(0, 0, 0, 0.1862745098);
    padding: 20px 10px;

    .content {
      padding: 30px 30px;
      .header {
        ::v-deep .is-circle {
          height: 100%;
        }
      }
    }
  }
}
</style>
