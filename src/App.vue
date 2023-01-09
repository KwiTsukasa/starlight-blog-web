<template>
  <el-config-provider :locale="zhCn">
    <blog-layout></blog-layout>
  </el-config-provider>
</template>

<script setup lang="ts">
import { router } from "@/router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
window.addEventListener("beforeunload", (e) => {
  console.log(1);
  e.preventDefault();
  e.stopPropagation();
  e.returnValue = "";
  router.replace(router.currentRoute.value.path);
});
</script>

<style lang="scss"></style>
