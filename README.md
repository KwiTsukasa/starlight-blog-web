## 技术总览

`vite`、`vue3`、`ts`、`pinia`、`Element-Plus`、`sass`、`node`

## 项目简介

此项目为`starlight=blog`前端,基于`vite`、`vue3`、`ts`、`sass`开发

项目使用UI库: `Element-Plus`

动态主题：用户可在使用过程中调整`el-popover`内配置项动态修改全局主题色以及字体通过`pinia`实现持久化储存

## 主题样式

默认主题系统根据`@/store/modules/theme.ts`文件内`themeColor`主题色变量变量自动计算`rgb`、`hsl`色彩模式生成`light`、`dark`两套主题

默认字体分别为`Comfortaa`、`Helvetica Neue`两套字体并实现动态切换

自定义默认主题可修改路径`@/store/modules/theme.ts`文件内`themeColor`主题色变量系统会自动生成配色

自定义默认字体配置`@/src/styles/var.scss`内`@font-face`内`src`路径以及`@/layout/blogLayout.vue`文件内`changeFont`方法内条件以及变量,可自行添加动态切换字体数量

## 插件

- `pinia-plugin-persistedstate` 实现`pinia`数据持久化

- `unplugin-auto-import` 自动导入常用`API`

- `unplugin-vue-components` 动态注册组件

## npm脚本

- `dev:` 本地运行项目

- `build:` 打包项目

- `preview:` 本地运行项目
