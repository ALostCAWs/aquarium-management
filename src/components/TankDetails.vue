<template>
  <div>
    <p>{{ item.volume }}</p>
  </div>
</template>

<script>
export default {
  props: {
    index: { required: true },
    item: { required: true }
  }
}
</script>