import { sortGeneraArray } from '../functions/sortData'

export let livestockGenera = [];
export const livestockSpecies = new Map();
export let plantGenera = [];
export const plantSpecies = new Map();

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
  plantGenera = await getAllGenera(`plants`);

  for (const genus of plantGenera) {
    const speciesList = await getAllInhabitantSpecies(`plants`, genus);
    plantSpecies.set(genus, speciesList);
  }

  livestockGenera = await getAllGenera(`plants`);

  for (const genus of livestockGenera) {
    const speciesList = await getAllInhabitantSpecies(`plants`, genus);
    livestockSpecies.set(genus, speciesList);
  }
}

export default { livestockSpecies, plantSpecies, populateInhabitantGenusSpeciesMap };