<template>
  <button type="button" class="delete-item" @click="deleteSelectedItems">Delete</button>
</template>

<script>
export default {
  props: {
    deleteSelectedItems: { required: true }
  },
  data() {
    return {
      isDone: this.done
    }
  }
}
</script>

<style>
.delete-item {
  margin-left: auto;
}
</style>