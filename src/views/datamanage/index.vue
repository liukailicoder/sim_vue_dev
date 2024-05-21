<template>
  <div class="datamanger">
    <section class="bo-card-search">
      <search-name :searchName="'查询条件'" />
      <el-form ref="form" :inline="true" :model="formData" :rules="rules" :validate-on-rule-change="false" @submit.native.prevent label-position="left" label-width="100px" class="bo-form">
        <el-form-item label="表中文名" prop="chineseName">
          <el-input v-model="formData.chineseName" placeholder="请输入" @keyup.enter.native="fetchList(1)" clearable></el-input>
        </el-form-item>
        <el-form-item label="表英文名" prop="englishName">
          <el-input v-model="formData.englishName" placeholder="请输入" @keyup.enter.native="fetchList(1)" clearable></el-input>
        </el-form-item>
        <div class="btn-search">
          <el-form-item>
            <el-button type="primary" @click="fetchList(1)" class="bo-dark-button">查询</el-button>
            <el-button plain @click="resetForm" class="bo-light-button">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </section>

    <section class="bo-result"></section>
  </div>
</template>

<script>
import SearchName from '@/components/SearchName'
export default {
  name: 'datamanage',
  components: { SearchName },
  data() {
    return {
      formData: {
        chineseName: '',
        englishName: ''
      },
      rules: {
        chineseName: [{ required: true, message: '请输入', trigger: 'blur' }],
        englishName: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    fetchList() {},
    resetForm() {}
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.datamanger {
}
</style>
