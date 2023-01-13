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
import { ElTabs,ElTabPane} from "element-plus";
import userLogin from "./userLogin.vue";
import userRegister from "./userRegister.vue";
const activeName = ref<string>("user");
</script>
<style lang="scss">
@import "@/styles/login.scss";
</style>
<style scoped lang="scss">
.login {
  &__box {
    width: 100%;
    margin: 0 auto;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;

    &-left {
      position: relative;
      top: 0;
      bottom: 9;
      flex: 1;
      height: 500px;
      z-index: -1;
      filter: blur(0.8px);
      background-image: url("/login.png");
      background-size: cover;
      background-position: center;
      animation: form-left 1s forwards ease-in-out;
    }

    &-right {
      display: flex;
      align-items: center;
      width: 560px;
      background: #fff;
      box-shadow: 0 8px 52px 0 rgb(0 0 0 / 14%);
    }
  }

  &__card {
    width: 406px;
    height: 428px;
    margin: 0 auto;

    &-title {
      margin: 0 0 40px 0;
      font-size: 24px;
      text-align: center;
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      line-height: 31px;

      img {
        width: 31px;
        height: 31px;
      }
    }
  }
}

.copyright {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 5px;
  font-size: 12px;
  text-align: center;
}

.login-type {
  width: 160px;
  height: 54px;
}
.login-type {
  ::v-deep(.el-tabs__nav-wrap::after) {
    display: none;
  }
}
</style>
