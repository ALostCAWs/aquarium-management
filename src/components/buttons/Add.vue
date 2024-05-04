<template>
  <button type="button" class="add-item" @click="add">Add</button>
</template>

<script>
export default {
  name: 'Add',
  methods: {
    add() {
      this.$emit('onAdd');
    }
  }
}
</script>

<style>
.add-item {
  margin-left: auto;
}
</style>