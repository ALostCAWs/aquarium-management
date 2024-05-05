<script setup>
import Sidebar from './components/sidebar/Sidebar.vue'
import AddItemModal from './components/AddItemModal.vue'
import ToggleAddModal from './components/buttons/ToggleAddModal.vue'
import Delete from './components/buttons/Delete.vue'
import TankListContainer from './components/tank/TankListContainer.vue'
import { sortParametersArray, sortTankArray } from './functions/sortData'
import { checkObjectImagesEqual } from './functions/checkObjectEquality'
import { populateInhabitantGenusSpeciesMap } from './constants/tankInhabitants'
</script>

<template>
  <div>
    <div v-show="modalActive">
      <AddItemModal
      @onCreate="createItem"
      @onToggle="toggleModal"
      />
    </div>
    <div class="page-wrapper" :inert="modalActive">
      <h1 class="hiddenHeading">Aquarium Management - Tank List</h1>
      <aside class="sidebar-left">
        <Sidebar
          :group="'plants'"
        />
      </aside>
      <section class="list-container">
        <h2>Tank List</h2>
        <div class="list-btn-container">
          <ToggleAddModal
            @onToggle="toggleModal"
          />
          <Delete
            :deleteSelectedItems="deleteSelectedItems"
            v-show="itemSelected"
          />
        </div>
        <TankListContainer
          :tanks="tanks"
          :products="products"
          @onSelect="toggleSelectItem"
          @onUpdate="updateTank"
          @onUpdateVolume="updateVolume"
          @onUpdateCycle="updateCycle"
          @onUpdateFiltration="updateFiltration"
          @onUpdateSubstrate="updateSubstrate"
          @onUpdateTemperature="updateTemperature"
          @onUpdateLight="updateLight"
          @onUpdateParameters="updateParameters"
          @onUpdateTestSchedule="updateTestSchedule"
          @onUpdateWaterChange="updateWaterChange"
          @onUpdateRecentProduct="updateRecentProduct"
          @onUpdateRecentSubstrateFert="updateRecentSubstrateFert"
          @onUpdateRecentWaterFert="updateRecentWaterFert"
          @onUpdateAilments="updateAilments"
        />
      </section>
      <aside class="sidebar-right">
        <Sidebar
          :group="'livestock'"
        />
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AddItemModal,
    ToggleAddModal,
    Delete,
    Sidebar,
    TankListContainer
  },
  methods: {
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    toggleSelectItem({ checked, item }) {
      item.selected = checked;
      if (checked) {
        this.itemSelected = true;
      } else {
        this.itemSelected = this.tanks.filter((item) => { return item.selected }).length > 0;
      }
    },
    createItem(item) {
      //

      this.toggleModal();
    },
    updateVolume({ index, volume, unit }) {
      this.tanks[index].volume = volume;
      this.tanks[index].volume_unit = unit;
      this.updateTank(index);
    },
    updateCycle({ index, cycle }) {
      this.tanks[index].is_cycled = cycle;
      this.updateTank(index);
    },
    updateFiltration({ index, filtration }) {
      this.tanks[index].filtration = filtration;
      this.updateTank(index);
    },
    updateSubstrate({ index, substrate }) {
      this.tanks[index].substrate = substrate;
      this.updateTank(index);
    },
    updateTemperature({ index, temperature, unit }) {
      this.tanks[index].temperature_setting = temperature;
      this.tanks[index].temperature_unit = unit;
      this.updateTank(index);
    },
    updateLight({ index, light_settings }) {
      this.tanks[index].light_settings = light_settings;
      this.updateTank(index);
    },
    updateParameters({ index, parameters }) {
      const timestamp = String(Date.now());

      const updatedParameters = [];
      for (const parameter of parameters) {
        let parameterTimestamp = parameter.timestamp
        if (parameter.tested) {
          parameterTimestamp = timestamp;
        }
        updatedParameters.push({
          parameter: parameter.parameter,
          result: parameter.result,
          result_unit: parameter.result_unit,
          timestamp: parameterTimestamp
        });
      }
      console.log(updatedParameters);
      this.tanks[index].parameters = updatedParameters;
      console.log(this.tanks[index]);
      this.updateTank(index);
    },
    updateTestSchedule({ index, parameters }) {
      this.tanks[index].test_schedule = parameters;
      this.updateTank(index);
    },
    updateWaterChange({ index, water_change }) {
      water_change.timestamp = String(Date.now());
      this.tanks[index].recent_water_change = water_change;
      this.updateTank(index);
    },
    updateRecentProduct({ index, product }) {
      product.timestamp = String(Date.now());
      this.tanks[index].recent_product = product;
      this.updateTank(index);
    },
    updateRecentSubstrateFert({ index, product }) {
      product.timestamp = String(Date.now());
      this.tanks[index].recent_substrate_fertilizer = product;
      this.updateTank(index);
    },
    updateRecentWaterFert({ index, product }) {
      product.timestamp = String(Date.now());
      this.tanks[index].recent_water_fertilizer = product;
      this.updateTank(index);
    },
    updateAilments({ index, ailments }) {
      const timestamp = String(Date.now());
      const oldAilments = this.tanks[index].ailments;

      if (ailments.length = oldAilments.length) {
        for (const [i, ailment] of ailments.entries()) {
          if (!checkObjectImagesEqual(oldAilments[i], ailment)) {
            ailment.timestamp = timestamp;
          }
        }
      } else {
        for (const [i, ailment] of ailments.entries()) {
          if (!oldAilments.some(a => a.name === ailment.name)) {
            ailment.timestamp = timestamp;
          }
        }
      }
      this.tanks[index].ailments = ailments;
      this.updateTank(index);
    },
    async updateTank(index) {
      const tank = this.tanks[index];
      const response = await fetch(`http://localhost:3000/tanks/`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tank)
      });
      console.log(await response.json());
    },
    deleteSelectedItems() {
      //
    },
    saveList() {
      //
    },
    async getAllTanks() {
      try {
        const response = await fetch('http://localhost:3000/tanks/');
        const allTanks = await response.json();
        const allTanksUnselected = allTanks.map(t => ({ ...t, selected: false }));
        allTanksUnselected.sort(sortTankArray);
        this.tanks = allTanksUnselected;
      } catch (e) {
        console.error(e);
      }
    },
    async getAllProducts() {
      try {
        const response_all = await fetch('http://localhost:3000/products/');
        const allProducts = await response_all.json();

        const response_waterFert = await fetch('http://localhost:3000/products/type/water column fertilizer');
        const waterFertProducts = await response_waterFert.json();

        const response_substrateFert = await fetch('http://localhost:3000/products/type/substrate fertilizer');
        const substrateFertProducts = await response_substrateFert.json();

        this.products.allProducts = allProducts;
        this.products.waterFertProducts = waterFertProducts;
        this.products.substrateFertProducts = substrateFertProducts;
      } catch (e) {
        console.error(e);
      }
    },
  },
  data() {
    return {
      modalActive: false,
      itemSelected: false,
      tanks: [],
      products: {
        allProducts: [],
        waterFertProducts: [],
        substrateFertProducts: []
      }
    };
  },
  async created() {
    await populateInhabitantGenusSpeciesMap();
    await this.getAllTanks();
    await this.getAllProducts();
    console.log(this.tanks);
    console.log(this.products);

    for (const tank of this.tanks) {
      const parameters = tank.parameters.map(p => ({ ...p, tested: false }));
      tank.parameters = parameters;
    }
  },
  watch: {
    list: function (updatedList, previousList) {
      this.saveList();
    }
  }
}
</script>

<style>
@import url('./styles/styles.css');
h1.hiddenHeading {
  position: absolute;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
}

h2:not(aside h2) {
  padding-bottom: 1em;
}

input,
select {
  padding-left: .25em;

  border-bottom: 1px solid var(--accent-color);
  border-radius: 3px;
}

button {
  background-color: var(--accent-color-faded);
}

button:not(aside button) {
  width: 5em;
  height: 1.5em;
  border: thin solid var(--accent-color);
  border-radius: 5px;

  color: var(--accent-color);
}

button:hover {
  background-color: var(--accent-color);
}

button:not(aside button):hover {
  border: thin solid var(--light-color);
}

button:hover {
  color: var(--accent-color-faded);
}

.list-container {
  width: 40%;
  margin: auto;
  margin-top: 2em;
}

.list-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

aside {
  overflow: auto;
  position: fixed;
  width: 20%;
  height: 100vh;
  bottom: 0;
  background-color: var(--accent-color-faded);
}

.sidebar-left {
  top: 0;
}

.sidebar-right {
  right: 0;
}
</style>
