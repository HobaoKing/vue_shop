<!--
 * @Author: your name
 * @Date: 2020-12-07 17:47:12
 * @LastEditTime: 2020-12-16 16:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue_shop/src/components/Login.vue
-->

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        ref="loginFormRef"
        class="from_box"
        :model="loginFormModel"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginFormModel.username"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginFormModel.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns-box">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormModel: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 重置
    resetClick() {
      this.$refs.loginFormRef.resetFields();
    },
    loginClick() {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(`验证结果: ${valid}`);
        if (!valid) return;
        const resp= await this.$http.post('login', this.loginFormModel); 
        console.log(resp.data);
        if (resp.data.meta.status !== 200) {
          //  console.log(resp.data.meta.msg);
           this.$message.error(resp.data.meta.msg);
           return;
        }
        this.$message.success(resp.data.meta.msg);
        // 登录成功，保存token 页面跳转
        window.sessionStorage.setItem('token', resp.data.data.token);
        this.$router.push('/home')
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    position: absolute;
    padding: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .from_box {
    display: flex;
    justify-content: flex-end;
    flex-flow: column;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    .btns-box {
      display: flex;
      justify-content: flex-end;
      padding-right: 15px;
      box-sizing: border-box;
    }
  }
}
</style>
