<template>
  <div class="main-container">
    <el-scrollbar @scroll="scro1lChange" view-style="transition: all ease 0.3s;">
      <div class="blog-header" ref="headerBarRef"></div>
      <div class="blog-title">Test</div>
      <div class="blog-container">
        <div class="blog-container-aside">
          <div class="blog-container-aside-title" ref="asideTitleRef"></div>
          <div class="blog-container-aside-info" ref="asideInfoRef"></div>
        </div>
        <div class="blog-container-main">
          <div class="blog-container-main-list" v-for="i in 5"></div>
          <div class="blog=container-main-footer"></div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const headerBarRef = ref<HTMLElement>(null);
const asideTitleRef = ref<HTMLElement>(null);
const asideInfoRef = ref<HTMLElement>(null);
const scro1lChange = (e) => {
  headerBarRef.value.style.transition = "all ease 0.3s";
  asideInfoRef.value.style.transition = "all ease 0.3s";
  headerBarRef.value.style.backgroundColor =
    "rgba(0,0,0," + e.scrollTop * 0.0015 + ")";
  headerBarRef.value.style.backdropFilter = "blur(16px)";
  if (e.scrollTop > 298 && e.scrollTop < 448) {
    if (e.scrollTop > 186 && e.scrollTop <= 335) {
      headerBarRef.value.style.top = "0";
      headerBarRef.value.style.backdropFilter = "blur(1px)";
      asideTitleRef.value.style.top = "0";
      asideInfoRef.value.style.top = "265px";
    } else {
      asideTitleRef.value.style.top = "-54px";
      asideInfoRef.value.style.top = 265 + 50 + "px";
    }
  } else if (e.scrollTop > 448) {
    headerBarRef.value.style.top = "-54px";
    asideInfoRef.value.style.top = 265 + (e.scrollTop - 448) + "px";
    asideInfoRef.value.style.transition = "none";
    headerBarRef.value.style.transition = "none";
  } else {
    headerBarRef.value.style.top = "0";
    headerBarRef.value.style.backdropFilter = "blur(1px)";
    asideTitleRef.value.style.top = "0";
    asideInfoRef.value.style.top = "265px";
  }
};
</script>

<style lang="scss">
@use "@/styles/blog/blog.scss";
</style>
