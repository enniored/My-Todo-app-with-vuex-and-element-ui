<template>
  <div id="Todo-header" class="clearfix">
    <span
      v-if="$store.state.titleState"
      class="no-select"
      @dblclick="show('write')"
      style="margin-bottom: -5px; line-height: 2em"
    ><slot>Add an todo!</slot></span
    >
    <el-input
      v-else
      v-focus="false"
      ref="write"
      size="small"
      @blur="showBlur()"
      @keydown.enter.native="handle()"
      v-model="matters"
      placeholder="Add an to-do!"

      clearable
      class="todo-input"
    ></el-input>
    <div id="btn">
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        id="add"
        size="mini"
        @click="show('write')"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        id="del"
        size="mini"
        @click="changeSelectors()"
      ></el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Todo-header",
  data() {
    return {
      matters: ""
    };
  },
  methods: {
    show(type) {
      if (this.cc) {
        clearTimeout(this.cc);
      }
      this.$store.commit("changeVis", type);
      this.matters = "";
    },
    showBlur() {
      this.$store.dispatch("blur");
      this.handle()
    },
    handle() {
      if (this.matters) {
        this.$store.commit("submit", this.matters);
        this.$store.commit("siftPage");
        this.matters = "";
      }
    },
    changeSelectors() {
      this.$store.commit("changeSelectors");
    }
  }
};
</script>
<style lang="less">
#Todo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  position: relative;

  .el-input {
    width: 180px;
    margin-top: -3px;
    margin-left: -11px;
    box-sizing: border-box;
    position: absolute;
    top: 4px;
  }

  .todo-input input.el-input__inner {
    border: none;
  }

  #btn {
    position: absolute;
    right: 0;
    top: 1.5px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
