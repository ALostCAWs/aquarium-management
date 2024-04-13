<script setup>
import { timestampToDate } from '../../functions/convertData'
import TankProperty from './TankProperty.vue';
import TankVolume from './properties/TankVolume.vue';
</script>

<template>
  <div class="item">
    <TankProperty>
      <TankVolume
        :volume="tank.volume"
        :unit="tank.volume_unit"
      />
    </TankProperty>
    <div>
      <p>Cycled:</p>
      <p>{{ tank.is_cycled }}</p>
    </div>
    <div>
      <p>Filtration:</p>
      <p>{{ tank.filtration }}</p>
    </div>
    <div>
      <p>Substrate:</p>
      <p>{{ tank.substrate }}</p>
    </div>
    <div>
      <p>Temperature Setting:</p>
      <p>{{ tank.temperature_setting }} {{ tank.temperature_unit }}</p>
    </div>
    <div class="list">
      <p>Light Settings:</p>
      <div>
        <p>Name:</p>
        <p>{{ tank.light_settings.name }}</p>
      </div>
      <div>
        <p>Strength:</p>
        <p>{{ tank.light_settings.strength }}</p>
      </div>
      <div>
        <p>Percentage:</p>
        <p>{{ tank.light_settings.percentage }}</p>
      </div>
      <div>
        <p>Hours on:</p>
        <p>{{ tank.light_settings.hours_on }}</p>
      </div>
    </div>
    <div class="list">
      <p>Parameters:</p>
      <div v-for="(parameter) in tank.parameters">
        <p>{{ parameter.parameter }} {{ parameter.result }}{{ parameter.result_unit }}</p>
        <p>{{ timestampToDate(parameter.timestamp) }}</p>
      </div>
    </div>
    <div class="list">
      <p>Recent Water Change:</p>
      <div>
        <p>Percentage:</p>
        <p>{{ tank.recent_water_change.percentage }}</p>
      </div>
      <div>
        <p>Water Replaced:</p>
        <p>{{ tank.recent_water_change.water_type }}</p>
      </div>
      <div>
        <p>Date:</p>
        <p>{{ timestampToDate(tank.recent_water_change.timestamp) }}</p>
      </div>
    </div>
    <div class="list">
      <p>Recent Product:</p>
      <div>
        <p>Name:</p>
        <p>{{ tank.recent_product.name }}</p>
      </div>
      <div>
        <p>Dose:</p>
        <p>{{ tank.recent_product.dose }} {{ tank.recent_product.unit }}</p>
      </div>
      <div>
        <p>Date:</p>
        <p>{{ timestampToDate(tank.recent_product.timestamp) }}</p>
      </div>
    </div>
    <div class="list">
      <p>Recent Water Column Fert.:</p>
      <div>
        <p>Name:</p>
        <p>{{ tank.recent_water_fertilizer.name }}</p>
      </div>
      <div>
        <p>Dose:</p>
        <p>{{ tank.recent_water_fertilizer.dose }} {{ tank.recent_water_fertilizer.unit }}</p>
      </div>
      <div>
        <p>Date:</p>
        <p>{{ timestampToDate(tank.recent_water_fertilizer.timestamp) }}</p>
      </div>
    </div>
    <div class="list">
      <p>Recent Substrate Fert.:</p>
      <div>
        <p>Name:</p>
        <p>{{ tank.recent_substrate_fertilizer.name }}</p>
      </div>
      <div>
        <p>Dose:</p>
        <p>{{ tank.recent_substrate_fertilizer.dose }} {{ tank.recent_substrate_fertilizer.unit }}</p>
      </div>
      <div>
        <p>Date:</p>
        <p>{{ timestampToDate(tank.recent_substrate_fertilizer.timestamp) }}</p>
      </div>
    </div>
    <div class="list">
      <p>Test Schedule:</p>
      <div v-for="(parameter) in tank.test_schedule">
        <p>{{ parameter.parameter }}</p>
        <p>Every {{ parameter.frequency }} days</p>
      </div>
    </div>
    <div class="list">
      <p>Livestock List:</p>
      <p v-for="(inhabitant) in tank.livestock">
        {{ inhabitant.genus }} {{ inhabitant.species }}
      </p>
    </div>
    <div class="list">
      <p>Plant List:</p>
      <p v-for="(inhabitant) in tank.plants">
        {{ inhabitant.genus }} {{ inhabitant.species }}
      </p>
    </div>
    <div class="list">
      <p>Ailments:</p>
      <p v-for="(ailment) in tank.ailments">
        {{ ailment.name }} ({{ ailment.type }})
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TankDetails',
  comments: {
    TankProperty,
    TankVolume
  },
  props: {
    tank: { required: true }
  }
}
</script>

<style>
.item {
  width: 100%;
}

.item > div {
  margin-top: .75em;
}

.item > div > div:not(.list),
.item .list > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item div p {
  width: 50%;
}

.item .list > p:not(:first-of-type),
.item .list > div > p:nth-child(odd) {
  padding-left: 10%;
}

.item .list > div > p:first-of-type {
  width: 40%;
}

.item .list:not(:has(div)) p {
  width: 100%;
}
</style>