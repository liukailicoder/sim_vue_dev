<!--
  *@Author: 刘凯丽
  *@Descripttion：案例列表检索页面
 -->
<template>
  <div class="app-container case-container">
    <div class="wrap">
      <!-- 搜索 -->
      <BaseTableHead :formData="formFieldsData" :fields="formFields" @input-change="onInputChange">
        <el-form-item>
          <el-button @click="resetSearchForm()">重置</el-button>
          <el-button type="primary" @click="caseSearchSubmit">搜索</el-button>
        </el-form-item>
      </BaseTableHead>

      <!-- 列表 -->
      <div class="case-list">
        <div v-for="item in caseList" :key="item.id" class="item-list">
          <!-- 列表中的头部展示 -->
          <BaseCaseHeader :item="item" />
          <!--  列表中的内容展示 -->
          <div class="content">
            <BaseCaseContent :name="'智能主体：'" :value="item.Num_AgentTotl" :class-value="'case-main'" />
            <BaseCaseContent :name="'资源：'" :value="item.Num_RsrcTotl" :class-value="'case-source'" />
            <BaseCaseContent :name="item.CREATE_DATE" :value="''" :class-value="'case-time'" />
          </div>
          <!--  列表中的操作按钮 -->
          <div class="item-footer">
            <div class="item-btn" @click="handleCase('edit')">编辑</div>
            <div class="item-btn" @click="handleCase('overview')">总览</div>
            <div class="item-btn" @click="handleCase('delete')">删除</div>
          </div>
        </div>
        <!-- 新增+++ -->
        <div class="item-list" style="text-align: center" @click="handleCase('add')">
          <i class="el-icon-plus" />
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
import BaseTableHead from '@/components/BaseTableHead'
import BaseCaseHeader from './components/BaseCaseHead'
import BaseCaseContent from './components/BaseCaseContent'
import { request } from '@/utils/request/Request'
export default {
  components: {
    BaseTableHead,
    BaseCaseHeader,
    BaseCaseContent
  },
  data() {
    return {
      formFields: [
        { prop: 'name', label: '案例名称' },
        {
          prop: 'publish_state',
          type: 'select',
          label: '案例状态',
          options: [
            { label: '已发布', value: '01' },
            { label: '未发布', value: '02' }
          ]
        }
      ],
      formFieldsData: {},
      pageInfo: {
        page: 1,
        page_size: 10,
        total: 0
      },
      caseList: []
    }
  },

  methods: {
    // 搜索
    caseSearchSubmit() {
      const _param = this.formFieldsData
      _param.page = this.pageInfo.page
      _param.page_size = this.pageInfo.page_size
      if (_param.page === 1) this.caseList = []
      this.getCaseList(_param)
      // console.log('caseSearchSubmit====', this.formFieldsData)
    },
    // 列表接口请求
    getCaseList(_param) {
      request
        .$api('case')
        .requestCaseList(_param)
        .then((res) => {
          // this.loading = false
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.pageInfo.total = res.total
            this.caseList = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    handleCase(type) {
      // type  --edit----overview-----delete---add
    },
    handleCurrentChange(page) {
      this.pageInfo.page = page
      this.caseSearchSubmit()
    },
    resetSearchForm() {
      this.formFieldsData.name = '' // input的值重置为空
      this.formFieldsData.publish_state = ''
      this.getCaseList()
      // console.log('formFieldsData====', this.formFieldsData)
    },
    // 拿到输入框的值
    onInputChange({ prop, value }) {
      this.formFieldsData[prop] = value
      // console.log('formFieldsData', this.formFieldsData)
    }
  },

  mounted() {},
  created() {
    this.caseSearchSubmit()
  }
}
</script>
<style scoped lang="scss">
.app-container {
  width: 100%;

  .wrap {
    padding: 0 18px;
    min-height: 700px;
  }
  .case-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 20px;
    .item-list {
      // width: 323px;
      // height: 194px;
      // margin: 0 5px 30px 0px;
      width: 305px;
      height: 194px;
      margin: 0 17px 30px 0px;
      padding: 20px;
      color: #fff;
      position: relative;
      background-image: url('~@/assets/case-images/case-list-bg.png');
      background-size: 100% 100%;
      ::v-deep .el-icon-plus {
        font-size: 92px;
        color: #f2f2f2;
        line-height: 135px;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;
        border-bottom: 1px solid #010101;
      }
      .item-footer {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
        .item-btn {
          color: #d7d7d7;
          font-size: 12px;
        }
      }
    }
  }
}


</style>
