/*
 * @Author: your name
 * @Date: 2020-12-07 10:14:01
 * @LastEditTime: 2020-12-28 10:08:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/users.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
     path: '/home', component: Home, redirect: '/welcome',
      children: [
        {
          path : '/welcome',
          component: Welcome
        },
        { path: '/users', component: Users }
      ]
   }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('./login');
  next();
} 
);
 
export default router
