# supermall

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1. 划分目录结构
2. css文件的引入和定义初始css
3. 配置别名和代码风格 vue.config.js  .editorconfig
4. 项目的模块划分：tabber -> 路由映射关系
    - 连点俩下tabber会提交重复路由  会报错(vue-router3.1以上有的坑)
      1. 重写规则
      2. 降级到vue-router3.1以下
5. 首页导航栏的封装
6. 请求首页的多个数据
7. 轮播图展示
    - 轮播图不生效
      原因是循环还没有完的时候swiper组件运行冲突出错导致的
      在swiper组件上加 v-if="banners.length > 1"
8. 推荐信息的展示
9. FeatureView的封装
10. TabControl的封装
11. 保存商品商品的数据结构设计
     goods: {
       'pop': {page: 5, list [150]},
       'news': {page: 3, list [90]},
       'sell': {page: 1, list [30]},
     }
12. 首页数据的请求保存
13. 首页数据的展示
14. TabControl点击切换商品
15. BScroll封装(better-scroll第三方库)
      - ref
        ref绑定在组件中，那么this.$refs.refname 获取是一个组件对象
        ref绑定在普通元素中，那么this.$refs.refname 获取是一个元素对象
      - scroped
        设置css作用域
16. BackTop的封装
     .native  我们需要监听原生组件的时候
17. BackTop的显示和隐藏
18. 滚动区域的bug
      - better-scroll中是根据scrollHeight属性决定有多少区域可以滚动
        scrollHeight属性根据放在better-scroll中的子组件高度决定的
        我们首页中刚计算scrollHeight属性时，没有将图片计算在内，后来图片加载了有新的高度，
        但是scrollHeight属性没有更新，所以滚动出问题了
      解决？
        监听每一张图片加载完成了执行一次refresh()
      如何监听？
        原生js：img.onload = function() {}
        vue中: @load='方法'
      如何调用scrole.refresh()?(如何将GoodListItem.vue中的事件传入打Home.vue中？)
        非父子间通信   用事件总线Vue.prototype.$bus = new Vue()  this.$bus.$emit('事件',参数) this.$bus.$on('事件', (参数) => {})
      解决频繁调用   进行防抖操作
19. 完成上拉加载更多
20. tabControl的吸顶效果
      获取tabControl的offsetTop   在updated钩子函数里获取    也可以监听图片加载完成后
      监听滚动，动态改变tabControl的样式
      动态改变tabControl问题？ 
       1. 下面的商品内容，会突然上移
       2. tabControl虽然设置了fixed，但也会随着better-scroll一起滚出去了
      其他方案解决停留问题
        在最上面多复制了一份tabControl组件，将其隐藏，利用它实现停留效果
        当用户滚动到一定位置时，tabControl显示出来
21. 让Home保持原来的状态
      即home不被销毁  keep-alive
      让home中的内容保持原来的位置
        离开时保存位置信息saveY，进来时将位置设置为saveY (回来时最好进行一次刷新)
22. 跳转详情页并携带iid
     用动态路由 还可以用query方式
23. 导航栏的封装
24. 数据请求以及轮播图的展示(轮播图源码有点问题class类名)
25. 商品信息的基本展示
      数据很复杂，使用集合到一起创建类，简化
26. 店铺信息的基本展示
27. 商品详情数据的展示
28. 商品参数信息的展示
29. 商品评论的展示
30. 推荐信息的展示
31. 标题和内容联动效果  
    1. 点击标题，滚动到相应主题
      在detail中监听点击，获取index  获取所有主题的offsetTop
      create不行 没有获取到元素   mounted也不行 数据没有获取  获取数据的回调中也不行  DOM没有渲染完
      updata $nextTick(比updata性能高)   都没有等待到图片加载完成  
      所以放在监听图片加载完成的地方 用防抖操作减少性能消耗
    2. 内容滚动，显示正确内容
       监听滚动 判断滚动位置和offsetTop的大小 来改变currentIndex
32. 底部工具栏
33. BackTop的混入封装
      mixins: [backTopMixin]  属性会混入 方法会加入
      提高代码可维护性 复用性  
34. 将商品添加到购物车
      监听点击事件
      用vuex   来保存数据(看购物车需要哪些数据就保存哪些)
35. 导航栏的实现
      物品个数
      用了mapGetters辅助函数  将store中的getter映射到局部计算属性中
36. 购物车商品列表的展示
      