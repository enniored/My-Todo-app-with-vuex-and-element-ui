<script>
import TodoHeader from "@/components/todo-header.vue";
import TodoEmpty from "@/components/todo-empty.vue";
import TodoTable from "@/components/todo-table.vue";

export default {
  mounted() {
    this.$store.dispatch("loading");
  },
  methods: {},
  components: {
    TodoHeader,
    TodoEmpty,
    TodoTable
  }
};
</script>
<template>
  <div id="app">
    <el-card class="box-card no-select" :id="!$store.state.data.length ? ' ' : 'card' " shadow="hover">
      <div slot="header">
        <el-skeleton v-if="$store.state.isLoading" :rows="1" />
        <TodoHeader v-else>Add an to-do!</TodoHeader>
      </div>
      <TodoEmpty v-if="!$store.state.data.length"></TodoEmpty>
      <TodoTable v-else></TodoTable>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.box-card {
  width: 300px;
  height: 480px;

  #ept {
    margin-top: 20px;
  }
}
.el-card ::v-deep .el-card__header {
  height: 70px;
  padding-top:18px;
  box-sizing: border-box;
}

#card.el-card ::v-deep .el-card__body {
  padding: 0 5px 0;
}

#settings {
  position: absolute;
  font-size: 2em;
  color: white;
  padding-top: 20px;
  padding-right: 20px;
  top: 0;
  right: 0;
}
</style>
