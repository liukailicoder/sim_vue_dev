<!--
  *@Author: 刘凯丽
  *@Descripttion：列表中的内容
 -->
<template>
  <div class="content-list">
    <span class="_name"
      >{{ name }}：
      <span v-if="name === '运行开始时间' || name === '创建时间'">{{ value || '-' }}</span>
      <span v-else class="_num">{{ value || 0 }} 个</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseSimList',
  props: {
    name: {
      type: String,
      default: '-'
    },
    value: {
      type: [Number, String],
      default: 0
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
  padding: 5px 2px;
  position: relative;
  &::before {
    content: ' ';
    position: absolute;
    width: 8px;
    height: 8px;
    top: 7px;
    background-color: rgba(0, 0, 191, 1);
    -moz-box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.556862745098039);
    -webkit-box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.556862745098039);
    box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.556862745098039);
  }
  ._name {
    padding-left: 17px;
    ._num {
      color: rgba(128, 255, 255, 0.996078431372549);
    }
  }
}
</style>
