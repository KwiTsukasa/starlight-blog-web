<template>
  <el-form
    class="login-form"
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    @keyup.enter="submitForm(loginFormRef)"
  >
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        :prefix-icon="Lock"
        type="password"
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-submit" @click="submitForm(loginFormRef)">
        登&nbsp;录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { User, Lock } from '@element-plus/icons-vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { getLogin } from '@/apis/login';
  import { router } from '@/router';
  import { useUserStore } from '@/store';

  const loginFormRef = ref<FormInstance>();
  const loginForm = ref<LoginForm>({
    username: '',
    password: '',
  });
  const loginRules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  const userStore = useUserStore();
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const res = await getLogin(loginForm.value);
        console.log(res);
        ElMessage({
          message: res?.message,
          type: 'success',
        });
        res.data.expires_time = new Date().getTime() / 1000 + res.data.expires_time;
        userStore.setUserInfo(res.data);
        router.push('/home/all-blog');
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>

<style scoped lang="scss">
  .login-form {
    height: 285px;
    ::v-deep(.el-input) {
      height: 37px;
      .el-input-group__append {
        padding: 0;
        padding-right: 1.5px;
      }
    }
  }
</style>
