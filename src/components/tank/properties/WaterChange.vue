<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue'
import Update from '../../buttons/Update.vue'
import { timestampToDate } from '../../../functions/convertData'
import { validateDecimalInput } from '../../../functions/validateInput'
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Water Change:</p>
        <div>
          <p>Percentage:</p>
          <p>{{ water_change.percentage }}</p>
        </div>
        <div>
          <p>Water Type:</p>
          <p>{{ water_change.water_type }}</p>
        </div>
        <div>
          <p>Date:</p>
          <p>{{ timestampToDate(water_change.timestamp) }}</p>
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
        <p>Water Change:</p>
        <div>
          <p>Percentage:</p>
          <input :value="updatedWaterChange.percentage"/>
        </div>
        <div>
          <p>Water Type:</p>
          <input v-model="updatedWaterChange.water_type"/>
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
  name: 'WaterChange',
  props: {
    index: { required: true },
    water_change: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      if (!validateDecimalInput(this.updatedWaterChange.percentage)) {
        console.log('e');
        return;
      }
      this.$emit('onUpdateWaterChange', { index: this.index, water_change: this.updatedWaterChange });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedWaterChange: structuredClone(this.water_change)
    }
  }
}
</script>