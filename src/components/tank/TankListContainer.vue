<script setup>
import Tank from './Tank.vue'
</script>

<template>
  <div class="list-item-container">
    <Tank
      v-for="(item, index) in list"
      :key="index"
      :index="index"
      :tank="item"
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
    list: { required: true }
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