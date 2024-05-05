import { sortGeneraArray } from '../functions/sortData'

export let LIVESTOCK_GENERA = [];
export const LIVESTOCK_SPECIES = new Map();
export let PLANT_GENERA = [];
export const PLANT_SPECIES = new Map();

async function getAllGenera(inhabitantType) {
  try {
    const response = await fetch(`http://localhost:3000/${inhabitantType}/genera`);
    let genera = await response.json();
    genera.sort(sortGeneraArray);
    genera = genera.map(g => g.genus);
    return genera;
  } catch (e) {
    console.error(`failed to get ${inhabitantType} genera`);
    this.failedGetGenera = true;
  }
}

async function getAllInhabitantSpecies(inhabitantType, genus) {
  try {
    const response = await fetch(`http://localhost:3000/${inhabitantType}/${genus}/species`);
    let speciesList = await response.json();
    speciesList.sort(sortGeneraArray);
    speciesList = speciesList.map(s => s.species);
    return speciesList;
  } catch (e) {
    console.error(`failed to get ${inhabitantType} genera`);
    this.failedGetGenera = true;
  }
}

export async function populateInhabitantGenusSpeciesMap() {
  PLANT_GENERA = await getAllGenera(`plants`);

  for (const genus of PLANT_GENERA) {
    const speciesList = await getAllInhabitantSpecies(`plants`, genus);
    PLANT_SPECIES.set(genus, speciesList);
  }

  LIVESTOCK_GENERA = await getAllGenera(`plants`);

  for (const genus of LIVESTOCK_GENERA) {
    const speciesList = await getAllInhabitantSpecies(`plants`, genus);
    LIVESTOCK_SPECIES.set(genus, speciesList);
  }
}

export default { livestockSpecies: LIVESTOCK_SPECIES, plantSpecies: PLANT_SPECIES, populateInhabitantGenusSpeciesMap };