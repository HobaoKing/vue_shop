<!--
 * @Author: your name
 * @Date: 2020-12-15 14:51:46
 * @LastEditTime: 2020-12-16 16:23:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/components/Home.vue
-->
<template>
     <div>
         <el-button plain type="info" @click="logoutClick">退出</el-button> 
     </div>
</template>

<script>
export default {
    methods:{
        logoutClick(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>


<style lang="less" scoped>

</style>