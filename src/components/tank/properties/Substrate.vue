<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property">
    <div v-show="!editActive">
      <div>
        <p>Substrate:</p>
        <p>{{ substrate }}</p>
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
        <p>Substrate:</p>
        <input v-model="updatedSubstrate"/>
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
  name: 'Substrate',
  props: {
    index: { required: true },
    substrate: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateSubstrate', { index: this.index, substrate: this.updatedSubstrate });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedSubstrate: this.substrate
    }
  }
}
</script>