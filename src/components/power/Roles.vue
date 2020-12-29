<!--
 * @Author: your name
 * @Date: 2020-12-29 17:27:55
 * @LastEditTime: 2020-12-29 18:02:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/components/power/Roles.vue
-->

<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="rulesList" border stripe>
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">
              编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini">
              删除
            </el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rulesList: [],
    }
  },
  created() {
    this.getRulesList()
  },
  methods: {
    async getRulesList() {
      const { data: resq } = await this.$http.get('roles')
      if (resq.meta.status !== 200) {
        return this.$message.error(resq.meta.msg)
      }
      this.rulesList = resq.data
      console.log(this.rulesList)
    },
  },
}
</script>

<style lang="stylus" scoped></style>