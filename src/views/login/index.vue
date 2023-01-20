<template>
  <div class="login__box card">
    <div class="login__box-left"></div>
    <div class="login__box-right">
      <div class="login__card">
        <div class="login__card-title">
          <img src="/title.ico" />
          <span>&nbsp;StarLight&nbsp;Blog</span>
        </div>
        <div class="login-type">
          <el-tabs v-model="activeName">
            <el-tab-pane label="密码登陆" name="user"></el-tab-pane>
            <el-tab-pane label="账号注册" name="iphone"></el-tab-pane>
          </el-tabs>
        </div>
        <user-login v-if="activeName === 'user'"></user-login>
        <user-register v-else></user-register>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane } from "element-plus";
import userLogin from "./userLogin.vue";
import userRegister from "./userRegister.vue";
const activeName = ref<string>("user");
</script>
<style lang="scss">
@import "@/styles/login.scss";
</style>
