<script setup>
import Tank from './Tank.vue'
</script>

<template>
  <div class="list-item-container">
    <Tank
      v-for="(tank, i) in tanks"
      :key="i"
      :index="i"
      :tank="tank"
      :products="products"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'TankListContainer',
  components: {
    Tank
  },
  props: {
    tanks: { required: true },
    products: { required: true }
  },
  data() {
    return {
      isDone: this.done
    }
  }
}
</script>

<style>
.list-item-container {
  /* width: 100%; */
  /* height: 100%; */
}
</style>