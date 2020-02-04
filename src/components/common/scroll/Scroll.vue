<template> 
  <!-- ref/children -->
  <div class="wrapper" ref="wrapper">
    <div class="wrapper-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
   pullUpLoad: {
     type: Boolean,
     default: false
   }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 创建BScroll对象 
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2. 监听滚动位置
    if (this.probeType ==2 || this.probeType == 3) {
      this.scroll.on('scroll', (positon) => {
      // console.log(positon);
      this.$emit('scroll', positon)
    })
    }
    // 3. 监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('-----')
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style >

</style>