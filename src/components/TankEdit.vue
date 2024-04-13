<script setup>
import { timestampToDate } from '../functions/convertData'
</script>

<template>
  <div class="item">
    <div>
      <p>Volume:</p>
      <input v-model="tank.volume"/>
      <input v-model="tank.volume_unit"/>
    </div>
    <div>
      <p>Cycled:</p>
      <input v-model="tank.is_cycled"/>
    </div>
    <div>
      <p>Filtration:</p>
      <input v-model="tank.filtration"/>
    </div>
    <div>
      <p>Substrate:</p>
      <input v-model="tank.substrate"/>
    </div>
    <div>
      <p>Temperature Setting:</p>
      <input v-model="tank.temperature_setting"/>
      <input v-model="tank.temperature_unit"/>
    </div>
    <div class="list">
      <p>Light Settings:</p>
      <div>
        <p>Name:</p>
        <input v-model="tank.light_settings.name"/>
      </div>
      <div>
        <p>Strength:</p>
        <input v-model="tank.light_settings.strength"/>
      </div>
      <div>
        <p>Percentage:</p>
        <input v-model="tank.light_settings.percentage"/>
      </div>
      <div>
        <p>Hours on:</p>
        <input v-model="tank.light_settings.hours_on"/>
      </div>
    </div>
    <div class="list">
      <p>Parameters:</p>
      <div v-for="(parameter) in tank.parameters">
        <p>{{ parameter.parameter }}</p>
        <input v-model="parameter.result"/>
        <input v-model="parameter.result_unit"/>
      </div>
    </div>
    <div class="list">
      <p>Recent Water Change:</p>
      <div>
        <p>Percentage:</p>
        <input v-model="tank.recent_water_change.percentage"/>
      </div>
      <div>
        <p>Water Replaced:</p>
        <input v-model="tank.recent_water_change.water_type"/>
      </div>
      <div>
        <p>Date:</p>
        <input v-model="tank.recent_water_change.timestamp"/>
      </div>
    </div>
    <div class="list">
      <p>Recent Product:</p>
      <div>
        <p>Name:</p>
        <input v-model="tank.recent_product.name"/>
      </div>
      <div>
        <p>Dose:</p>
        <input v-model="tank.recent_product.dose"/>
        <input v-model="tank.recent_product.unit"/>
      </div>
    </div>
    <div class="list">
      <p>Recent Water Column Fert.:</p>
      <div>
        <p>Name:</p>
        <input v-model="tank.recent_water_fertilizer.name"/>
      </div>
      <div>
        <p>Dose:</p>
        <input v-model="tank.recent_water_fertilizer.dose"/>
        <input v-model="tank.recent_water_fertilizer.unit"/>
      </div>
    </div>
    <div class="list">
      <p>Recent Substrate Fert.:</p>
      <div>
        <p>Name:</p>
        <input v-model="tank.recent_substrate_fertilizer.name"/>
      </div>
      <div>
        <p>Dose:</p>
        <input v-model="tank.recent_substrate_fertilizer.dose"/>
        <input v-model="tank.recent_substrate_fertilizer.unit"/>
      </div>
    </div>
    <div class="list">
      <p>Test Schedule:</p>
      <div v-for="(parameter) in tank.test_schedule">
        <p>{{ parameter.parameter }}</p>
        <input v-model="parameter.frequency"/>
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

.item > div:not(.list),
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