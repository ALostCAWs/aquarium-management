<script setup>
import ToggleEditCancel from '../buttons/ToggleEditCancel.vue'
import Update from '../buttons/Update.vue'
</script>

<template>
  <div class="tank-property">
    <slot
      :editActive="editActive"
    />
    <div v-show="!editActive" class="property-controls">
      <ToggleEditCancel
        @onToggleEdit="toggleEdit"
        :editActive="editActive"
      />
    </div>
    <div v-show="editActive" class="property-controls">
      <ToggleEditCancel
        @onToggleEdit="toggleEdit"
        :editActive="editActive"
      />
      <Update/>
    </div>
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