<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Test Schedule:</p>
        <div v-for="(parameter) in parameters">
          <p>{{ parameter.parameter }}</p>
          <p>Every {{ parameter.frequency }} days</p>
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
        <p>Test Schedule:</p>
        <div v-for="(updatedParameter) in updatedParameters">
          <p>{{ updatedParameter.parameter }}</p>
          <input v-model.number="updatedParameter.frequency"/>
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
  name: 'TestSchedule',
  props: {
    index: { required: true },
    parameters: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateTestSchedule', { index: this.index, parameters: this.updatedParameters });
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