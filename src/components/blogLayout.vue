<template>
  <div
    :class="classSetting.themeModel + ' ' + classSetting.font"
    @scroll="scro1lChange"
    ref="mainScroll"
  >
    <el-backtop
      :right="50"
      :bottom="150"
      :target="'.' + classSetting.themeModel"
    >
      <div class="flot-box backtop">
        <el-icon><ArrowUpBold /></el-icon>
      </div>
    </el-backtop>
    <el-button class="float-box plus-blog">
      <el-icon color="$primary">
        <svg width="30" height="30" viewBox="0 0 48 48">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.718 4c.446 0 .608.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77V22h16.718c.446 0 .607.046.77.134.163.087.291.215.378.378.088.162.134.324.134.77v1.436c0 .446-.046.608-.134.77a.908.908 0 01-.378.378c-.163.088-.324.134-.77.134H26L26 42.718c0 .446-.046.607-.134.77a.908.908 0 01-.378.378c-.162.088-.324.134-.77.134h-1.436c-.446 0-.608-.046-.77-.134a.908.908 0 01-.378-.378c-.088-.163-.134-.324-.134-.77L21.999 26 5.282 26c-.446 0-.607-.046-.77-.134a.908.908 0 01-.378-.378c-.088-.162-.134-.324-.134-.77v-1.436c0-.446.046-.608.134-.77a.908.908 0 01.378-.378c.163-.088.324-.134.77-.134L22 21.999V5.282c0-.446.046-.607.134-.77a.908.908 0 01.378-.378c.162-.088.324-.134.77-.134h1.436z"
          />
        </svg>
      </el-icon>
    </el-button>
    <el-popover
      placement="left-end"
      :visible="settingVisible"
      width="fit-content"
      :effect="classSetting.themeModel === 'light-container' ? 'light' : 'dark'"
    >
      <template #reference>
        <el-button
          class="float-box theme-change"
          @click="settingVisible = !settingVisible"
        >
          <el-icon color="$primary">
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
      <div class="pop-content">
        <div class="pop-row">
          <div class="pop-label">夜间模式：</div>
          <el-switch
            v-model="classSetting.themeModel"
            active-value="dark-container"
            inactive-value="light-container"
            size="large"
            inline-prompt
            :active-icon="Moon"
            :inactive-icon="Sunny"
            :style="{
              '--el-switch-on-color': '#000',
              '--el-switch-off-color': 'var(--el-color-primary)',
            }"
            @change="changeTheme"
          />
        </div>
        <div class="pop-row">
          <div class="pop-label">字体：</div>
          <el-radio-group
            v-model="classSetting.font"
            :class="
              classSetting.themeModel === 'light-container' ? 'light' : 'dark'
            "
          >
            <el-radio-button label="Comfortaa" />
            <el-radio-button label="Helvetica" />
          </el-radio-group>
        </div>
        <div class="pop-row">
          <div class="pop-label">主题色：</div>
          <el-color-picker
            ref="colorPicker"
            v-model="classSetting.themeColor"
            @active-change="changeThemeColor"
          />
        </div>
      </div>
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
        <top-seacrch-input
          v-model:top-search="topSearch"
          v-model:top-search-active="topSearchActive"
        ></top-seacrch-input>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="blog-title">
      <span :style="{ '--box': oneToNTimer(userInfo.user_name.length) }">
        <span
          v-for="(item, key) in userInfo.user_name"
          :key="key"
          :style="{
            '--deylay': (10 / userInfo.user_name.length) * key * 0.5 + 's',
            '--timer': 10 / userInfo.user_name.length + 's',
          }"
        >
          {{ item }}
        </span>
      </span>
    </div>
    <div class="blog-container">
      <div class="blog-container-main">
        <div class="blog-container-main-list card" v-for="i in 5"></div>
        <div class="blog-container-main-footer card">
          Theme&nbsp;StarLight&nbsp;By&nbsp;TsukasaKawaii
        </div>
      </div>
      <div class="blog-container-aside">
        <div class="blog-container-aside-title card">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useUserStore, useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
import { ColorPickerInstance } from "element-plus";
import topSeacrchInput from "./layout-top/topSeacrchInput.vue";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const headerBarRef = ref<HTMLElement>(null);
const mainScroll = ref<HTMLElement>();
const asideInfoRef = ref<HTMLElement>(null);
const oldScrollTop = ref<number>(0);

