<script setup>
import toTitleCase from '../functions/stringFunctions.js'
</script>

<template>
  <div>
    <button :class="{expanded: expandActive}" :aria-expanded="expandActive" :aria-controls="`${group}-${genus}-species`" @click="toggleDetails">
      <h3>{{ toTitleCase(genus) }}</h3>
    </button>
    <div :id="`${group}-${genus}-species`" v-show="expandActive">
      <div v-if="failedGetSpecies">
        <button>
          <p>No Species Found</p>
        </button>
      </div>
      <div v-else>
        <button v-for="(item, index) in species">
          <p>{{ toTitleCase(item.species) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: { required: true },
    genus: { required: true }
  },
  methods: {
    async toggleDetails() {
      if (!this.speciesLoaded) {
        await this.getAllPlantSpeciesInGenus();
        this.speciesLoaded = this.species.length;
      }
      this.expandActive = !this.expandActive;
    },
    async getAllPlantSpeciesInGenus() {
      try {
        const response = await fetch(`http://localhost:3000/${this.group}/${this.genus}/species`);
        const allSpecies = await response.json();
        console.log(response);
        this.species = allSpecies;
      } catch (e) {
        this.failedGetSpecies = true;
        console.error(e);
      }
    },
  },
  data() {
    return {
      expandActive: false,
      speciesLoaded: false,
      species: [],
      failedGetSpecies: false
    };
  }
}
</script>

<style scoped>
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

button > p {
  padding-left: 1.50em;
  line-height: 1em;
}
</style>