<template>
  <div
    class="blog-container-main-list card"
    v-for="i in 10"
    :key="i"
    :data-test="i"
    :draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart="handleDrag"
    @drop="handleDrop"
    @click="visible = true"
  ></div>
  <div :class="!visible ? 'footer-pop' : 'footer-pop is-active'" @click="visible = false"></div>
</template>

<script setup lang="ts">
  // import { getAllBlog } from '@/apis/blog';

  // const getList = () => {
  //   getAllBlog().then((res) => {
  //     console.log('成功');
  //   });
  // };

  const visible = ref<boolean>(false);

  const handleDrag = (e: Event) => {
    if (e !== null && e.target instanceof HTMLElement) {
      console.log(e.target.dataset, 'onDrag');
    }
  };

  const handleDrop = (e: Event) => {
    if (e !== null && e.target instanceof HTMLElement) {
      console.log(e.target.dataset, 'onDrop');
    }
  };

  // getList();
</script>

<style scoped lang="scss">
  .footer-pop {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transition: bottom 0.3s ease-in-out;
  }

  .is-active {
    bottom: 0;
    transition: bottom 0.3s ease-in-out;
  }
</style>
