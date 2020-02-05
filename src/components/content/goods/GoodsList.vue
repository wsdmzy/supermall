<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodListItem'

export default {
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    /* 包裹 */
    flex-wrap: wrap;
    /* 将每个元素的间隔相等 */
    justify-content: space-evenly;   
  }


</style>