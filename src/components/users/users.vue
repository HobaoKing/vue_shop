<!--
 * @Author: your name
 * @Date: 2020-12-25 18:40:56
 * @LastEditTime: 2020-12-28 18:23:03
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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable=""
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addUserClick">添加用户</el-button>
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditDialog"
            ></el-button>
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

    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="35%"
      @close="addUserClose"
    >
      <el-form
        :model="addFrom"
        :rules="addFromRules"
        ref="addFromRef"
        label-width="70px"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="addFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="addFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="addFrom.mobile" maxlength="11"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserAndNet">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户弹框 -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="35%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的邮箱'))
    }
    // 验证手机号
    var checkMoble = (rule, value, callback) => {
      const regPhone = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的手机号'))
    }

    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      usersList: [],
      total: 0,
      addDialogVisible: false,
      // 添加用户的表单数据
      addFrom: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加用户的表单验证
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMoble, trigger: 'blur' },
        ],
      },
      // 修改用户弹框
      editDialogVisible: false,
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    //  获取所有管理员列表请求
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

    // 分页控件 当前页Size改变
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUsersList()
    },
    //  分页控件当前页码改变
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUsersList()
    },
    //  修改用户管理员状态
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
    // 添加用户按钮，弹出对话框
    addUserClick() {
      this.addDialogVisible = true
    },
    //添加用户对话框关闭
    addUserClose() {
      this.$refs.addFromRef.resetFields()
    },
    // 添加用户
    addUserAndNet() {
      this.$refs.addFromRef.validate(async (validate) => {
        if (validate) {
          const { data: resq } = await this.$http.post('users', this.addFrom)
          if (resq.meta.status !== 201) {
            return this.$message({
              message: resq.meta.msg,
              type: 'error',
              showClose: true,
              duration: 3000,
            })
          }
          this.$message.success('添加成功')
          this.addDialogVisible = false
          this.getUsersList()
        }
      })
    },

    // 弹出修改用户
    showEditDialog() {
      this.editDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped></style>
