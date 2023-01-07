<template>
  <div
    class="header-search"
    :class="topSearchActive ? 'top-search-is-active' : ''"
  >
    <el-input
      class="search-input"
      v-model="topSearch"
      placeholder="搜索什么..."
      size="large"
      @blur="emits('update:topSearchActive', false)"
      @input="emits('update:topSearch')"
    >
      <template #prefix>
        <i class="el-icon" @click="emits('update:topSearchActive', true);">
          <svg
            viewBox="0 0 48 48"
            fill="#fff"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 5c9.389 0 17 7.611 17 17 0 3.549-1.087 6.844-2.947 9.57l6.782 6.782a1 1 0 010 1.414l-1.697 1.698a1 1 0 01-1.414 0l-6.604-6.605A16.934 16.934 0 0122 39c-9.389 0-17-7.611-17-17S12.611 5 22 5zm0 4.2C14.93 9.2 9.2 14.93 9.2 22S14.93 34.8 22 34.8 34.8 29.07 34.8 22 29.07 9.2 22 9.2z"
              fill="#fff"
            />
          </svg>
        </i>
      </template>
    </el-input>
    <i class="el-icon is-visible">
      <svg viewBox="0 0 48 48" fill="#fff">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 5c9.389 0 17 7.611 17 17 0 3.549-1.087 6.844-2.947 9.57l6.782 6.782a1 1 0 010 1.414l-1.697 1.698a1 1 0 01-1.414 0l-6.604-6.605A16.934 16.934 0 0122 39c-9.389 0-17-7.611-17-17S12.611 5 22 5zm0 4.2C14.93 9.2 9.2 14.93 9.2 22S14.93 34.8 22 34.8 34.8 29.07 34.8 22 29.07 9.2 22 9.2z"
          fill="#fff"
        />
      </svg>
    </i>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

type Props = {
  topSearchActive: boolean;
  topSearch: string;
};
const props = defineProps<Props>();
const { topSearch, topSearchActive } = toRefs(props);

const emits = defineEmits(["update:topSearchActive", "update:topSearch"]);
</script>
