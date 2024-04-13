<template>
  <div>
    <p>Volume:</p>
    <p>{{ volume }} {{ unit }}</p>
  </div>
</template>

<script>
export default {
  props: {
    volume: { required: true },
    unit: { required: true }
  }
}
</script>