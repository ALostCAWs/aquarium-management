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
        <p>Ailments:</p>
        <p v-for="(ailment, i) in ailments" :key="`ailment-${i}`">{{ ailment.name }} ({{ ailment.type }})</p>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
      </div>
    </div>
    <div v-show="editActive">
      <div class="property-input-container two-textbox">
        <p>Ailments:</p>
        <div v-for="(updatedAilment, i) in updatedAilments" :key="`edit-ailment-${i}`">
          <input v-model="updatedAilment.name"/>
          <input v-model="updatedAilment.type"/>
          <!-- <input v-model="updatedAilment.comments"/> -->
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
  name: 'Ailments',
  props: {
    index: { required: true },
    ailments: { required: true }
  },
  comments: {
    ToggleEditCancel,
    Update
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit('onUpdateAilments', { index: this.index, ailments: this.updatedAilments });
      this.toggleEdit();
    },
    add() {
      this.updatedAilments.push({
        name: '',
        type: '',
        comments: ''
      });
    },
    remove(index) {
      this.updatedAilments.splice(index, 1);
    }
  },
  data() {
    return {
      editActive: false,
      updatedAilments: structuredClone(this.ailments)
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
  /* width: 50%; */
  margin-top: .025em;
}
</style>