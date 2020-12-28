<!--
 * @Author: your name
 * @Date: 2020-12-25 18:40:56
 * @LastEditTime: 2020-12-28 13:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/components/users/users.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容展示  -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表 -->
      <el-table :data="usersList" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="手机号码"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="onSwitchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" circle></el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="分类角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      usersList: [],
      total: 0,
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    async getUsersList() {
      const { data: resq } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      console.log(resq)
      if (resq.meta.status !== 200)
        return this.$message({
          message: '获取用户列表失败',
          type: 'info',
          showClose: true,
          duration: 3000,
        })
      this.total = resq.data.total
      this.usersList = resq.data.users
    },
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUsersList()
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUsersList()
    },
    async onSwitchChange(userinfo) {
      const { data: resq } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      console.log(resq)
      if (resq.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新状态失败')
      }
      return this.$message({
        message: '更新状态成功',
        type: 'success',
        showClose: true,
        duration: 3000,
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
