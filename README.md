## 技术总览

`vite`、`vue3`、`ts`、`pinia`、`Element+`、`sass`、`node.js`

## 主题样式

默认主题系统根据全局`:root`内`--R`、`--G`、`--B`、`--H`、`--S`、`--L`变量自动计算`rgb`、`hsl`色彩模式生成`light`、`dark`两套主题

默认字体分别为`Comfortaa`、`Helvetica Neue`两套字体并实现动态切换

自定义默认主题可修改路径`@/src/styles/var.scss`文件内`--R`、`--G`、`--B`、`--H`、`--S`、`--L`，以及`@/store/modules/theme.ts`文件内`themeColor`等变量自定义配色

自定义默认字体配置`@/src/styles/var.scss`内`@font-face`内`src`字体路径以及`@/layout/blogLayout.vue`文件内`changeFont`方法内条件以及变量,可自行添加动态切换字体数量

动态主题：用户可在使用过程中调整`el-popover`内配置项动态修改主题色以及字体,通过`pinia`实现持久化储存

## npm脚本

- `dev:` 本地运行项目
- `build:` 打包项目
- `preview:` 本地运行项目


