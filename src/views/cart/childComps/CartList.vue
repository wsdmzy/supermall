<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  components: {
    Scroll,

    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .content {
    position: fixed;
    overflow: hidden;
    top: 44px;
    bottom: 89px;
    right: 0;
    left: 0;
  }
</style>