<template>
  <div class="workspace card">
    <el-tabs v-model="activeName" type="border-card" @tab-change="changeRouter">
      <el-tab-pane label="分类" name="group" lazy> </el-tab-pane>
      <el-tab-pane label="文章" name="blog" lazy> </el-tab-pane>
      <el-tab-pane label="标签" name="tag" lazy> </el-tab-pane>
      <el-tab-pane label="评论" name="comment" lazy> </el-tab-pane>
    </el-tabs>
    <router-view v-slot="{ Component }">
      <Transition
        enter-active-class="animate__animated animate__fadeInRightBig"
        leave-active-class="animate__animated animate__fadeOutLeftBig"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";

const activeName = ref<string>("group");

const changeRouter = (name: string) => {
  router.push({ name });
};
</script>

<style scoped lang="scss"></style>
