<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-22 23:41:44
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-24 12:05:08
-->
<template>
  <div class="table">
    <el-table :data="data" style="width: 100%" :tree-props="treeProps" :row-key="rowKey" default-expand-all>
      <template v-for="column in columns">
        <el-table-column
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width || 'auto'"
        >
          <template slot-scope="scope">
            <div v-if="column.slot">
              <slot
                :name="column.prop"
                :row="scope.row"
                :index="scope.$index"
                :$index="scope.$index"
              ></slot>
            </div>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作"  :width="handleWidth||'200px'" fixed="right">
        <template slot-scope="scope">
          <slot name="actions" :row="scope.row">
            <el-button
              v-for="action in scope.row.actions"
              :key="action.label"
              size="mini"
              :type="action.type || 'primary'"
              @click="action.handler(scope.row)"
            >
              {{ action.label }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      class="pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
    treeProps: {
      type: Object | undefined,
    },
    handleWidth: {
      type: String
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("update:pagination", { ...this.pagination, pageSize: val });
    },
    handleCurrentChange(val) {
      this.$emit("update:pagination", { ...this.pagination, currentPage: val });
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.el-pagination {
  width: 42%;
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

::v-deep .el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  border: 1px solid rgb(20, 100, 244, 0.4);
  background-color: transparent;
  color: #fff;
  line-height: 26px;
  font-size: 12px;
  margin-right: 15px;
}

::v-deep .el-pagination.is-background .btn-next,
.el-pagination.is-background .el-pager li {
  border: 1px solid rgb(20, 100, 244, 0.4);
  background-color: transparent;
  color: #fff;
  line-height: 26px;
  font-size: 12px;
  margin-right: 15px;
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
</style>