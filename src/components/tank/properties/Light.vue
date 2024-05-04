<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import { validateIntegerInput, validateDecimalInput } from '../../../functions/validateInput';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Light Settings:</p>
        <div>
          <p>Name:</p>
          <p>{{ light_settings.name }}</p>
        </div>
        <div>
          <p>Strength:</p>
          <p>{{ light_settings.strength }}</p>
        </div>
        <div>
          <p>Percentage:</p>
          <p>{{ light_settings.percentage }}</p>
        </div>
        <div>
          <p>Hours on:</p>
          <p>{{ light_settings.hours_on }}</p>
        </div>
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
        <p>Light Settings:</p>
        <div>
          <p>Name:</p>
          <input v-model="updatedLight.name"/>
        </div>
        <div>
          <p>Strength:</p>
          <input v-model="updatedLight.strength"/>
        </div>
        <div>
          <p>Percentage:</p>
          <input v-model.number="updatedLight.percentage"/>
        </div>
        <div>
          <p>Hours on:</p>
          <input v-model.number="updatedLight.hours_on"/>
        </div>
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
  name: 'Light',
  props: {
    index: { required: true },
    light_settings: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      if (!validateDecimalInput(this.updatedLight.hours_on)) {
        return;
      }
      if (!validateIntegerInput(this.updatedLight.percentage)) {
        return;
      }
      this.$emit('onUpdateLight', { index: this.index, light_settings: this.updatedLight });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedLight: structuredClone(this.light_settings)
    }
  }
}
</script>