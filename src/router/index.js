import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复路由    重写规则
const [routerPush, routerReplace] = [VueRouter.prototype.push, VueRouter.prototype.replace];
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
};

// 路由懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建router
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    // 动态路由
    path: '/detail/:iid',
    component: Detail
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
}) 


// 3. 导出
export default router