<template>
<!-- <div>{{contentdetail}}</div> -->
<!-- <div>{{contentdetail}}</div> -->
  <grid-view>
    <good-list-item v-for="(item, index) in contentdetail" :key="index" :goodsItem="item"></good-list-item>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodListItem from 'components/content/goods/GoodListItem'

export default {
  name: 'ContentDetail',
  components: {
    GoodListItem,
    GridView
  },
  props: {
    contentdetail: {
      type: Array,
      default() {
        return []
      }
    }
   
  },
  computed: {
    // detail() {
    //   return this.contentdetail[type];
    // }
  }
}
</script>

<style>

</style>