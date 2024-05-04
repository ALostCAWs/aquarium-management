<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import { temperatureUnit } from '../../../constants/unit';
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
      <div class="property-input-container">
        <p>Temperature:</p>
        <input v-model.number="updatedTemperature"/>
        <select v-model="updatedUnit">
          <option></option>
          <option v-for="unit in temperatureUnit" :value="unit">{{ unit }}</option>
        </select>
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
      this.$emit('onUpdateTemperature', { index: this.index, temperature: this.updatedTemperature, unit: updatedUnit });
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