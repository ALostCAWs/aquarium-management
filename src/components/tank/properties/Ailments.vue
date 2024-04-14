<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue';
import Update from '../../buttons/Update.vue';
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>Ailments:</p>
        <p v-for="(ailment) in ailments">{{ ailment.name }} ({{ ailment.type }})</p>
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
        <p>Ailments:</p>
        <div v-for="(updatedAilment) in updatedAilments">
          <input v-model="updatedAilment.name"/>
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
  name: 'Ailments',
  props: {
    index: { required: true },
    ailments: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateAilments', { index: this.index, ailments: this.updatedAilments });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedAilments: this.inhabitants
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