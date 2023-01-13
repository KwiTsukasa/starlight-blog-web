<template>
  <div class="editor-blog card">
    <div class="go-back">
      <el-icon :size="30"><ArrowLeftBold /></el-icon>
    </div>
    <div class="edit">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig } from "@wangeditor/editor";

const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref<string>("");

// 模拟 ajax 异步获取内容
onMounted(() => {});

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [],
};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
