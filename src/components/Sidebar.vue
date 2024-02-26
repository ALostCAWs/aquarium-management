<script setup>
import SidebarList from './SidebarList.vue'
import toTitleCase from '../functions/stringFunctions.js'
</script>

<template>
  <section>
    <h2>{{ capitalizedGroup }}</h2>
    <SidebarList
      :group="group"
      :genus="'vallisneria'"
    />
    <SidebarList
      :group="group"
      :genus="'vallisneria'"
    />
  </section>
</template>

<script>
export default {
  props: {
    group: { required: true }
  },
  data() {
    return {
      capitalizedGroup: this.group
    };
  },
  created() {
    this.capitalizedGroup = toTitleCase(this.capitalizedGroup);
  }
}
</script>

<style scoped>
h2:first-child {
  padding: 1.1em 1em 0.50em;
}
</style>