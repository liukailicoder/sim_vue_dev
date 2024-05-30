<template>
  <div class="item-footer">
    <template v-if="item.RUNNING_STATE === '03'">
      <div class="finished-btn" @click="goToDetail">结果查看</div>
    </template>
    <template v-else>
      <div v-for="(icon, index) in svgIcons" @click="btnClick(icon, index)" class="item-btn">
        <svg-icon :icon-class="getIconClass(icon, index)" :class="icon === 'stop' ? 'icon-stop' : ''" />
      </div>
      <!-- <div @click="btnClick" class="item-btn">
        <svg-icon icon-class="stop" class="icon-stop" />
      </div>
      <div @click="btnClick" class="item-btn">
        <svg-icon icon-class="pause" />
      </div>
      <div @click="btnClick" class="item-btn">
        <svg-icon icon-class="start" />
      </div> -->
      <div v-if="item.RUNNING_STATE === '01'" class="monitor-btn" @click="goToDetail">运行监控</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseSimFooter',
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      svgIcons: ['stop', 'pause', 'start'],
      currentIndex: ''
    }
  },
  methods: {
    btnClick(icon, index) {
      this.currentIndex = index
      this.$emit('operation', icon, this.item.ExptID)
    },
    goToDetail() {
      this.$emit('detail', this.item.ExptID)
    },
  },
  computed: {
    getIconClass() {
      return function (icon, index) {
        if (this.currentIndex === index) return icon + '-selected'
        return icon
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.item-footer {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  .item-btn {
    width: 50px;
    height: 50px;
    background-image: url('~@/assets/running_images/btn.png');
    background-size: 100% 100%;
    position: relative;
    cursor: pointer;
    .svg-icon {
      position: absolute;
      top: 18px;
      left: 15px;
      width: 20px;
      height: 15px;
      &.icon-stop {
        transform: rotate(-90deg);
      }
    }
  }
  .finished-btn,
  .monitor-btn {
    width: 117px;
    height: 37px;
    text-align: center;
    line-height: 37px;
  }
  .finished-btn {
    margin: auto;
    background-color: rgba(0, 204, 204, 0.0666666666666667);
    -moz-box-shadow: 0px 0px 10px 0px rgba(20, 209, 196, 0.337254901960784) inset;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(20, 209, 196, 0.337254901960784) inset;
    box-shadow: 0px 0px 10px 0px rgba(20, 209, 196, 0.337254901960784) inset;
    background-image: url('~@/assets/running_images/finished.png');
    background-size: 100% 100%;
  }
  .monitor-btn {
    background-color: rgba(0, 204, 255, 0.0784313725490196);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0, 204, 255, 0.337254901960784) inset;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 204, 255, 0.337254901960784) inset;
    box-shadow: 0px 0px 10px 0px rgba(0, 204, 255, 0.337254901960784) inset;
    background-image: url('~@/assets/running_images/monitor.png');
    background-size: 100% 100%;
  }
}
</style>
