<script setup>
import TankDetails from './TankDetails.vue';
</script>

<template>
  <div v-if="editActive" :id="`item-${index + 1}`" class="list-item selected">
    <div>
      <input
        type="text"
        :id="`update-item-${index + 1}`"
        v-model="updatedItem"
      >
      <button type="button" class="update" @click="update">Update</button>
      <button type="button" class="edit" @click="toggleEdit">Cancel</button>
    </div>
  </div>
  <div v-else-if="detailsActive" :id="`item-${index + 1}`" class="list-item selected">
    <div class="item-details">
      <TankDetails
        :key="`${item.id}-details`"
        :item="item"
        :index="index"
      />
    </div>
    <div class="details-controls">
      <button type="button" class="edit" @click="toggleEdit">Edit</button>
      <button type="button" class="details" @click="toggleDetails">Close</button>
    </div>
  </div>
  <div v-else :id="`item-${index + 1}`" class="list-item" :class="{ selected: item.selected }">
    <div>
      <input
        type="checkbox"
        :id="`select-item-${index + 1}`"
        v-model="item.selected"
        @click="select"
      >
      <p>{{ item.id }}</p>
      <button type="button" class="details" @click="toggleDetails">Details</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: { required: true },
    item: { required: true }
  },
  methods: {
    select(e) {
      this.$emit('onSelect', { checked: e.target.checked, item: this.item });
    },
    toggleDetails() {
      this.detailsActive = !this.detailsActive;
    },
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    setUpdatedText(text) {
      this.updatedItem = text
    },
    update() {
      this.$emit('onUpdate', { index: this.index, text: this.updatedItem });
      this.toggleEdit();
    }
  },
  data() {
    return {
      detailsActive: false,
      editActive: false,
      updatedItem: this.item.text
    }
  }
}
</script>

<style scoped>
p {
  margin: auto 0;
  margin-left: 1%;
}

.list-item .details {
  margin-left: auto;
}

.edit {
  /* margin-left: auto; */
}

.update {
  /* margin-left: 2.5%; */
}

.details-controls {
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  margin-top: 1em;
}
</style>