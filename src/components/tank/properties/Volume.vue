<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import { validateDecimalInput } from '../../../functions/validateInput';
import { volumeUnit } from '../../../constants/unit';
</script>

<template>
  <div class="tank-property">
    <div v-show="!editActive">
      <div>
        <p>Volume:</p>
        <p>{{ volume }} {{ unit }}</p>
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
        <p>Volume:</p>
        <input v-model.number="updatedVolume"/>
        <select v-model="updatedUnit">
          <option></option>
          <option v-for="(u, i) in volumeUnit" :value="u" :key="`volume-unit-option-${i}`">{{ u }}</option>
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
  name: 'Volume',
  props: {
    index: { required: true },
    volume: { required: true },
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
      if (!validateDecimalInput(this.updatedVolume)) {
        return;
      }
      this.$emit('onUpdateVolume', { index: this.index, volume: this.updatedVolume, unit: this.updatedUnit });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedVolume: structuredClone(this.volume),
      updatedUnit: structuredClone(this.unit)
    }
  }
}
</script>