<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" v-show="isShowTab" ref="tab1" class="tab"></tab-control>
    <div class="content">
      <tab-menu :list="list" @selectItem="selectItem" />
      <scroll class="tab-content" 
              @scroll="contentscroll" :probeType="3"
              ref="scroll">
        <tab-content-category :subcategories="showSubcategories"></tab-content-category>
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tab2"></tab-control>
        <content-detail :contentdetail="showContentDetail" ></content-detail>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import ContentDetail from './childComps/ContentDetail'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

import {debounce} from 'common/util'
import {backTopMixin} from 'common/mixin'

export default {
  components: {
    NavBar,
    Scroll,
    
    TabControl,

    TabMenu,
    TabContentCategory,
    ContentDetail
  },
  mixins: [backTopMixin],
  data() {
    return {
      list: [],
      categoryData: {},
      currentIndex: -1,
      // type: 'pop'
      // detail: []
      currentType: 'pop',
      isShowTab: false,
      tabOffsetTop: 0,
      saveY: 0
    }
  },
  computed: {
    showSubcategories() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategoties;
    },
    showContentDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    //请求数据
    this._getCategory()
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })
  },
  activated() {
    // console.log(this.saveY)
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    
  },
  deactivated() {
    // 记录离开的位置
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log('de' + this.saveY)
  },
  updated() {
    // 获取tabControl的offsetTop
    // 所有组件都有$el：用于获取组件中的元素
    // console.log(this.$refs.tab.$el.offsetTop)
    this.tabOffsetTop = this.$refs.tab2.$el.offsetTop;
    // console.log(this.tabOffsetTop)
  },
  methods: {
    /**
     * 请求数据
     */
    _getCategory() {
      getCategory().then(res => {
        // console.log(res)
        // 获取分类数据
        this.list = res.data.category.list
        // 初始化每个类别的字数据
        for(let i = 0; i < this.list.length; i++) {
          this.categoryData[i] = {
            subcategoties: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 请求第一个分类的数据
        this._getSubcategory(0)
      })
    },
    _getSubcategory(index) {
      
      this.currentIndex = index;
      const mailKay = this.list[index].maitKey;
      getSubcategory(mailKay).then(res => {
        // console.log(res);
        this.categoryData[index].subcategoties = res.data;
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 获取请求的miniWallKey
      // console.log(this.list[this.currentIndex].miniWallkey)
      const miniWallKey = this.list[this.currentIndex].miniWallkey;
      
      // 发送请求，传入miniWallKey和type
      getCategoryDetail(miniWallKey, type).then(res => {
        // console.log(res);
        // 将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })

      
    },
    /**
     * 监听事件
     */
    selectItem(index) {
      this._getSubcategory(index);
    },
    tabClick(index) {
      switch (index) {
        case 0: this.currentType = 'pop'; break;
        case 1: this.currentType = 'new'; break;
        case 2: this.currentType = 'sell'; break;  
      }
      this.$refs.tab1.currentIndex = index;
      this.$refs.tab2.currentIndex = index;
    },
    contentscroll(position) {
      // console.log(option)
      // 判断tabcontrol是否显示
      this.isShowTab = -position.y > this.tabOffsetTop

      this.listenBackTop(position);
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-content {
    position: fixed;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 100px;
    right: 0;
  }

  .tab{
    position: fixed;
    top: 44px;
    right: 0;
    left: 100px;

    z-index: 9;
  }
</style>