<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import { temperatureUnit } from '../../../constants/unit';
import { validateDecimalInput } from '../../../functions/validateInput';
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
          <option v-for="(u, i) in temperatureUnit" :value="u" :key="`temperature-unit-option-${i}`">{{ u }}</option>
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
  comments: {
    ToggleEditCancel,
    Update
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      if (!validateDecimalInput(this.updatedTemperature)) {
        return;
      }
      this.$emit('onUpdateTemperature', { index: this.index, temperature: this.updatedTemperature, unit: this.updatedUnit });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedTemperature: structuredClone(this.temperature),
      updatedUnit: structuredClone(this.unit)
    }
  }
}
</script>