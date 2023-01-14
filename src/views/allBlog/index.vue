<template>
  <div class="blog-container-main-list card" v-for="i in 10"></div>
</template>

<script setup lang="ts">
import { getAllBlog } from "@/apis/blog";

const getList = () => {
  getAllBlog().then((res) => {
    console.log("成功");
  });
};
getList();
</script>

<style scoped lang="scss"></style>
