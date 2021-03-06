/*
 * @Author: your name
 * @Date: 2020-12-07 19:35:44
 * @LastEditTime: 2020-12-29 17:22:13
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
        MenuItem,
        Card, 
        Breadcrumb, 
        BreadcrumbItem, 
        Row, 
        Col, 
        Table, 
        TableColumn, 
        Switch, 
        Tooltip, 
        Pagination, 
        Dialog,
        Select,
        Option, 
        MessageBox, 
        Tag } from 'element-ui'

Vue.prototype.$message= Message;
Vue.prototype.$confirm = MessageBox.confirm;

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
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)



