<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import Add from '../../buttons/Add.vue';
import X from '../../buttons/X.vue';
import { resultUnit } from '../../../constants/unit';
import { timestampToDate } from '../../../functions/convertData'
import { validateDecimalInput } from '../../../functions/validateInput';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Parameters:</p>
        <div v-for="(parameter, i) in parameters" :key="`parameter-${i}`">
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
    <div v-show="editActive" class="addable-list">
      <div class="property-input-container">
        <p>Parameters:</p>
        <div v-for="(updatedParameter, i) in updatedParameters" :key="`edit-parameter-${i}`">
          <p v-if="i < parameterCount">{{ updatedParameter.parameter }}</p>
          <input v-else v-model="updatedParameter.parameter" :disabled="!updatedParameter.tested"/>
          <input type="checkbox" v-model="updatedParameter.tested" @change="toggleUpdateVisible"/>
          <input v-model.number="updatedParameter.result" :disabled="!updatedParameter.tested"/>
          <select v-model="updatedParameter.result_unit" :disabled="!updatedParameter.tested">
            <option></option>
            <option v-for="(unit, i) in resultUnit" :value="unit" :key="`parameter-unit-${i}`">{{ unit }}</option>
          </select>
          <X
            @onRemove="remove(i)"
          />
        </div>
      </div>
      <Add
        @onAdd="add"
      />
      <div class="property-controls" v-show="!updateVisible">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
      </div>
      <div class="property-controls" v-show="updateVisible">
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
    toggleUpdateVisible() {
      this.updateVisible = this.updatedParameters.some(p => p.tested);
      console.log(this.updateVisible);
    },
    update() {
      for (const parameter of this.updatedParameters) {
        if (!validateDecimalInput(parameter.result)) {
          return;
        }
      }
      this.$emit('onUpdateParameters', { index: this.index, parameters: this.updatedParameters });
      this.toggleEdit();
    },
    add() {
      this.updatedParameters.push({
        parameter: '',
        result: '',
        result_unit: '',
        timestamp: ''
      });
    },
    remove(index) {
      this.updatedParameters.splice(index, 1);
    }
  },
  data() {
    return {
      editActive: false,
      updateVisible: false,
      updatedParameters: structuredClone(this.parameters),
      parameterCount: 0
    }
  },
  created() {
    this.parameterCount = this.updatedParameters.length;
  }
}
</script>