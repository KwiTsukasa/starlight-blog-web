<template>
  <div class="left-container">
    <el-icon
      :size="21"
      color="#fff"
      @click="emits('update:drawerVisible', true)"
      ><Expand
    /></el-icon>
  </div>
  <div class="center-container">
    <div class="home-img">
      <el-dropdown>
        <el-button link>
          <img src="/title.ico" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button link @click="userStore.setUserLogout">登出账号</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="home-title">
      <el-button link @click="changeRouter('myBlog')"
        >{{ name }}的博客</el-button
      >
    </div>
    <div class="all-blog">
      <el-button link @click="changeRouter('homeIndex')">全部博客</el-button>
    </div>
    <div class="workspace">
      <el-button link>工作台</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useUserStore } from "@/store";
type Props = {
  drawerVisible: boolean;
  name: string;
};

const userStore = useUserStore();
const props = defineProps<Props>();
const { drawerVisible, name } = toRefs(props);

const emits = defineEmits(["update:drawerVisible", "update:name"]);

const changeRouter = (routerPath: string) => {
  router.push({ name: routerPath });
};
</script>
