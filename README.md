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
    

