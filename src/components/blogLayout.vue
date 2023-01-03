<template>
  <div class="main-container">
    <el-scrollbar
      @scroll="scro1lChange"
      view-style="transition: all ease 0.3s;"
    >
      <el-backtop
        :right="100"
        :bottom="100"
        target=".main-container .el-scrollbar__wrap"
      >
        <div class="backtop">
          <el-icon><ArrowUpBold /></el-icon>
        </div>
      </el-backtop>
      <div class="blog-header" ref="headerBarRef">
        <div class="blog-header-container">
          <div>
            <img src="/title.ico" />
          </div>
          <div>
            {{ userInfo.user_name }}的博客
          </div>
          <div>
            全部博客
          </div>
          <div>
            工作台
          </div>
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
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const headerBarRef = ref<HTMLElement>(null);
const asideTitleRef = ref<HTMLElement>(null);
const asideInfoRef = ref<HTMLElement>(null);
const scrollStyle = {
  defaultTop: "0",
  defaultMarginTop: ["-20px", "0"],
  defaultMarginBottom: "15px",
  defaultBackdropFilter: "blur(1px)",
  top: "-54px",
  backdropFilter: "blur(16px)",
  backgroundColor: (scrollTop) => {
    return "rgba(94,114,228," + scrollTop * 0.0013 + ")";
  },
  infoMarginTop: (scrollTop) => {
    return scrollTop - 484 + "px";
  },
  titleMarginTop: "-182px",
  marginBottom: "115px",
};
const scro1lChange = (e) => {
  let scrollTop = e.scrollTop;
  let headerStyle = headerBarRef.value.style;
  let asideTitleStyle = asideTitleRef.value.style;
  let asideInfoStyle = asideInfoRef.value.style;
  headerStyle.backdropFilter = scrollStyle.backdropFilter;
  headerStyle.backgroundColor = scrollStyle.backgroundColor(scrollTop);
  asideTitleStyle.marginTop = scrollStyle.defaultMarginTop[0];
  asideTitleStyle.marginBottom = scrollStyle.defaultMarginBottom;
  if (scrollTop === 533 || scrollTop === 385) {
    asideTitleStyle.marginTop = scrollStyle.titleMarginTop;
    asideTitleStyle.marginBottom = scrollStyle.marginBottom;
  } else if (scrollTop > 236 && scrollTop < 448) {
    headerStyle.top = scrollStyle.defaultTop;
  } else if (scrollTop > 447 && scrollTop < 499) {
    asideTitleStyle.marginBottom = scrollStyle.defaultMarginBottom;
    asideInfoStyle.marginTop = scrollStyle.defaultMarginTop[1];
  } else if (scrollTop > 498) {
    headerStyle.top = scrollStyle.top;
    asideInfoStyle.marginTop = scrollStyle.infoMarginTop(scrollTop);
  } else if (scrollTop === 0) {
    headerStyle.backdropFilter = scrollStyle.defaultBackdropFilter;
  } else {
    headerStyle.top = scrollStyle.defaultTop;
  }
};
</script>

<style lang="scss">
@use "@/styles/blog/blog.scss";
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1500px) {
  ::v-deep(.el-backtop) {
    left: 100px;
    right: 0;
    transition: all ease 0.3s;
  }
}
@media screen and (max-width: 900px) {
  ::v-deep(.el-backtop) {
    display: none;
    transition: all ease 0.3s;
  }
}
.backtop {
  height: 40px;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
