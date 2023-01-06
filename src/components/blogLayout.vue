<template>
  <div class="main-container" @scroll="scro1lChange" ref="mainScroll">
    <el-backtop :right="100" :bottom="100" target=".main-container">
      <div class="backtop">
        <el-icon><ArrowUpBold /></el-icon>
      </div>
    </el-backtop>
    <el-popover placement="left" trigger="click">
      <template #reference>
        <el-button class="theme-change">
          <el-icon color="#5e72e4">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 2c1.659 0 3.274.184 4.828.532l2.388 5.42a3 3 0 003.07 1.772l5.88-.64A21.98 21.98 0 0145 17.447l-3.499 4.781a3 3 0 000 3.544L45 30.552a21.98 21.98 0 01-4.834 8.364l-5.88-.64a3 3 0 00-3.07 1.773l-2.388 5.42c-1.554.347-3.17.531-4.828.531-1.659 0-3.275-.184-4.829-.532l-2.387-5.42a3 3 0 00-3.07-1.772l-5.88.64A21.98 21.98 0 013 30.553l3.499-4.781a3 3 0 000-3.544L3 17.448a21.98 21.98 0 014.834-8.364l5.88.64a3 3 0 003.07-1.773l2.387-5.419A22.06 22.06 0 0124 2zm0 14a8 8 0 100 16 8 8 0 000-16z"
              />
            </svg>
          </el-icon>
        </el-button>
      </template>
      <span>1</span>
    </el-popover>
    <div class="blog-header" ref="headerBarRef">
      <div class="blog-header-container">
        <div class="left-container">
          <el-icon :size="21" color="#fff" @click="drawerVisible = true"
            ><Expand
          /></el-icon>
        </div>
        <div class="center-container">
          <div class="home-img">
            <el-button link>
              <img src="/title.ico" />
            </el-button>
          </div>
          <div class="home-title">
            <el-button link>{{ userInfo.user_name }}的博客</el-button>
          </div>
          <div class="all-blog">
            <el-button link>全部博客</el-button>
          </div>
          <div class="workspace">
            <el-button link>工作台</el-button>
          </div>
        </div>
        <div
          class="header-search"
          :class="topSearchActive ? 'top-search-is-active' : ''"
        >
          <el-input
            class="search-input"
            v-model="topSearch"
            placeholder="搜索什么..."
            size="large"
            @blur="topSearchActive = false"
          >
            <template #prefix>
              <i class="el-icon">
                <svg
                  viewBox="0 0 48 48"
                  fill="#fff"
                  @click="topSearchActive = true"
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
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="blog-title">
      <span>{{ userInfo.user_name }}</span>
    </div>
    <div class="blog-container">
      <div class="blog-container-main">
        <div class="blog-container-main-list card" v-for="i in 5"></div>
        <div class="blog=container-main-footer card"></div>
      </div>
      <div class="blog-container-aside">
        <div class="blog-container-aside-title card" ref="asideTitleRef">
          <div class="user-label">
            <div class="label-text">
              <p class="title">{{ userInfo.user_name }}的博客</p>
              <span class="dic">{{ userInfo.user_name }}</span>
            </div>
          </div>
          <div class="search-button"></div>
        </div>
        <div class="blog-container-aside-info card" ref="asideInfoRef"></div>
      </div>
    </div>
  </div>
  <el-drawer
    v-model="drawerVisible"
    :with-header="false"
    direction="ltr"
    class="aisde-drawer"
    :size="280"
  >
    <div class="user-info">
      <div class="user-label">
        <div class="label-text">
          <p class="title">{{ userInfo.user_name }}的博客</p>
          <span class="dic">{{ userInfo.user_name }}</span>
        </div>
      </div>
      <div class="search-button"></div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const headerBarRef = ref<HTMLElement>(null);
const mainScroll = ref<HTMLElement>();
const asideInfoRef = ref<HTMLElement>(null);
const oldScrollTop = ref<number>(0);

const backgroundColor = (scrollTop: number) => {
  let opctiy = scrollTop * 0.0013;
  return "rgba(94,114,228," + (opctiy > 0.58 ? 0.58 : opctiy) + ")";
};

const scro1lChange = (e) => {
  let scrollTop = e.srcElement.scrollTop;
  let headerStyle = headerBarRef.value.style;
  let asideInfoStyle = asideInfoRef.value.style;
  headerStyle.backgroundColor = backgroundColor(scrollTop);
  headerStyle.backdropFilter = "blur(16px)";
  if (scrollTop === 0) {
    headerStyle.backdropFilter = "blur(1px)";
  } else if (oldScrollTop.value > scrollTop) {
    headerStyle.top = "0";
    asideInfoStyle.top = "69px";
  } else if (scrollTop > 600) {
    headerStyle.top = "-54px";
    asideInfoStyle.top = "15px";
  }

  oldScrollTop.value = scrollTop;
};

const topSearch = ref<string>("");
const topSearchActive = ref<boolean>(false);

const drawerVisible = ref<boolean>(false);
</script>

<style lang="scss">
@use "@/styles/blog/blog.scss";
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  ::v-deep(.el-backtop) {
    left: 100px;
    right: 0;
    transition: all ease 0.3s;
  }
  .theme-change {
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
  .theme-change {
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
  color: #5e72e4;
  border-radius: 4px;
  transition: all 0.3s ease;
  i {
    position: relative;
    top: calc((40px - 20px) / 2);
  }
  &:hover {
    background-color: #5e72e4;
    i {
      --color: #fff;
      transition: all 0.15s ease;
    }
  }
}

.theme-change {
  position: fixed;
  bottom: 50px;
  right: 100px;
  height: 40px;
  width: 40px;
  border: 0px;
  z-index: 1000;
  box-shadow: var(--el-box-shadow-lighter);
  transition: all 0.3s ease;
  &:hover {
    background-color: #5e72e4;
    i svg {
      fill: #fff;
      transition: all 0.15s ease;
      path {
        fill: #fff;
        transition: all 0.15s ease;
      }
    }
  }
}

.aisde-drawer {
  width: 280px !important;
  .user-info {
    width: 100%;
    height: 250px;
    background-color: white;
    margin-top: -20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .user-label {
      width: 100%;
      height: 60%;
      padding: 0 20px;
      text-align: left;
      background: linear-gradient(
        150deg,
        #8998eb 15%,
        #5e72e4 70%,
        #5368e2 94%
      );
      .label-text {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        .title {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
