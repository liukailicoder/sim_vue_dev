<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-21 19:16:08
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-23 20:46:58
-->
<template>
  <div class="app-container">
    <div class="wrap">
      <div class="header">
        <h3>API列表</h3>
        <div @click="apiMask"><img src="@/assets/role_images/add.png" alt=""><span>新建API</span></div>
      </div>
      <div class="content">
        <!-- table 表头  -->
        <BaseTableHead :formData="formFieldsData" :fields="formFields" @input-change="onInputChange">
          <el-form-item>
            <el-button @click="resetSearchForm()">重置</el-button>
            <el-button type="primary" @click="roleSearchSubmit">搜索</el-button>
          </el-form-item>
        </BaseTableHead>
        <div class="base-table" style="margin-top:20px">
          <baseTable :columns="tableColumns" :data="apiListData" :pagination="pageInfo"
            @update:pagination="updatePagination">
            <template #actions="{ row }">
              <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="handleDelete(row)">删除</el-button>
            </template>
          </baseTable>
        </div>
      </div>
    </div>
    <!-- 新建 API -->
    <BaseDialog :visible.sync="dialogApiVisible" :title="titleName" @confirm="handleConfirm(apiForm)" confirmText="保存"
      cancelText="取消">
      <el-form :model="apiForm" :rules="rules" ref="apiForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="API名称" prop="path">
          <el-input v-model="apiForm.path" placeholder="请输入API名称" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method">
          <el-input v-model="apiForm.method" placeholder="请输入请求方式" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="API简介" prop="summary">
          <el-input v-model="apiForm.summary" placeholder="请输入API简介" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="Tags" prop="tags">
          <el-input v-model="apiForm.tags" placeholder="请输入Tags" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
    </BaseDialog>
    <!-- 删除角色弹窗 -->
    <BaseDialog :visible.sync="dialogDelete" :showClose="showStatus" @confirm="handleDeleteConfirm()"
      header-visible="false">
      <div>
        <p style="text-align:center;color: #fff;">确定删除该角色吗?</p>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
  import BaseDialog from '@/components/BaseDialog';
  import BaseTable from "@/components/BaseTable/indexs.vue";
  import BaseTableHead from '@/components/BaseTableHead'
  export default {
    components: {
      BaseDialog,
      BaseTable,
      BaseTableHead
    },
    data() {
      return {
        apiForm: {
          path: '',
          method: '',
          summary: "",
          tags: ''
        },
        rules: {
          path: [
            { required: true, message: '请输入API名称', trigger: 'blur' },
          ],
          method: [
            { required: true, message: '请输入请求方式', trigger: 'blur' },
          ],
          summary: [
            { required: true, message: '请输入API简介', trigger: 'blur' },
          ],
          tags: [
            { required: true, message: '请输入Tags', trigger: 'blur' },
          ],

        },
        dialogApiVisible: false,
        titleName: '',
        pageInfo: {
          page: 1,
          page_size: 10,
          total: 0,
        },
        apiListData: [],
        //tab表格内容
        tableColumns: [
          { label: 'API路径', prop: 'path' },
          { label: '请求方式', prop: 'method' },
          { label: 'API简介', prop: 'summary' },
          { label: 'Tags', prop: 'tags' },
        ],
        api_name: '',

        //编辑
        roleItem: {},//每一行表格的值
        Api_id: '',
        dialogDelete: false,
        showStatus: false,//弹窗是否显示叉号

        //搜索
        //标题参数
        formFields: [
          { prop: 'path', label: '路径' },
          { prop: 'summary', label: 'API简介' },
          { prop: 'tags', label: 'Tags' },
        ],
        formFieldsData: {},
        api_path: "",
        api_summary: "",
        api_tags: "",

      }
    },
    mounted() {
      this.getApiList()

    },
    methods: {
      getApiList() {
        console.log("requestList", this.pageInfo)
        this.$api('system').APIList(this.pageInfo.page, this.pageInfo.page_size, this.api_path, this.api_summary, this.api_tags).then(res => {
          if (res && res.code && res.code == 200) {
            this.apiListData = res.data;
            this.pageInfo.page_size = res.page_size;
            this.pageInfo.page = res.page;
            this.pageInfo.total = res.total;
            console.log(JSON.stringify(this.apiListData))
          }
        }).catch(error => {
          console.log(error);
        });

      },
      //新建API
      apiMask() {
        this.dialogApiVisible = true;
        this.titleName = "新增API"

      },
      //新建API、编辑API弹窗保存按钮 成功并请求角色列表
      handleConfirm(formName) {
        console.log("data", formName)
        console.log('保存按钮', formName)
        if (this.titleName == '新增API') {
          //新建角色
          this.$api('system').createAPI(formName).then(res => {
            console.log("1111")
            if (res && res.code && res.code == '200') {
              this.getApiList();

            }
          }).catch(error => {
            console.log(error);
          });
        }
        if (this.titleName == "编辑API") {
          this.roleItem.path = formName.path;
          this.roleItem.method = formName.method;
          this.roleItem.summary = formName.summary;
          this.roleItem.tags = formName.tags;
          console.log(this.roleItem)
          this.$api('system').updateAPI(this.roleItem).then(res => {
            if (res && res.code && res.code == '200') {
              this.getApiList();//创建成功之后请求列表接口
            }
          }).catch(error => {
            console.log(error);
          });
        }

      },
      //编辑角色弹窗
      handleEdit(row) {
        this.titleName = "编辑API";
        console.log("编辑角色弹窗", row);
        this.dialogApiVisible = true;
        this.apiForm.path = row.path;
        this.apiForm.method = row.method;
        this.apiForm.summary = row.summary;
        this.apiForm.tags = row.tags
        this.roleItem = row;
      },
      //删除弹窗弹窗
      handleDelete(data) {
        console.log("data", data)
        this.Api_id = data.id;
        this.dialogDelete = true;
      },
      //删除角色接口
      handleDeleteConfirm() {
        this.$api('system').deleteAPI(this.Api_id).then(res => {
          if (res && res.code && res.code == '200') {
            this.getApiList();//创建成功之后请求列表接口
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //搜索 路径 API简介 Tags 并请求列表接口
      roleSearchSubmit() {
        this.api_path = this.formFieldsData.path;
        this.api_summary = this.formFieldsData.summary;
        this.api_tags = this.formFieldsData.tags;
        console.log("====", this.formFieldsData);
        this.getApiList();
      },
      //重置 路径 API简介 Tags 并请求列表接口
      resetSearchForm() {
        this.formFieldsData.path = '';//input的值重置为空
        this.formFieldsData.summary = '';
        this.formFieldsData.tags = '';
        this.api_path = '';
        this.api_summary = '';
        this.api_tags = '';
        console.log("====", this.formFieldsData);
        this.getApiList()
      },
      //拿到输入框的值
      onInputChange({ prop, value }) {

        this.formFieldsData[prop] = value;
        console.log("formFieldsData", this.formFieldsData);

      },
      //分页逻辑
      updatePagination() {
        console.log("分页updatePagination", newPagination)
        this.pageInfo = newPagination;

      }

    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    width: 100%;

    .wrap {
      padding: 0 30px;
    }

    /* 角色header */
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      >h3 {
        color: #fff;
        font-family: '微软雅黑';
      }

      >div {
        padding: 10px 10px;
        background-color: #409EFF;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        >img {
          width: 20px;
          height: 20px;
        }

        >span {
          color: #fff;
          font-size: 14px;
          font-family: '微软雅黑';
        }
      }
    }

    /* 角色table */
    .content {
      width: 100%;
      height: 700px;
      padding: 30px 30px;
      background: rgba(0, 0, 0, 0.18627450980392);
      border-radius: 8px;
      margin-top: 30px;

      .table_header {
        padding: 20px 30px;
        width: 100%;

        .searchForm {
          display: flex;
        }
      }
    }
  }

  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__inner {
    background: rgba(0, 0, 0, 0.068627450980392) !important;
    border: 1px solid #797979;
    color: #fff;
  }

  .table_header ::v-deep .el-button {
    width: 90px;
    height: 40px;
    margin-right: 15px;
  }

  /* 设置权限弹窗样式 */
  .authority ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }

  .authority ::v-deep .right-side-dialog {
    margin-left: auto;
    margin-right: 0;
  }

  /* 背景颜色 */
  .authority ::v-deep .el-dialog,
  .el-pager li {
    background: #284693;
    border-radius: 10px;
  }

  /* title颜色 */
  .authority ::v-deep .el-dialog__title {
    color: #fff
  }

  /* 叉号 */
  .authority ::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: #fff
  }

  .authority ::v-deep .el-tabs__item {
    color: #fff;
  }

  .authority ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  ::v-deep .el-dialog__wrapper {
    background: rgba(0, 0, 0, 0.068627450980392);
  }
</style>