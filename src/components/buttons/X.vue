<template>
  <button type="button" class="remove-item" @click="remove">X</button>
</template>

<script>
export default {
  name: 'X',
  methods: {
    remove() {
      this.$emit('onRemove');
    }
  }
}
</script>

<style>
.tank-property .remove-item {
  width: 1.75em;
  margin-top: 0.15em;
  margin-left: 0.5em;
}
</style>