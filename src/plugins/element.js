/*
 * @Author: your name
 * @Date: 2020-12-07 19:35:44
 * @LastEditTime: 2020-12-15 14:50:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/plugins/element.js
 */
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.prototype.$message= Message;

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
