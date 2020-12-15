/*
 * @Author: your name
 * @Date: 2020-12-07 10:14:01
 * @LastEditTime: 2020-12-15 14:53:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]
const router = new VueRouter({
  routes
})
export default router
