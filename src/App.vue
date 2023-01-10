<template>
  <el-config-provider :locale="zhCn">
    <blog-layout></blog-layout>
  </el-config-provider>
</template>

<script setup lang="ts">
import { router } from "@/router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<style lang="scss"></style>
