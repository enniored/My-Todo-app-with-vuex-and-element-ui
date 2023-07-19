<template>
  <div id="Todo-table">
    <el-table
      :data="$store.getters.datas"
      :row-key="(record) => record.id"
      @select="dataHandler"
      v-model="checkedAll"
      @select-all="chose()"
      size="medium"
      :style="
        !$store.state.showSelectors ? 'padding-left: 10px; font-size: 16px' : ''
      "
      height="410"
      :row-class-name="tableRowClassName"
      @cell-dblclick="finished"
      class="no-select"
      :empty-text="(now === ' Todo' ? 'All tasks completed' : 'Tasks still pending.')"
    >
      <el-table-column
        type="selection"
        prop="choose"
        align="center"
        v-if="$store.state.showSelectors"
      ></el-table-column>
      <el-table-column prop="text" width="inherit" align="left">
        <template slot="header">
          <span
            type="text"
            v-for="(item, index) in $store.state.title"
            :key="index"
            :ref="item"
            @click="sifter(item)"
            class="sifters"
            >{{ " " + item }}</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style></style>
<script>
export default {
  name: "Todo-table",
  data() {
    return {
      now: "All",
      checkedAll: false,
    };
  },

  methods: {
    tableRowClassName({ row }) {
      if (row.isFinish && row.selected) {
        return "selected done";
      } else if (row.selected) {
        return "selected";
      } else if (row.isFinish) {
        return "done";
      }
      return "";
    },
    chose() {
      this.$store.commit("updated", {
        length: !this.checkedAll ? this.$store.state.data.length : 0,
      });
      this.checkedAll = !this.checkedAll;
    },
    dataHandler(val) {
      this.$store.commit("updated", val);
    },
    finished(row) {
      this.$store.commit("done", row);
    },
    sifter(item) {
      this.now =item
      this.$store.commit("siftPage", item);
      document
        .querySelectorAll(".sifters")
        .forEach((value) => (value.style.color = "#909399"));
      this.$refs[item][0].style.color = "#303133";
    },
  },
};
</script>
<style lang="less">
.sifters {
  color: #909399;
  font-size: 13.5px;
  font-weight: bold;
  margin-right: 7px;
}

.sifters:first-child {
  color: #303133;
}
.el-table__empty-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
  margin-left: -13px;
}

.el-table .selected {
  background: oldlace;
}

.el-table .done {
  text-decoration: line-through;
}

.no-select {
  user-select: none;
}
</style>
