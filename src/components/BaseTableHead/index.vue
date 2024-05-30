<!--
 * @Descripttion:
 * @version:
 * @Author: 曹盼盼
 * @Date: 2024-05-22 23:32:28
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 17:45:38
-->
<!--
 * @Descripttion: 新增select判断，field.type && field.type === 'select' && field.options， 并添加其样式
 * @version:
 * @Author: 刘凯丽
 * @Date: 2024-05-27 23:32:28
-->
<template>
  <div class="froms_box" >
    <el-form ref="formRef" :model="formData">
      <el-form-item v-for="(field, index) in fields" :key="field.prop" :label="field.label || field.prop" :style="{ marginRight: marginRight + 'px' }">
        <!-- v-if="field.type === 'input'" -->
        <template v-if="field.type && field.type === 'select' && field.options">
          <el-select v-model="formData[field.prop]" placeholder="" clearable @input="updateValue(field.prop, $event)">
            <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-else-if="field.type && field.type === 'number'">
          <el-input type="number" v-model="formData[field.prop]"></el-input>
        </template>
        <template v-else-if="field.type && field.type === 'textarea'">
          <el-input v-model="formData[field.prop]" @input="projectNameInput" style="width:240px;" maxlength="100"
            type="textarea"></el-input>
          <div style="padding-left:5px;color:gray; position: absolute; right: 10px;top: 10px; font-size:12px"> 字数限制:{{enter}}/100</div>
        </template>
        <template v-else>
          <el-input v-model="formData[field.prop]" @input="updateValue(field.prop, $event)" />
        </template>
      </el-form-item>
      <div class="btn-search">
        <slot></slot>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'CustomFormInputs',
    props: {
      formData: {
        type: Object,
        required: true
      },
      fields: {
        type: Array,
        required: true // 字段配置数组，包含prop, label, type等
      },
      // rules:{
      //   type: Object,
      //   default:{},
      //   required:true
      // },
      marginRight: {
        type: Number,
        default: 50 // 默认值为5px
      }
    },
    emits: ['input-change'], // 定义自定义事件
    data() {
      return {
        enter: 0,
      };
    },

    methods: {
      updateValue(prop, value) {
        // console.log("prop",prop,value)
        this.$emit('input-change', { prop, value }) // 触发事件，向父组件传递更新的值
      },
      projectNameInput() {
        var Val = this.formData.desc.length;
        this.enter = Val;
      },
    }
  }
</script>
<style scoped lang="scss">
  .froms_box ::v-deep .el-form {
    display: flex;
    align-items: center;
  }

  .froms_box ::v-deep .el-form-item {
    display: flex;
    /* margin-right: 50px; */
  }

  .froms_box ::v-deep .el-button {
    margin-right: 20px;
  }

  .froms_box::v-deep .el-input__inner {
    color: #fff;
  }
</style>
<style lang="scss">
  .el-select-dropdown {
    background-color: rgba(3, 47, 128, 1);
    border: none;
  }

  .el-select-dropdown__item {
    color: #fff;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: rgba(255, 255, 255, 0.129411764705882) !important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: rgba(3, 47, 128, 1) !important;
  }
</style>