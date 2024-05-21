<template>
  <div class="bo-card-search-name">{{ searchName }}</div>
</template>

<script>
export default {
  name: 'searchName',
  props: {
    searchName: {
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
.bo-card-search-name {
  margin-left: 10px;
  position: relative;

  &::before {
    content: ' ';
    width: 5px;
    height: 19px;
    display: inline-block;
    position: absolute;
    // background-color: $menuActiveText;
    left: -9px;
    top: -1px;
  }
}
</style>
