<template>
  <div
    :class="classSetting.themeModel"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();
const { classSetting } = storeToRefs(themeStore);
</script>