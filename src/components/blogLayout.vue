<template>
  <div class="main-container">
    <el-scrollbar
      @scroll="scro1lChange"
      view-style="transition: all ease 0.3s;"
    >
      <div class="blog-header" ref="headerBarRef">
        <div class="blog-header-container">

        </div>
      </div>
      <div class="blog-title">{{ userInfo.user_name }}的博客</div>
      <div class="blog-container">
        <div class="blog-container-main">
          <div class="blog-container-main-list" v-for="i in 5"></div>
          <div class="blog=container-main-footer"></div>
        </div>
        <div class="blog-container-aside">
          <div class="blog-container-aside-title" ref="asideTitleRef">
            <div class="user-label">
              <div class="label-text">
                <p class="title">{{ userInfo.user_name }}的博客</p>
                <span class="dic">{{ userInfo.user_name }}</span>
              </div>
            </div>
            <div class="search-button"></div>
          </div>
          <div class="blog-container-aside-info" ref="asideInfoRef"></div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const headerBarRef = ref<HTMLElement>(null);
const asideTitleRef = ref<HTMLElement>(null);
const asideInfoRef = ref<HTMLElement>(null);
const scro1lChange = (e) => {
  headerBarRef.value.style.transition = "all ease 0.3s";
  asideInfoRef.value.style.transition = "all ease 0.3s";
  headerBarRef.value.style.backgroundColor =
    "rgba(94,114,228," + e.scrollTop * 0.0012 + ")";
  headerBarRef.value.style.backdropFilter = "blur(16px)";
  if (e.scrollTop > 348 && e.scrollTop < 498) {
    if (e.scrollTop > 236 && e.scrollTop <= 385) {
      headerBarRef.value.style.top = "0";
    } else {
      asideInfoRef.value.style.marginTop = "15px";
    }
  } else if (e.scrollTop > 498) {
    headerBarRef.value.style.top = "-54px";
    asideInfoRef.value.style.marginTop = e.scrollTop - 487 + "px";
    asideInfoRef.value.style.transition = "none";
    headerBarRef.value.style.transition = "none";
  } else {
    headerBarRef.value.style.top = "0";
    headerBarRef.value.style.backdropFilter = "blur(1px)";
  }
};
</script>

<style lang="scss">
@use "@/styles/blog/blog.scss";
</style>
