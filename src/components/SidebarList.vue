<template>
  <div>
    <p v-for="(item, index) in species">
      {{ item.species }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    genus: { required: true }
  },
  methods: {
    async getAllPlantSpeciesInGenus() {
      try {
        console.log(`http://localhost:3000/plants/${this.genus}/species`);
        const response = await fetch(`http://localhost:3000/plants/${this.genus}/species`);
        const allSpecies = await response.json();
        this.species = allSpecies;
      } catch (e) {
        console.error(e);
      }
    },
  },
  data() {
    return {
      species: []
    };
  },
  async created() {
    await this.getAllPlantSpeciesInGenus();
    console.log(this.species);
  }
}
</script>

<style scoped>
h2:first-child {
  padding-top: 1.1em;
}
</style>