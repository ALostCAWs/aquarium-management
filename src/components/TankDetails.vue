<template>
  <div class="item">
    <div>
      <p>Id:</p>
      <p>{{ item.id }}</p>
    </div>
    <div>
      <p>Name:</p>
      <p>{{ item.name }}</p>
    </div>
    <div>
      <p>Volume:</p>
      <p>{{ item.volume }}</p>
    </div>
    <div>
      <p>Volume Unit:</p>
      <p>{{ item.volume_unit }}</p>
    </div>
    <div>
      <p>Cycled:</p>
      <p>{{ item.is_cycled }}</p>
    </div>
    <div>
      <p>Filtration:</p>
      <p>{{ item.filtration }}</p>
    </div>
    <div>
      <p>Substrate:</p>
      <p>{{ item.substrate }}</p>
    </div>
    <div>
      <p>Light:</p>
      <p>{{ item.light }}</p>
    </div>
    <div>
      <p>Light Schedule:</p>
      <p>{{ item.light_schedule }}</p>
    </div>
    <div>
      <p>Temperature Setting:</p>
      <p>{{ item.temperature_setting }}</p>
    </div>
    <div>
      <p>Temperature Unit:</p>
      <p>{{ item.temperature_unit }}</p>
    </div>
    <div class="list">
      <p>Parameters:</p>
      <div>
        <p>NH3:</p>
        <p>{{ item.parameters.NH3 }}</p>
      </div>
    </div>
    <div class="list">
      <p>Test Schedule:</p>
      <p>{{ item.test_schedule }}</p>
    </div>
    <div>
      <p>Livestock List:</p>
      <p>{{ item._livestock_list }}</p>
    </div>
    <div>
      <p>Plant List:</p>
      <p>{{ item._plant_list }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
}
</style>