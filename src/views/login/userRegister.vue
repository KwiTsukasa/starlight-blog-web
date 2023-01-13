<template>
  <el-form
    class="register-form"
    ref="registerFormRef"
    :model="registerForm"
    :rules="registerRules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="registerForm.username"
        :prefix-icon="User"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="useremail">
      <el-input
        v-model="registerForm.useremail"
        :prefix-icon="Message"
        placeholder="请输入邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="registerForm.password"
        :prefix-icon="Lock"
        type="password"
        show-password
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        v-model="registerForm.code"
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
        @click="submitForm(registerFormRef)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Pointer, Message } from "@element-plus/icons-vue";
import { ElMessage,ElForm,ElFormItem,ElInput,ElButton } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { getRegister } from "@/apis/login";

const codeImg = ref<string>("/api/user/authcode?rand=" + Math.random());
const changeCode = () => {
  codeImg.value = "/api/user/authcode?rand=" + Math.random();
};

const registerFormRef = ref<FormInstance>();
const registerForm = ref<RegisterForm>({
  username: "",
  useremail: "",
  password: "",
  code: "",
});
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExp = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if (regExp.test(value)) {
    callback();
  }
  callback(new Error("请输入正确的邮箱地址"));
};
const registerRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  useremail: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getRegister(registerForm.value).then((res: number) => {
        console.log(res);
        if (res > 0) {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
        } else {
          ElMessage({
            message: res
              ? res === -1
                ? "验证码错误"
                : "注册失败"
              : "用户名已存在",
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
.register-form {
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
