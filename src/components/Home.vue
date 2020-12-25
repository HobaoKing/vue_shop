<!--
 * @Author: your name
 * @Date: 2020-12-15 14:51:46
 * @LastEditTime: 2020-12-25 18:22:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/components/Home.vue
-->
<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=242773409,2956311969&fm=15&gp=0.jpg" width="50px" height="50px">
                <span>电商管理系统</span>
            </div>
             <el-button plain type="info" @click="logoutClick">退出</el-button> 
        </el-header>

        <!-- 内容区域 -->
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside :width="isMenuCollapse ? '64px' : '200px' ">
                <!-- 左侧菜单栏折叠点击 -->
                <div class="toggle-div" @click="toggleDivClick">|||</div>
                <!-- 左侧菜单 --> 
                <el-menu  background-color="#333744"  text-color="#fff"  active-text-color="#409eff"  unique-opened  
                :collapse-transition="false" :collapse="isMenuCollapse" >
                   <!-- 一级菜单 -->
                   <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
                      <template slot="title">
                          <!-- 图标 -->
                       <i :class="menuIcon[item.id]"></i>
                      <!-- 文字 -->
                      <span>{{item.authName}}</span>
                      </template>    

                       <el-menu-item v-for="menuItem in item.children" :key="menuItem.id" :index="menuItem.id+''">
                       <template slot="title">
                          <!-- 图标 -->
                      <i class="el-icon-menu"></i>
                      <!-- 文字 -->
                      <span>{{menuItem.authName}}</span>
                      </template>    
                     </el-menu-item> 

                   </el-submenu>
                </el-menu>
            </el-aside>

            <el-main>
                Main
            </el-main>
        </el-container>

        
        
    </el-container>
    
</template>

<script>
export default {
    data () {
        return {
            menuList:[],
            menuIcon:{
                '125':'el-icon-platform-eleme',
                '103':'el-icon-s-goods',
                '101':'el-icon-s-help',
                '102':'el-icon-s-platform',
                '145':'el-icon-s-opportunity'
            },
            isMenuCollapse:false
        }
    },
    created () {
        this.getMenuList();
    },
    methods:{
        // 退出登录
        logoutClick(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        // 获取左侧Menu列表集合
        async getMenuList(){
         const {data: resq} = await this.$http.get('menus');
         if (resq.meta.status !== 200) return this.$message.error(resq.meta.msg);
         this.menuList = resq.data;
         console.log(resq);
        },
        // 点击按钮切换菜单的折叠和展开
        toggleDivClick(){
             this.isMenuCollapse = !this.isMenuCollapse;
        }
    },

  
}
</script>


<style lang="less" scoped>
   .home-container{
       height: 100%;
   } 

  .el-header{
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding-left: 10px;
      font-size: 20px;
      
      > div{
          display: flex;
          align-items: center;
          
          span{
              margin-left: 10px;
          }
         }

        img {
         border-radius: 50%;
        }

  }

  .el-aside{
      background-color: #333744;
  }

  .el-main{
      background-color: #eaedf1;
  }
  .toggle-div{
      width: 100%;
      height: 24px;
      background-color: #4a5064 ;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
  }
</style>