<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
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
          <option v-for="unit in volumeUnit" :value="unit">{{ unit }}</option>
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
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateVolume', { index: this.index, volume: this.updatedVolume, unit: this.updatedUnit });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedVolume: this.volume,
      updatedUnit: this.unit
    }
  }
}
</script>