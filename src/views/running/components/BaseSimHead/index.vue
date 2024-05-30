<!--
  *@Author: 刘凯丽
  *@Descripttion：列表中的头部展示
 -->
<template>
  <div class="item-header">
    <div class="item-name">{{ item.EXPT_NAME }}</div>
    <div class="item-status" :style="{ color: getColor(item.RUNNING_STATE) }">
      <i :style="{ background: getColor(item.RUNNING_STATE) }"></i>
      {{ getName(item.RUNNING_STATE) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSimHead',
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    getColor() {
      return function (status) {
        if (status === '01') return '#F73C52' // 运行中  01 运行中
        if (status === '03') return '#f2f2f2' // 运行结束 03 停止 // 算是运行结束
        if (!status || status === '02') return '#31ECB3' // 未开始 02 暂停  // 算是未开始
      }
    },
    getName() {
      return function (status) {
        if (status === '01') return '运行中'  // 01 运行中
        if (status === '03') return '运行结束' //  03 停止 // 算是运行结束
        if (!status || status === '02') return '未开始' // 未开始 02 暂停  // 算是
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.item-header {
  padding: 0 20px;
  height: 42px;
  line-height: 42px;
  background-color: rgba(20, 100, 244, 0.1917647059) !important;
  border-top: 2px solid rgb(20, 100, 244) !important;
  display: flex;
  .item-name,
  .item-status {
    flex: 1;
    font-weight: 700;
    font-size: 16px;
  }
  .item-status {
    text-align: right;
    font-size: 12px;
    font-weight: 400;
    i {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
