<template>
  <div class="work-crud">
    <div class="search-table">

    </div>
    <el-table :data="tableData" height="calc(100% - 54px)" style="height: 100%">
      <el-table-column
        v-for="(item, key) in tableOption"
        :prop="item.prop"
        :label="item.label"
        :align="item.poisition"
      />
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template #default>
          <el-button link type="primary" size="small">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
type TableOption = {
  label: string;
  prop: string;
  poisition?: string;
};

const tableOption = ref<Array<TableOption>>([
  {
    label: "文章标题",
    prop: "group_name",
    poisition: "center",
  },
  {
    label: "创建时间",
    prop: "create_time",
    poisition: "center",
  },
  {
    label: "创建人",
    prop: "create_name",
    poisition: "center",
  },
  {
    label: "浏览量",
    prop: "view_count",
    poisition: "center",
  },
]);

const tableData = ref<Array<object>>([]);
</script>

<style scoped lang="scss"></style>
