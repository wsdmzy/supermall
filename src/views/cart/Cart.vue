<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,

    CartList,
    CartBottomBar
  },
  computed: {
    // 俩种用法辅助属性
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  /* .cart {
    height: 100vh;;
  } */

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    z-index: 1;
  }
</style>