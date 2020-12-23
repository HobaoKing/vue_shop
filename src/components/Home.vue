<!--
 * @Author: your name
 * @Date: 2020-12-15 14:51:46
 * @LastEditTime: 2020-12-23 11:36:00
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
            <el-aside width="200px">
               <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff">
                   <!-- 一级菜单 -->
                   <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
                      <template slot="title">
                          <!-- 图标 -->
                       <i class="el-icon-location"></i>
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
                '125':'',
                '103':'',
                '101':'',
                '102':'',
                '125':''
            }
        }
    },
    created () {
        console.log(22222222222222222);
        this.getMenuList();
    },
    methods:{
        logoutClick(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        async getMenuList(){
         const {data: resq} = await this.$http.get('menus');
         if (resq.meta.status !== 200) return this.$message.error(resq.meta.msg);
         this.menuList = resq.data;
         console.log(resq);
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
</style>