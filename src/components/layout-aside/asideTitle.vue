<template>
  <div class="blog-container-aside-title card">
    <div class="user-label">
      <div class="label-text">
        <p class="title">{{ name }}的博客</p>
        <span class="dic">{{ name }}</span>
      </div>
    </div>
    <div class="search-button"></div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string;
  visible: boolean;
  value: string;
};
const props = defineProps<Props>();
const { name, value, visible } = toRefs(props);

const emits = defineEmits(["update:visible", "update:value"]);
</script>

<style scoped lang="scss"></style>
