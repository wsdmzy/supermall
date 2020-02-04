<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
    </scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    Scroll,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      // 1. 获取顶部轮播图片
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4. 获取商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 或去参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6. 获取评论信息
      this.commentInfo = data.rate.cRate ? data.rate.list[0] : {}
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>


<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>