const backgroundColor = (scrollTop: number) => {
  const opctiy = scrollTop * 0.0013;
  if (classSetting.value.themeModel === "light-container") {
    return (
      "rgba(var(--R), var(--G), var(--B)," +
      (opctiy > 0.58 ? 0.58 : opctiy) +
      ")"
    );
  } else {
    return (
      "rgba(calc(30 * 0.9 + var(--R) * (1 - 0.9)),calc(30 * 0.9 + var(--G) * (1 - 0.9)),calc(30 * 0.9 + var(--B) * (1 - 0.9))," +
      (opctiy > 0.58 ? 0.58 : opctiy) +
      ")"
    );
  }
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

const oneToNTimer = (n: number) => {
  let sum = 0;
  let timer = 10 / n;
  for (let i = 0; i < n; i++) {
    let delay = (10 / n) * i * 0.5;
    sum = delay + timer;
  }
  return sum + "s";
};

const topSearch = ref<string>("");
const topSearchActive = ref<boolean>(false);
const drawerVisible = ref<boolean>(false);

const settingVisible = ref<boolean>(false);
const colorPicker = ref<ColorPickerInstance>();
const node = document.documentElement;
const pre = "--el-color-primary";
const themeStore = useThemeStore();
const { classSetting } = storeToRefs(themeStore);
const mixWhite = "#ffffff";
const changeTheme = () => {
  if (headerBarRef.value) {
    let headerStyle = headerBarRef.value.style;
    headerStyle.backgroundColor = backgroundColor(oldScrollTop.value);
  }
};

const changeThemeColor = (color) => {
  classSetting.value.themeColor = color;
  const [r, g, b] = hexTorgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  node.style.setProperty("--R", r + "");
  node.style.setProperty("--G", g + "");
  node.style.setProperty("--B", b + "");
  node.style.setProperty("--H", h + "");
  node.style.setProperty("--S", s * 100 + "");
  node.style.setProperty("--L", l * 100 + "");
  node.style.setProperty(pre, color);
  for (let i = 1; i < 10; i += 1) {
    node.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1));
  }
  changeTheme();
};

const hexTorgb = (color) => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  return [r, g, b];
};

const rgbToHsl = (R: number, G: number, B: number) => {
  const r = R / 255;
  const g = G / 255;
  const b = B / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h: number;
  let s: number;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  const l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return [h, s, l];
};

const rgbToHex = (R: number, G: number, B: number) => {
  const r = ("0" + (R || 0).toString(16)).slice(-2);
  const g = ("0" + (G || 0).toString(16)).slice(-2);
  const b = ("0" + (B || 0).toString(16)).slice(-2);
  return [r, g, b];
};

const minColorScale = (
  [R1, G1, B1]: number[],
  [R2, B2, G2]: number[],
  minWeight: number
) => {
  const r = Math.round(R1 * (1 - minWeight) + R2 * minWeight);
  const g = Math.round(G1 * (1 - minWeight) + B2 * minWeight);
  const b = Math.round(B1 * (1 - minWeight) + G2 * minWeight);
  return [r, g, b];
};

const mix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const [r, g, b] = minColorScale(hexTorgb(color1), hexTorgb(color2), weight);
  const [_r, _g, _b] = rgbToHex(r, g, b);
  return "#" + _r + _g + _b;
};

changeThemeColor(classSetting.value.themeColor);

watch(
  () => classSetting.value.themeColor,
  (newVal) => {
    if (newVal === "" || newVal === null || newVal === undefined) {
      themeStore.setDefaultTheme();
      changeThemeColor(classSetting.value.themeColor);
    }
  }
);
</script>

<style lang="scss">
@import "@/styles/blog/blog.scss";

.light {
  * {
    color: $dark;
  }
  border-radius: $theme-border-radius;
  overflow: hidden;
  border: $primary-border;
  background-color: transparent !important;
  .el-radio-button,
  .el-radio-button__inner {
    border: none !important;
    background-color: transparent !important;
  }
  .is-active {
    background-color: $primary !important;
  }
}

.dark {
  * {
    color: $light;
  }
  border-radius: $theme-border-radius;
  overflow: hidden;
  border: $primary-border;
  background-color: transparent !important;
  .el-radio-button,
  .el-radio-button__inner {
    border: none !important;
    background-color: transparent !important;
  }
  .is-active {
    background-color: $primary !important;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (min-width: 1451px) {
  ::v-deep(.el-backtop) {
    right: 50px;
  }
  .theme-change {
    animation: float-right-visible 1s forwards;
  }
  .plus-blog {
    animation: float-right-visible 1s forwards;
  }
  @keyframes float-right-visible {
    0% {
      left: 50px;
      right: 0;
      opacity: 0;
    }
    100% {
      right: 50px;
      opacity: 1;
    }
  }
}
@media screen and (max-width: 1450px) {
  ::v-deep(.el-backtop) {
    left: 50px;
    right: 0;
  }
  .theme-change {
    animation: float-left-visible 1s forwards;
  }
  .plus-blog {
    animation: float-left-visible 1s forwards;
  }
  @keyframes float-left-visible {
    0% {
      right: 50px;
      left: 0;
      opacity: 0;
    }
    100% {
      left: 50px;
      right: 0;
      opacity: 1;
    }
  }
}
@media screen and (max-width: 900px) {
  ::v-deep(.el-backtop) {
    animation: float-hidden 1s forwards;
    animation-iteration-count: 1;
  }
  .theme-change {
    animation: float-hidden 1s forwards;
  }
  .plus-blog {
    animation: float-hidden 1s forwards;
  }
  @keyframes float-hidden {
    0% {
      opacity: 1;
      left: 50px;
    }
    100% {
      opacity: 0;
      left: -50px;
    }
  }
}
.pop-content {
  width: fit-content;
  height: fit-content;
  .pop-row {
    width: fit-content;
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.theme-change {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

.plus-blog {
  position: fixed;
  bottom: 100px;
  right: 50px;
}
</style>
