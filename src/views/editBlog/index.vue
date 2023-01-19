<template>
  <div class="editor-blog card">
    <div class="go-back">
      <el-icon :size="35" @click="goBack"><ArrowLeftBold /></el-icon>
      <span>go&nbsp;Back</span>
    </div>
    <div class="edit-title">
      <el-input
        v-model="blogForm.title"
        maxlength="10"
        placeholder="请输入标题"
        show-word-limit
        type="text"
      />
    </div>
    <div class="edit">
      <Toolbar
        class="toolbar"
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        class="content"
        v-model="blogForm.content"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </div>
    <div class="edit-tags">
      <el-tag
        v-for="tag in blogForm.tags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      ></el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig, Boot } from "@wangeditor/editor";
import markdownModule from '@wangeditor/plugin-md'
import { router } from "@/router";

Boot.registerModule(markdownModule);

const editorRef = shallowRef();
// 内容 HTML
const blogForm = ref({
  title: "",
  content: "",
  tags: [],
});

// 模拟 ajax 异步获取内容
onMounted(() => {
  console.log();
});

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ["fullScreen","uploadVideo"],
};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleClose = (tag: string) => {
  blogForm.value.tags.splice(blogForm.value.tags.indexOf(tag), 1);
};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  console.log(editorRef.value.getConfig())
};

const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: hidden;
  }
}
</style>
