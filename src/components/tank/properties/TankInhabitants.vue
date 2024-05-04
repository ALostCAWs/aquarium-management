<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
import Add from '../../buttons/Add.vue';
import X from '../../buttons/X.vue';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>{{ property }}:</p>
        <p v-for="(inhabitant) in inhabitants">{{ inhabitant.genus }} {{ inhabitant.species }}</p>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
      </div>
    </div>
    <div v-show="editActive" class="addable-list">
      <div class="property-input-container two-textbox">
        <p>{{ property }}:</p>
        <div v-for="(updatedInhabitant, i) in updatedInhabitants">
          <input v-model="updatedInhabitant.genus"/>
          <input v-model="updatedInhabitant.species"/>
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
  name: 'TankInhabitants',
  props: {
    index: { required: true },
    property: { required: true },
    event: { required: true },
    inhabitants: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit(this.event, { index: this.index, inhabitants: this.updatedInhabitants });
      this.toggleEdit();
    },
    add() {
      this.updatedInhabitants.push({
        genus: '',
        species: ''
      });
    },
    remove(index) {
      this.updatedInhabitants.splice(index, 1);
    }
  },
  data() {
    return {
      editActive: false,
      updatedInhabitants: structuredClone(this.inhabitants)
    }
  }
}
</script>

<style scoped>
.list p {
  width: 100%;
}

.list > div > div > p:not(:first-of-type) {
  margin-left: 10%;
}

.property-input-container > div > input:first-of-type {
  width: 45%;
}

div > input:not(:only-of-type) {
  /* width: 50%; */
  margin-top: .025em;
}
</style>