<script setup>
import EditItemButton from '../buttons/ToggleEditCancel.vue'
</script>

<template>
  <div class="tank-property">
    <slot/>
    <EditItemButton
      @onToggleEdit="toggleEdit"
      :editActive="editActive"
    />
  </div>
</template>

<script>
export default {
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    }
  },
  data() {
    return {
      editActive: false
    }
  }
}
</script>

<style>
.tank-property button {
  margin-top: .4em;
}
</style>