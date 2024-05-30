
  <!--
  *@Author: 刘凯丽
  *@Descripttion：列表中的内容
 -->
<template>
  <div class="content-list">
    <svg-icon :icon-class="classValue" />
    <span>
      {{ name }}
      <span v-if="classValue !== 'case-time'" class="num">{{
        value || 0
      }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseCaseList',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    classValue: {
      type: String,
      default: 'case-main'
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
.content-list {
  min-width: 47%;
  padding: 5px 3px;
  .svg-icon {
    margin-right: 5px;
  }
  &:nth-child(even) {
    text-align: right;
  }
  span {
    font-size: 13px;
    .num {
      color: rgba(128, 255, 255, 0.996078431372549);
    }
  }
}
</style>
