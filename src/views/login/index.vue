<template>
  <div class="login__wrapper">
    <div class="login__box">
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
  </div>
</template>

<script setup lang="ts">
import userLogin from "./userLogin.vue";
import userRegister from "./userRegister.vue";
const activeName = ref<string>("user");
</script>
<style lang="scss">
@use "@/styles/login.scss";
</style>
<style scoped lang="scss">
.login {
  &__wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-image: url("/login.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__box {
    margin: 0 auto;
    box-shadow: 0 8px 52px 0 rgb(0 0 0 / 14%);
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;

    &-left,
    &-right {
      flex: 1;
      width: 560px;
      height: 500px;
    }

    &-left {
      background-image: url(@/assets/images/login-left.png);
      background-size: 100% 100%;
    }

    &-right {
      display: flex;
      align-items: center;
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
