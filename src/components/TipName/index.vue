<!--
 *@Author: 刘凯丽
 *@Descripttion：这是一个tip-name
-->
<template>
  <div class="page-card-search-name">{{ tipName }}</div>
</template>

<script>
export default {
  name: 'tipName',
  props: {
    tipName: {
      type: String,
      default: '查询条件'
    }
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-card-search-name {
  font-size: 14px;
  margin-left: 10px;
  position: relative;
  // color: rgba(255, 255, 255, 0.729411764705882);
  color: #FFFFFF;

  &::before {
    content: ' ';
    width: 5px;
    height: 19px;
    display: inline-block;
    position: absolute;
    // background-color: $menuActiveText;
    background-color: #409EFF;
    left: -9px;
    top: -1px;
  }
}
</style>
