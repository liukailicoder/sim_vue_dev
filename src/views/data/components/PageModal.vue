<!--
  *@Author: 刘凯丽
  *@Descripttion：新增表或者编辑表
 -->
<template>
  <div class="modal">
    <BaseDialog :visible.sync="Msg.isShow" :title="Msg.title" :width="'40%'" @open="openDialog" @confirm="handleConfirm('modelFrom')" confirmText="确定" cancelText="取消">
      <el-form :model="formData" ref="modelFrom" label-width="140px" @submit.native.prevent class="bo-form">
        <el-form-item v-for="item in modelData" :label="item.name" :prop="item.name" :key="item.name" :rules="getFieldRules(item)">
          <template v-if="item.type === 'datetime'">
            <el-date-picker v-model="formData[item.name]" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"> </el-date-picker>
          </template>
          <template v-else>
            <el-input v-model="formData[item.name]" placeholder="请输入" :disabled="item.is_primary_key === 'PRI' && Msg.title === '编辑'"></el-input>
          </template>
        </el-form-item>
      </el-form>
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from '@/components/BaseDialog'
export default {
  components: { BaseDialog },
  name: 'PageModal',
  props: {
    Msg: {
      type: Object,
      default: {}
    },
    modelData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {}, // 表单数据对象
      formRules: {}
    }
  },
  methods: {
    openDialog() {
      console.log('打开弹框的回调-----编辑的时候使用')
      if (this.Msg.data) {
        this.formData = this.Msg.data
      } else {
        this.formData = {}
      }
    },
    getFieldRules(item) {
      // 类型有varchar， cost  datatime， text， decimal， int，需要修改表格和验证
      const rules = []
      if (item.is_nullable == 'YES' || item.is_primary_key === 'PRI') {
        rules.push({ required: true, message: `${item.name}不能为空`, trigger: 'blur' })
      }
      if (item.length) {
        rules.push({ max: parseInt(item.length), message: `长度不可超过${item.length}`, trigger: 'blur' })
      }
      return rules
    },
    // 关闭
    handleClose() {
      console.log('关闭')
      this.$refs['modelFrom'].resetFields()
      this.formData = {}
    },
    // 进行数据保存
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.formData)
          if (this.Msg.title === '新增') {
            this.$emit('update', 'add', this.formData)
          } else {
            this.$emit('update', 'update', this.formData)
          }
        }
      })
    }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/mixin.scss';
.bo-form {
  display: flex;
  flex-wrap: wrap;
  @include scrollBar();
  max-height: 500px;
  overflow-y: auto;
  ::v-deep .el-form-item {
    width: 47%;
    text-align: left;
    margin-left: 18px;

    .el-form-item__label {
      color: rgba(255, 255, 255, 0.729411764705882);
      font-size: 13px;
      font-weight: 400;
      text-align: left;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
