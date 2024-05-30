<!--
  *@Author: 刘凯丽
  *@Descripttion：页面搜索框
 -->
<template>
  <!-- 页面搜索组件 -->
  <section class="page-card-search">
    <!-- 检索名字 -->
    <TipName :tip-name="'查询条件'" />
    <!-- 搜索条件 -->
    <el-form :inline="true" ref="ruleForm" label-width="100px" @submit.native.prevent class="bo-form">
      <el-form-item
        v-for="(value, key) in searchFormData"
        :key="key"
        :label="key"
      >
        <el-input v-model="searchFormData[key]"></el-input>
      </el-form-item>

      <div class="btn-search">
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick" class="bo-dark-button">查询</el-button>
          <el-button plain @click="handleResetClick('ruleForm')" class="bo-light-button">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'formPicker',
  props: {
    searchFormData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    handleQueryClick() {
      this.$emit('getTableDataList', 1)
    },
    handleResetClick(ruleForm) {
      this.$emit('handleResetClick', ruleForm)
    }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-card-search {
  background-color: rgba(0, 0, 0, 0.1862745098);
  border-radius: 5px;
  padding: 12px;

  ::v-deep .bo-form {
    padding: 20px 60px 0 45px;
    .btn-search {
      float: right;
      .el-button {
        min-width: 100px;
      }
    }
  }
}
</style>
