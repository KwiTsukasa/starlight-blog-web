<template>
  <div class="work-crud">
    <div class="menu-button">
      <div class="left-button">
        <el-button type="primary" size="small">
          <el-icon size="14">
            <Plus />
          </el-icon>
          &nbsp; 新&nbsp;增
        </el-button>
        <el-button type="danger" size="small">
          <el-icon size="14">
            <Delete />
          </el-icon>
          &nbsp; 删&nbsp;除
        </el-button>
      </div>
      <div class="right-button">
        <el-button class="coll-button" @click="show = !show" size="small">
          高&nbsp;级
          <el-icon class="el-icon--right">
            <ArrowDown v-if="!show" />
            <ArrowUp v-else />
          </el-icon>
        </el-button>
      </div>
    </div>
    <el-collapse-transition>
      <div class="search-table" v-show="show">
        <div style="margin: 16px">test</div>
      </div>
    </el-collapse-transition>
    <el-table
      :data="tableData"
      height="calc(100% - 54px)"
      class="coll-table"
      :class="show ? 'coll-active' : ''"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" label="序号" align="center" />
      <el-table-column
        v-for="(item, key) in tableOption"
        :prop="item.prop"
        :label="item.label"
        :align="item.poisition"
      />
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template #default>
          <el-button link type="primary">
            <el-icon size="14">
              <View />
            </el-icon>
            &nbsp;查&nbsp;看
          </el-button>
          <el-button link type="primary">
            <el-icon size="14">
              <Edit />
            </el-icon>
            &nbsp;编&nbsp;辑
          </el-button>
          <el-button link type="primary">
            <el-icon size="14">
              <Delete />
            </el-icon>
            &nbsp;删&nbsp;除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { View, EditPen, Delete } from "@element-plus/icons-vue";

type TableOption = {
  label: string;
  prop: string;
  poisition?: string;
};

const show = ref<boolean>(false);

const tableOption = ref<Array<TableOption>>([
  {
    label: "标签名称",
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
    label: "文章数",
    prop: "article_count",
    poisition: "center",
  },
]);

const tableData = ref<Array<object>>([]);
</script>

<style scoped lang="scss"></style>
