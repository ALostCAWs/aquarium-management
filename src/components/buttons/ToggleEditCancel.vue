<template>
  <button type="button" class="edit" @click="toggle">{{ editActive ? 'Cancel' : 'Edit' }}</button>
</template>

<script>
export default {
  name: 'ToggleEditCancel',
  props: {
    editActive: { required: true }
  },
  methods: {
    toggle() {
      this.$emit('onToggleEdit');
    }
  }
}
</script>