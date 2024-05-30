<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-29 15:59:52
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 22:05:48
-->
<template>
  <div class="app-container case-container">
    <div class="top">
      <TipName :tip-name="'节点信息'" />
      <BaseTableHead :formData="formFieldsData" :fields="formFields" @input-change="onInputChange" :marginRight="20"
        style="margin-top:20px">
        <el-form-item>
          <el-button>保存</el-button>
          <el-button>取消</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </BaseTableHead>
    </div>
    <div class="bottom">
      <TipName :tip-name="'节点图绘制'" />
      <el-row :gutter="24" style="margin-top:20px">
        <el-col :span="2">
          <div class="left">
            <div class="header">图元面板</div>
          </div>

        </el-col>
        <el-col :span="18">
          设计面板
        </el-col>
        <el-col :span="4">
          属性面板
        </el-col>
      </el-row>
    </div>


  </div>
</template>
<script>
  import TipName from "@/components/TipName"
  import BaseTableHead from '@/components/BaseTableHead'
  export default {
    name: "Elements",
    components: {
      TipName,
      BaseTableHead
    },
    data() {
      return {
        formFieldsData: {},
        formFields: [
          { prop: 'name', label: '案例名称:' },
          { prop: 'number', label: ' 仿真次数:', type: "number" },
          {
            prop: 'publish_state',
            type: 'select',
            label: '案例状态',
            options: [
              { label: '已发布', value: '01' },
              { label: '未发布', value: '02' }
            ]
          },
          { prop: 'desc', label: '案例描述', type: "textarea" },
        ],
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   num: [
        //     { required: true, message: '请选择活动区域', trigger: ["blur", "change"] }
        //   ],
        //   desc: [
        //     { required: true, message: '长度不超过100', trigger: 'blur' },
        //     { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        //   ]
        // },

      }
    },
    created() {
      this.getCreateElement()
 
      
    },
    methods: {
      getCreateElement(){
        this.$api('elements').createElement().then(res => {
          console.log("reselementselementselements",res)
        }).catch(error => {
          console.log(error);
        });

      },
      onInputChange() {

      },
    }
  }
</script>
<style lang="scss" scoped>
  .left {
    width: 120px;
    height: 600px;
    border: 1px solid #1F95DA;
    .header{
      width: 100%;
      height: 53px;
      line-height: 53px;
      background: rgba(20, 209, 196, 0.237254901960784);
      text-align: center;
      font-size:18px;
      font-family:"PingFang SC";
      color: #fff;
      box-shadow:0px 0px 10px 0px rgba(20, 209, 196, 0.337254901960784) inset;
      border-bottom: 2px solid #002636;
    }
  }

  ::v-deep .el-textarea__inner {
    resize: none;
    background: rgba(0, 0, 0, 0.068627450980392) !important;
    border: 1px solid #797979;
    color: #fff;
    height: 38px !important;
    min-height: 38px !important;
  }

  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__inner {
    background: rgba(0, 0, 0, 0.068627450980392) !important;
    border: 1px solid #797979;
    color: #fff;
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
</style>