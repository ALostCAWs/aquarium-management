<template>
  <button type="button" class="toggle-modal" @click="toggle">Add</button>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$emit('onToggle');
    }
  }
}
</script>