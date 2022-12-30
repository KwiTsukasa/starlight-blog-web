const config: {
  base_url: {
    base: string;
    dev: string;
    pro: string;
    test: string;
  };
} = {
  base_url: {
    // 开发环境
    base: "http://127.0.0.1:80",

    // 打包开发环境
    dev: "",

    // 打包生产环境
    pro: "",

    // 打包测试环境
    test: "",
  },
};

export { config };
