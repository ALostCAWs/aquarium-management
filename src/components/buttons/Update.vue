<template>
  <button type="button" class="update-item" @click="update">Update</button>
</template>

<script>
export default {
  name: 'Update',
  methods: {
    update() {
      this.$emit('onUpdate');
    }
  }
}
</script>

<style>
.update-item {
  margin-left: auto;
}
</style>