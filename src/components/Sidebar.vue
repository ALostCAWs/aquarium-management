<script setup>
import SidebarList from './SidebarList.vue'
</script>

<template>
  <section>
    <h2>{{ title }}</h2>
    <button :class="{expanded: detailsActive}" aria-expanded="detailsActive" aria-controls="vallisneria-species" @click="toggleDetails">
      <h3>Vallisneria</h3>
    </button>
    <div id="vallisneria-species" v-if="detailsActive">
      <SidebarList
        :genus="'vallisneria'"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: { required: true }
  },
  methods: {
    toggleDetails() {
      this.detailsActive = !this.detailsActive;
    }
  },
  data() {
    return {
      detailsActive: false
    };
  }
}
</script>

<style scoped>
h2:first-child {
  padding: 1.1em 1em;
  /* padding-top: 1.1em; */
}

aside button {
  width: 100%;
  padding: 0.50em 0;
  padding-left: 0.75em;
  border-left: none;
  border-right: none;
  text-align: left;
}

aside button.expanded {
  border-bottom: none;
}
</style>