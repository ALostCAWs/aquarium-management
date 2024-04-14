<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import { timestampToDate } from '../../../functions/convertData'
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Parameters:</p>
        <div v-for="(parameter) in parameters">
          <p>{{ parameter.parameter }} {{ parameter.result }}{{ parameter.result_unit }}</p>
          <p>{{ timestampToDate(parameter.timestamp) }}</p>
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
      <div>
        <p>Parameters:</p>
        <div v-for="(updatedParameter) in updatedParameters">
          <p>{{ updatedParameter.parameter }}</p>
          <input v-model.number="updatedParameter.result"/>
          <input v-model="updatedParameter.result_unit"/>
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
  name: 'Parameters',
  props: {
    index: { required: true },
    parameters: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateParameters', { index: this.index, parameters: this.updatedParameters });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedParameters: this.parameters
    }
  }
}
</script>