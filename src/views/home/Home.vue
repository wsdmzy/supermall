<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
      <!-- <template v-slot:center>购物街</template>  -->
    </nav-bar>
    <tab-control ref="tabControl1" class="tab-control"
    :titles="['流行', '新款', '精选']" 
    @tabClick="tabClick" v-show="isTapFixed">
    </tab-control>
    <!-- 不加: 就是字符串类型   加了就根据类型判断 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore" >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control ref="tabControl2" 
          :titles="['流行', '新款', '精选']" 
          @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar  from 'components/common/navbar/NavBar'
import Scroll  from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'



import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/util'

import {backTopMixin} from 'common/mixin'

export default {
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
  

    HomeSwiper,
    RecommendView,
    FeatureView,
    
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      
      tabOffsetTop: 0,
      isTapFixed: false,
      saveY: 0
    }
  },
  computed :{
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    
  },
  mounted() {
    // 2. 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    //  监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemImageLoad', () => {
      // console.log('+++++');
      // this.$refs.scroll.refresh();
      refresh();
    })

  },
  updated() {
    // 获取tabControl的offsetTop
    // 所有组件都有$el：用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)
    // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
  },
  activated() {
    // console.log(this.saveY)
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log('de' + this.saveY)
  },
  methods: {
    /**
     * 事件监听相关的
     */
    tabClick(index) {
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      // console.log(this.$refs.tabControl1)
      this.$refs.tabControl2.currentIndex = index;
      // console.log(this.$refs.tabControl2)
    },
 
    contentScroll(position) {
      // console.log(position);
      // 判断BackTop是否显示
      this.listenBackTop(position)

      // 决定tabControl是否吸顶(position: fixed)？ 是否显示
      this.isTapFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有$el：用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop)
    },
    /**
     * 网络请求相关的
     */
    getHomeMultidata() {
      getHomeMultidata() 
      .then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
      .then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
      });
      
      // 完成上拉加载成功
      // if (this.goods[type].page > 2)
        this.$refs.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  /* .fixed{
    position: fixed;
    top: 44px;
    right: 0;
    left: 0;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
  
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>