<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property">
    <div v-show="!editActive">
      <div>
        <p>Temperature:</p>
        <p>{{ temperature }}</p>
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
        <p>Temperature:</p>
        <input v-model.number="updatedTemperature"/>
        <input v-model="updatedUnit"/>
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
  name: 'Temperature',
  props: {
    index: { required: true },
    temperature: { required: true },
    unit: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('tnUpdateTemperature', { index: this.index, temperature: this.updatedTemperature, unit: updatedUnit });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedTemperature: this.temperature,
      updatedUnit: this.unit
    }
  }
}
</script>