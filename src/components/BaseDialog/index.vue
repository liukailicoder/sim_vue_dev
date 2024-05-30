<!--
 * @Descripttion:
 * @version:
 * @Author: 曹盼盼
 * @Date: 2024-05-22 18:05:16
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-23 11:38:24
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: 曹盼盼
 * @Date: 2024-05-22 14:45:45
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-22 17:43:07
-->
<!--
 * @Descripttion: 增加--open的回调，其他未修改
 * @version:
 * @Author: 曹盼盼
 * @Date: 2024-05-22 14:45:45
 * @LastEditors:刘凯丽
 * @LastEditTime: 2024-05-24 17:43:07
-->
<template>
  <el-dialog :title="title" :visible.sync="visible" :width="width" :height="height" @open="openDialog" :before-close="handleClose" :show-close="showClose">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ cancelText }}</el-button>
      <el-button @click="handleConfirm">{{ confirmText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'BaseDialog',
  props: {
    title: String,
    showClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '30%'
    },
    height: {
      type: String,
      default: '500px'
    },

    visible: Boolean,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    openDialog() {
      this.$emit('open')
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$emit('confirm')
      this.handleClose()
    }
  }
}
</script>
<style scoped lang="scss">
/* 背景颜色 */
::v-deep .el-dialog,
.el-pager li {
  background: #284693;
  /* background:rgba(20, 100, 244, 0.591764705882353); */
  border-radius: 10px;
}

/* title背景颜色 */
::v-deep .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #112f6a;
}

/* title颜色 */
::v-deep .el-dialog__title {
  color: #fff;
}

/* 叉号 */
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

/* 弹框底部样式 */
.dialog-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::v-deep .el-dialog__footer {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #112f6a;
}
.dialog-footer {
  ::v-deep .el-button {
    width: 80px;
    height: 30px;
    line-height: 5px;
    color: #fff;
  }
  & > :nth-child(1) {
    background: #fd6c69;
    border: 1px solid #fd6c69;
  }
  & > :nth-child(2) {
    background: #409eff;
    border: 1px solid #409eff;
  }
}
/* 传递input样式 */
::v-deep .el-form-item__label {
  color: #fff;
}

::v-deep .el-input__inner {
  background: rgba(0, 0, 0, 0.068627450980392) !important;
  border: 1px solid #797979;
  color: #fff;
}
</style>
