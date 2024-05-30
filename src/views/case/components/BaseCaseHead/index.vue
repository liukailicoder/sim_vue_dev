  <!--
  *@Author: 刘凯丽
  *@Descripttion：列表中的头部展示
 -->
<template>
  <div class="header">
    <div class="item-name">
      <svg-icon icon-class="case-arrow" />
      {{ item.EXPT_NAME }}
    </div>
    <div class="item-status" :style="{ color: getColor(item.PUBLISH_STATE) }">
      <i :style="{ background: getColor(item.PUBLISH_STATE) }"></i>
      {{ item.PUBLISH_STATE === '02' ? '已发布' : '未发布' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCaseHead',
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
        if (status === '01') return '#F48112'
        if (status === '02') return '#18F45E'
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
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
