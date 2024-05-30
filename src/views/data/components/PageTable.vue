<!--
  *@Author: 刘凯丽
  *@Descripttion：页面数据显示，操作功能，table，table分页
 -->
<template>
  <div class="page-table">
    <el-table :data="tableData" v-loading="loading" ref="multipleTable" element-loading-background="rgba(0, 0, 0, 0.5)" @selection-change="handleSelectionChange">
      <template v-if="tableColumnList && tableColumnList.length > 0">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" align="center" label="序号">
          <template slot-scope="scope">{{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}</template>
        </el-table-column>
      </template>

      <el-table-column align="center" v-for="column in tableColumnList" :prop="column.name" :label="column.name" :key="column.name"> </el-table-column>
      <el-table-column align="center" label="操作" width="100" v-if="tableColumnList && tableColumnList.length > 0">
        <template slot-scope="scope" v-if="tableData && tableData.length > 0">
          <el-button type="primary" icon="el-icon-edit" class="tableEditBtn" @click="handleUpateRow(scope.row)"> </el-button>
          <el-button type="danger" icon="el-icon-delete" class="tableEditBtn" @click="handleDelRow(scope.row)"> </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- footer-分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pagination.total"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pageTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumnList: {
      type: Array,
      default: () => []
    },
    // multipleSelection: {
    //   type: Array,
    //   default: () => []
    // },
    pagination: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(data) {
      this.multipleSelection = data
    },
    handleUpateRow(row) {
      this.$emit('upateTableRow', row)
    },
    handleDelRow(row) {
      this.$emit('delTableRow', [row])
    },

    handleSizeChange() {},
    handleCurrentChange(page) {
      console.log('-------page', page)
      this.$emit('getTableDataList', page)
    }
  },
  computed: {
    // PRIKEY() {
    //   // 获取表的主键
    //   return this.tableColumnList.filter((item) => {
    //     return item.is_primary_key === 'PRI' && item.name
    //   })[0]?.name
    // }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/mixin.scss';
.page-conent {
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.168627450980392);
  padding: 20px 10px;

  /* 表格背景 */
  .page-table {
    margin-top: 20px;
    text-align: center;
    @include scrollBar();
    // 操作按钮
    .tableEditBtn {
      width: 32px;
      height: 25px;
      border-radius: 5px;
      padding: 0;
      background: transparent;
      background: transparent;
      font-size: 12px;
    }
    // 复选框的样式
    ::v-deep .el-checkbox__inner {
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.729411764705882);
    }

    // table样式
    ::v-deep .el-table {
      background-color: rgba(10, 29, 94, 0.191764705882353) !important;
      border-top: 1px solid rgb(20, 100, 244) !important;
      border: 1px solid transparent;
    }
    ::v-deep .el-table__body-wrapper {
      @include scrollBar();
    }

    ::v-deep .el-table th {
      background-color: rgba(20, 100, 244, 0.191764705882353) !important;
      border-bottom: 2px solid transparent;
      text-align: center;
      color: rgba(255, 255, 255, 0.729411764705882);
    }

    ::v-deep .el-table tr {
      border: 1px solid red;
      background-color: transparent;
    }

    /* 鼠标划过整行的变色的hover */
    ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(255, 255, 255, 0.129411764705882) !important;
      cursor: pointer;
    }

    ::v-deep .el-table td {
      padding: 10px 0;
      color: rgba(255, 255, 255, 0.729411764705882);
      text-align: center;
    }

    ::v-deep .el-table td,
    .el-table th.is-leaf {
      border-bottom: transparent;
    }

    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: transparent;
    }

    ::v-deep .el-table__empty-block {
      width: 100%;
      min-height: 350px !important;
      border: transparent !important;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: rgba(255, 255, 255, 0.729411764705882);
        font-size: 28px;
      }
    }

    // 分页

  }
}
</style>
