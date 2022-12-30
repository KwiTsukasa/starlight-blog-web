<template>
  <el-form
    class="login-form"
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        :prefix-icon="User"
        placeholder="请输入用户名/手机号/邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
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
import { ref, reactive } from "vue";
import { User, Lock, Pointer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { getLogin } from "@/apis/login";

const codeImg = ref<string>("/api/user/getImage?rand=" + Math.random());
const changeCode = () => {
  codeImg.value = "/api/user/getImage?rand=" + Math.random();
};

const loginFormRef = reactive<FormInstance>(null);
const loginForm = ref<LoginFrom>({
  username: "",
  password: "",
  code: "",
});
const loginRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getLogin(loginForm.value).then((res:number) => {
        console.log(res)
        if (res > 0) {
          ElMessage({
            message: '登录成功',
            type: "success",
          });
        } else {
          ElMessage({
            message: res ? '验证码错误' : '用户名或密码错误',
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
