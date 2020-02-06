<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button class="check-button" :isChecked="isAllChecked" @click.native="checkAll"  />
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: ￥{{totalPrice}}
    </div>
    <div class="calcuate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList
              .filter(item => item.checked)
              .reduce((preValue, item) => preValue + item.price * item.count, 0)
              .toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isAllChecked() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkAll() {
      if (this.isAllChecked){
        this.cartList.map(item => item.checked = false)
      } else {
        this.cartList.map(item => item.checked = true)
      }
      // 不能简化  会动态改变isAllChecked
      // this.cartList.map(item => item.checked = !this.isAllChecked)
    },
    calcClick() {
      if (this.cartList.length === 0) {
        this.$toast.show('你的购物车空空如也~', 2000)
      } else if (!this.cartList.find(item => item.checked)) {
        this.$toast.show('请选择购买的商品', 2000)
      }

     
    }
  }

}
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 14px;

   position: fixed;
   bottom: 49px;
   right: 0;
   left: 0;
   display: flex;
  }

  .check-area {
    display: flex;
    /* height: 40px; */
    width: 60px;
    align-items: center;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    line-height: 20px;
  }

  .totalPrice {
    flex: 1;
    margin-left: 40px;
  }

  .calcuate {
    width:80px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>