<template>
  <el-form
    class="login-form"
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.user_name"
        :prefix-icon="User"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.user_psd"
        :prefix-icon="Lock"
        type="password"
        show-password
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        v-model="loginForm.code"
        :prefix-icon="Pointer"
        placeholder="请输入验证码"
      >
        <template #append>
          <img :src="codeImg" @click="changeCode" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="login-submit"
        @click="submitForm(loginFormRef)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Pointer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { getLogin } from "@/apis/login";
import { getUserInfo } from "@/apis/user";
import { router } from "@/router";
import { useUserStore } from "@/store";

const codeImg = ref<string>("/api/user/authcode?rand=" + Math.random());
const changeCode = () => {
  codeImg.value = "/api/user/authcode?rand=" + Math.random();
};

const loginFormRef = ref<FormInstance>();
const loginForm = ref<LoginForm>({
  user_name: "",
  user_psd: "",
  code: "",
});
const loginRules: FormRules = {
  user_name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  user_psd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const userStore = useUserStore();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getLogin(loginForm.value).then((res) => {
        if (res.data) {
          ElMessage({
            message: res.msg,
            type: "success",
          });
          userStore.setUserInfo(res.data);
          userStore.setLoginState(true);
          router.push("/home/allBlog");
        } else {
          ElMessage({
            message: res.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.login-form {
  height: 285px;
  ::v-deep(.el-icon) {
    color: #333;
  }
  ::v-deep(.el-input) {
    height: 37px;
    .el-input-group__append {
      padding: 0;
    }
  }
}
</style>
