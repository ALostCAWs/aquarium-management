<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property">
    <div v-show="!editActive">
      <div>
        <p>Cycled:</p>
        <p>{{ cycled }}</p>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
        @onToggleEdit="toggleEdit"
        :editActive="editActive"
      />
      </div>
    </div>
    <div v-show="editActive">
      <div class="property-input-container">
        <p>Cycled:</p>
        <input v-model="updatedCycle"/>
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
  name: 'Cycle',
  props: {
    index: { required: true },
    cycled: { required: true }
  },
  comments: {
    ToggleEditCancel,
    Update
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateCycle', { index: this.index, cycled: this.updatedCycle });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedCycle: structuredClone(this.cycled)
    }
  }
}
</script>