<script setup>
import ListItem from './ListItem.vue'
</script>

<template>
  <div class="list-container">
    <ListItem
      v-for="(item, index) in list"
      :key="index"
      :index="index"
      :item="item"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
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
.list-container {
  width: 100%;
  height: 100%;
}
</style>