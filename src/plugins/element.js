/*
 * @Author: your name
 * @Date: 2020-12-07 19:35:44
 * @LastEditTime: 2020-12-23 10:33:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/plugins/element.js
 */
import Vue from 'vue'
import {Button, 
        Form, 
        FormItem, 
        Input, 
        Message, 
        Container, 
        Header, 
        Aside, 
        Main, 
        Menu, 
        Submenu, 
        MenuItem } from 'element-ui'

Vue.prototype.$message= Message;

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)


