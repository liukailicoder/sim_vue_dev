<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-29 22:09:49
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 22:27:25
-->
<template>
  <div class="app-container case-container">
    <div class="top">
      <TipName :tip-name="'分析条件'" />
      <BaseTableHead :formData="formFieldsData" :fields="formFields" @input-change="onInputChange"
        style="margin-top:60px;margin-left: 60px;">
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">分析</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-form-item>
      </BaseTableHead>
    </div>
    <div class="bottom">
      <TipName :tip-name="'分析结果'" />
      <div>
        <BaseLine/>
      </div>

    </div>


  </div>
</template>
<script>
  import TipName from "@/components/TipName"
  import BaseTableHead from '@/components/BaseTableHead'
  import BaseLine from "../components/BaseLine"
  export default {
    name: "energyCost",
    components: {
      TipName,
      BaseTableHead,
      BaseLine
    },
    data() {
      return {
        formFields: [
          {
            prop: 'name',
            type: 'select',
            label: '案例名称',
            options: []
          },
          {
            prop: 'frequency',
            type: 'select',
            label: '仿真次数',
            options: []
          }
        ],
        formFieldsData: {},
        titleName:'案例1-储能成本分析'

      }
    },
    created() {

    },
    methods: {
      onInputChange({ prop, value }) {
        this.formFieldsData[prop] = value
        console.log('拿到输入框的值---', this.formFieldsData)
      },
      // handleConfirm分析
      searchSubmit() {

      },
      resetSearchForm() {
        this.searchFormData = {};
      },
    },
  }
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 200px;
    background: rgba(0, 0, 0, 0.1862745098);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .bottom {
    width: 100%;
    height: 600px;
    background: rgba(0, 0, 0, 0.1862745098);
    border-radius: 6px;
    padding: 10px;
    margin-top: 20px;
  }
</style>