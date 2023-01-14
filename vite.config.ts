import { UserConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import * as path from "path";

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    optimizeDeps: {
      include: [
        "vue",
        "map-factory",
        "element-plus/es",
        "pinia",
        "axios",
        "vue-request",
        "vue-router",
        "@vueuse/core",
      ],
    },
    plugins: [
      vue(),
      // ...
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver()],
        dts: "auto-imports.d.ts",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    base: "", // 生产环境路径
    resolve: {
      alias: {
        // 配置别名
        "@": path.resolve(__dirname, "src"),
        styles: path.resolve(__dirname, "src/styles"),
        components: path.resolve(__dirname, "src/components"),
        config: path.resolve(__dirname, "src/config"),
        router: path.resolve(__dirname, "src/router"),
        tools: path.resolve(__dirname, "src/tools"),
        views: path.resolve(__dirname, "src/views"),
        plugins: path.resolve(__dirname, "src/plugins"),
        store: path.resolve(__dirname, "src/store"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import"./src/styles/index.scss";',
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: "modules",
      outDir: "dist", // 指定输出路径
      assetsDir: "static", // 指定生成静态资源的存放路径
      minify: "terser", // 混淆器,terser构建后文件体积更小
      sourcemap: false, // 输出.map文件
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      },
    },
    server: {
      // 是否主动唤醒浏览器
      open: true,
      // 占用端口
      port: 5000,
      // 扩展访问端口
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.VITE_PREFIX_API, // 后台接口
          changeOrigin: true, // 是否允许跨域
          // secure: false,                    // 如果是https接口，需要配置这个参数
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
