<template>
  <div>
    <el-skeleton v-if="$store.state.isLoading" :rows="6" animated />
    <el-empty v-else-if="true" :image-size="150" description="No more to-do tasks~">
      <el-button type="text" @click="show('write')" style="padding: 10px">Add</el-button>
    </el-empty>
  </div>
</template>
<script>
export default {
  name: "Todo-empty",
  methods: {
    show(type) {
      this.$store.commit("changeVis", type);
    }
  }
};
</script>