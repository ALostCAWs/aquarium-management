<script setup>
import { Tank } from '../../models/tank';
import TankDetails from './TankDetails.vue';
</script>

<template>
  <div v-if="detailsActive" :id="`tank-${index + 1}`" class="list-tank selected">
    <div>
      <p v-if="tank.name">{{ tank.name }}</p>
      <p v-else>{{ tank.id }}</p>
      <button type="button" class="details" @click="toggleDetails">Close</button>
    </div>
    <div class="tank-details">
      <TankDetails
        :key="`${tank.id}-details`"
        :index="index"
        :tank="tank"
        :products="products"
        v-on="$listeners"
      />
    </div>
    <div class="details-controls">
      <button type="button" class="details" @click="">Delete</button>
    </div>
  </div>
  <div v-else :id="`tank-${tank.id}`" class="list-tank" :class="{ selected: tank.selected }">
    <div>
      <p>{{ tank.id }}</p>
      <button type="button" class="details" @click="toggleDetails">Details</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tank',
  comments: {
    TankDetails
  },
  props: {
    index: { required: true },
    tank: { required: true },
    products: { required: true }
  },
  methods: {
    createTank() {
      Object.setPrototypeOf(Tank.prototype, this.tank);
    },
    select(e) {
      this.$emit('onSelect', { checked: e.target.checked, tank: this.tank });
    },
    toggleDetails() {
      this.detailsActive = !this.detailsActive;
    },
    update() {
      this.$emit('onUpdate', { index: this.index, tank: this.updatedTank });
      this.toggleEdit();
    }
  },
  data() {
    return {
      detailsActive: false,
      updatedTank: this.tank,
    }
  },
  created() {
    this.createTank();
  }
}
</script>

<style scoped>
p {
  margin: auto 0;
  margin-left: 1%;
}
</style>

<style>
.list-tank {
  width: 100%;
  height: 100%;

  margin: 5px 0;
  padding: 15px;

  background-color: var(--main-color);
  border: thin solid var(--light-color);
  border-radius: 10px;
}

.list-tank > div:first-of-type:not(.tank-details):not(.tank) {
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
}

.list-tank:hover,
.selected {
  background-color: var(--accent-color-faded);
  border: thin solid var(--accent-color);
}

.list-tank div:first-of-type input:not(:disabled),
.list-tank div:first-of-type select:not(:disabled) {
  background-color: var(--overlay-color);
}

.list-tank div:first-of-type input:disabled,
.list-tank div:first-of-type select:disabled {
  background-color: var(--main-color-disabled);
  color: var(--font-color-disabled);
}

.list-tank .details {
  margin-left: auto;
}

.details-controls,
.edit-controls {
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  margin-top: 1em;
}
</style>