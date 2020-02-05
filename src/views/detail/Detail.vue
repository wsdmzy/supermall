<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    
    <scroll class="content" 
            ref="scroll" 
            :probeType="3"
            @scroll="contentScroll">
      <!-- 属性用驼峰，传值- -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"  />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/util'
import {backTopMixin} from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    Scroll,
    GoodsList,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
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

      // 等dom根据最新的数据渲染完成 回调
      // 但是图片依然没有加载完(目前获取的offsetTop不包含图片)
      // offsetTop不对的时候 一般都是图片的问题
      // this.$nextTick(() => {
      //   this.themeTopY = []
      //   this.themeTopY.push(0)
      //   this.themeTopY.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      //   console.log('++++')
      // })

    })

    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值(对this.themeTopY赋值操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Infinity)
      // console.log(this.themeTopY)
    })
  },
  mounted() {
    // 监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })
  },
  // updated() {
  //   this.themeTopY = []
  //   this.themeTopY.push(0)
  //   this.themeTopY.push(this.$refs.params.$el.offsetTop)
  //   this.themeTopY.push(this.$refs.comment.$el.offsetTop)
  //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
  //   console.log('++++')
  // },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
      // console.log('++++')
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.listenBackTop(position)

      // console.log(position)
      const positionY = -position.y
      // positionY和themeTopY对比
      let length = this.themeTopY.length - 1;
      // this.themeTopY.push(Infinity)
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // console.log('+++')
      // 1. 获取购物车需要展示的信息
      const product= {}
      product.iid = this.iid;
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      
      // console.log(product);
      // 2. 将商品添加购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }
  }
}

</script>


<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }



  .content {
    /* height: calc(100% - 44px); */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 50px;
    right: 0;
    left: 0;
  }
</style>