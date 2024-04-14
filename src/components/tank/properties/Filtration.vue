<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property">
    <div v-show="!editActive">
      <div>
        <p>Filtration:</p>
        <p>{{ filtration }}</p>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
        @onToggleEdit="toggleEdit"
        :editActive="editActive"
      />
      </div>
    </div>
    <div v-show="editActive">
      <div>
        <p>Filtration:</p>
        <input v-model="updatedFiltration"/>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
        <Update
          @onUpdate="update"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filtration',
  props: {
    index: { required: true },
    filtration: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateFiltration', { index: this.index, filtration: this.updatedFiltration });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedFiltration: this.filtration
    }
  }
}
</script>