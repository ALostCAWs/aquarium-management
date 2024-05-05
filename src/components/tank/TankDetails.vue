<script setup>
import Volume from './properties/Volume.vue';
import Cycle from './properties/Cycle.vue'
import Filtration from './properties/Filtration.vue'
import Substrate from './properties/Substrate.vue'
import Temperature from './properties/Temperature.vue'
import Light from './properties/Light.vue'
import Parameters from './properties/Parameters.vue';
import TestSchedule from './properties/TestSchedule.vue';
import WaterChange from './properties/WaterChange.vue';
import Product from './properties/Product.vue';
import TankInhabitants from './properties/TankInhabitants.vue'
import Ailments from './properties/Ailments.vue'
import { PRODUCTS } from '../../constants/products';
</script>

<template>
  <div class="item">
    <Volume
      v-on="$listeners"
      :index="index"
      :volume="tank.volume"
      :unit="tank.volume_unit"
    />
    <Cycle
      v-on="$listeners"
      :index="index"
      :cycled="tank.is_cycled"
    />
    <Filtration
      v-on="$listeners"
      :index="index"
      :filtration="tank.filtration"
    />
    <Substrate
      v-on="$listeners"
      :index="index"
      :substrate="tank.substrate"
    />
    <Temperature
      v-on="$listeners"
      :index="index"
      :temperature="tank.temperature_setting"
      :unit="tank.temperature_unit"
    />
    <Light
      v-on="$listeners"
      :index="index"
      :light_settings="tank.light_settings"
    />
    <Parameters
      v-on="$listeners"
      :index="index"
      :parameters="tank.parameters"
    />
    <TestSchedule
      v-on="$listeners"
      :index="index"
      :parameters="tank.test_schedule"
    />
    <WaterChange
      v-on="$listeners"
      :index="index"
      :water_change="tank.recent_water_change"
    />
    <Product
      v-on="$listeners"
      :index="index"
      :property="'Recent Product'"
      :event="'onUpdateRecentProduct'"
      :product="tank.recent_product"
      :products="PRODUCTS.get(`all`)"
    />
    <Product
      v-on="$listeners"
      :index="index"
      :property="'Recent Water Fert.'"
      :event="'onUpdateRecentWaterFert'"
      :product="tank.recent_water_fertilizer"
      :products="PRODUCTS.get(`waterFert`)"
    />
    <Product
      v-on="$listeners"
      :index="index"
      :property="'Recent Substrate Fert.'"
      :event="'onUpdateRecentSubstrateFert'"
      :product="tank.recent_substrate_fertilizer"
      :products="PRODUCTS.get(`substrateFert`)"
    />
    <TankInhabitants
      v-on="$listeners"
      :index="index"
      :property="'Livestock'"
      :event="'onUpdateLivestock'"
      :inhabitants="tank.livestock"
    />
    <TankInhabitants
      v-on="$listeners"
      :index="index"
      :property="'Plants'"
      :event="'onUpdatePlants'"
      :inhabitants="tank.plants"
    />
    <Ailments
      v-on="$listeners"
      :index="index"
      :ailments="tank.ailments"
    />
  </div>
</template>

<script>
export default {
  name: 'TankDetails',
  comments: {
    Volume,
    Cycle,
    Filtration,
    Substrate,
    Temperature,
    Light,
    Parameters,
    TestSchedule,
    WaterChange,
    Product,
    TankInhabitants,
    Ailments
  },
  props: {
    index: { required: true },
    tank: { required: true }
  },
  data() {
    return {
      fertilizers: []
    };
  }
}
</script>

<style>
.item {
  width: 100%;
}

.item p {
  margin-top: .1em;
}

.item p,
.item input,
.item select {
  width: 50%;
  line-height: 1.5em;
}

.list .addable-list input:only-of-type {
  margin-left: 1.75em;
}

.item input + select,
.item input:has(+ select) {
  width: 25%;
  background-color: aqua;
}

.item .list input[type=checkbox] {
  margin-right: 1em;
}

.item > div {
  margin-top: .75em;
}

.item > div:not(.list) > div > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tank-property {
  display: flex;
  flex-direction: column;

  width: 100%;
}

.property-controls {
  display: flex;
}

.tank-property button {
  margin-top: .4em;
}

.list > div > div > div:not(:has(input)),
.property-input-container > div:not(:has(input)) {
  display: flex;
  flex-direction: row;
}

.property-input-container > div:has(input) {
  display: flex;
}

.list > div > div > div:not(:has(input)) > p:first-of-type,
.list .property-input-container > div p,
.list .property-input-container > div input[type=text]:has(~ input):first-of-type {
  width: 40%;
  margin-left: 10%;
}

.addable-list > .two-textbox > div {
  margin-left: 10%;
}

.property-input-container.two-textbox > div > input:first-of-type {
  width: 45%;
}
</style>