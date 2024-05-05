<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import Add from '../../buttons/Add.vue';
import X from '../../buttons/X.vue';
import { validateIntegerInput } from '../../../functions/validateInput';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Test Schedule:</p>
        <div v-for="(p, i) in parameters" :key="`test-${i}`">
          <p>{{ p.parameter }}</p>
          <p>Every {{ p.frequency }} days</p>
        </div>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
        @onToggleEdit="toggleEdit"
        :editActive="editActive"
      />
      </div>
    </div>
    <div v-show="editActive" class="addable-list">
      <div class="property-input-container">
        <p>Test Schedule:</p>
        <div v-for="(updatedParameter, i) in updatedParameters" :key="`edit-test-${i}`">
          <p v-if="i < parameterCount">{{ updatedParameter.parameter }}</p>
          <input v-else v-model="updatedParameter.parameter"/>
          <input v-model.number="updatedParameter.frequency"/>
          <X
            @onRemove="remove(i)"
          />
        </div>
      </div>
      <Add
        @onAdd="add"
      />
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
  comments: {
    ToggleEditCancel,
    Update,
    Add,
    X
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      for (const parameter of this.updatedParameters) {
        if (!validateIntegerInput(parameter.frequency)) {
          return;
        }
      }
      this.$emit('onUpdateTestSchedule', { index: this.index, parameters: this.updatedParameters });
      this.toggleEdit();
    },
    add() {
      this.updatedParameters.push({
        parameter: '',
        frequency: ''
      });
    },
    remove(index) {
      this.updatedParameters.splice(index, 1);
    }
  },
  data() {
    return {
      editActive: false,
      updatedParameters: structuredClone(this.parameters),
      parameterCount: 0
    }
  },
  created() {
    this.parameterCount = this.updatedParameters.length;
  }
}
</script>