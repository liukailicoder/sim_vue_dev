<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-24 02:06:47
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-24 12:06:21
-->
<template>
  <div class="table">
    <el-table :data="data" style="width: 100%;height: 400px;min-height:400px" >
      <el-table-column label=" 头像">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" style="width: 50px; height: 50px;border-radius: 50%;" v-if="scope.row.avatar">
      </template>
      </el-table-column>
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="用户角色">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.roles" :key="index">
            {{ item.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="超级用户" prop="is_superuser">
        <template slot-scope="scope">
          {{ scope.row.is_superuser ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="last_login" label="上次登录时间"></el-table-column>
      <el-table-column label="禁用">
        <template #default="scope">
          <el-switch v-model="scope.row.is_active" :active-value="false" :inactive-value="true"
            @change="isactiveChanged(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <slot name="actions" :row="scope.row">
            <el-button v-for="action in scope.row.actions" :key="action.label" size="mini"
              :type="action.type || 'primary'" @click="action.handler(scope.row)">
              {{ action.label }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" class="pagination" :current-page="pagination.currentPage"
      :page-size="pagination.pageSize" :total="pagination.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
  
</template>

<script>
  export default {
    props: {

      data: {
        type: Array,
        required: true,
      },
       pagination: {
        type: Object,
        required: true
      }

    },
    methods: {
      isactiveChanged(scope) {
        this.$emit("activeUpdateUser", scope);
      },
      handleSizeChange(val) {
        this.$emit('update:pagination', { ...this.pagination, pageSize: val });
      },
      handleCurrentChange(val) {
        this.$emit('update:pagination', { ...this.pagination, currentPage: val });
      }

    },
  };
</script>
<style scoped lang="scss">
  /* 表格背景 */
  .table ::v-deep .el-table {
    background-color: rgba(10, 29, 94, 0.191764705882353) !important;
    border-top: 1px solid rgb(20, 100, 244) !important;
    border: 1px solid transparent;
  }


  .table ::v-deep .el-table th {
    background-color: rgba(20, 100, 244, 0.191764705882353) !important;
    border-bottom: 2px solid transparent;
    text-align: center;
    color: rgba(255, 255, 255, 0.729411764705882);
  }

  .table ::v-deep .el-table tr {
    border: 1px solid red;
    background-color: transparent;
  }

  /* 鼠标划过整行的变色的hover */
  .table ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {

    background-color: rgba(255, 255, 255, 0.129411764705882) !important;
    cursor: pointer;
  }

  .table ::v-deep .el-table td {
    padding: 10px 0;
    color: rgba(255, 255, 255, 0.729411764705882);
    text-align: center;
  }

  .table ::v-deep .el-table td,
  .el-table th.is-leaf {
    border-bottom: transparent;
  }

  .table .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: transparent;
  }

  .table ::v-deep .el-table__empty-block {
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