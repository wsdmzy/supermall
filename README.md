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
    
