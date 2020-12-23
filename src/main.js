/*
 * @Author: your name
 * @Date: 2020-12-07 18:36:36
 * @LastEditTime: 2020-12-23 10:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/globas.css'
//
import axios from 'axios'

//配置请求跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token'); 
  return config;
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
