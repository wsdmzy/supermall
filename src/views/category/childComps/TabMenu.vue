<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
          :class="{active: index === currentIndex}"
          v-for="(item,index) in list" :key="index"
          @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
  .tab-menu {
    overflow: hidden;
    position: fixed;
    
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  .menu-list {
    background-color: #f6f6f6;
    /* height: 100%; */
    width: 100px;
    /* box-sizing: border-box; */
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    font-weight: 700;
    color: var(--color--high-text);
    background-color: #fff;
    border-left: 3px solid var(--color--high-text)
  }
</style>