<template>
  <div class="blog-title">
    <span :style="{ '--box': oneToNTimer(name.length) }">
      <span
        v-for="(item, key) in name"
        :key="key"
        :style="{
          '--deylay': (10 / name.length) * key * 0.5 + 's',
          '--timer': 10 / name.length + 's',
        }"
      >
        {{ item }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

const emits = defineEmits(["update:name"]);

const oneToNTimer = (n: number) => {
  let sum = 0;
  let timer = 10 / n;
  for (let i = 0; i < n; i++) {
    let delay = (10 / n) * i * 0.5;
    sum = delay + timer;
  }
  return sum + "s";
};
</script>
