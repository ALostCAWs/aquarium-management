<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
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
    <div v-show="editActive">
      <div>
        <p>{{ property }}:</p>
        <div v-for="(updatedInhabitant) in updatedInhabitants">
          <input v-model="updatedInhabitant.genus"/>
          <input v-model="updatedInhabitant.species"/>
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
    }
  },
  data() {
    return {
      editActive: false,
      updatedInhabitants: this.inhabitants
    }
  }
}
</script>

<style scoped>
.list p {
  width: 100%;
}

.list > div > div > p:not(:first-of-type),
.list > div > div > div {
  margin-left: 10%;
}

.list > div > div > div > input:not(:only-of-type) {
  width: 50%;
  margin-top: .025em;
}
</style>