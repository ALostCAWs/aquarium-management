<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue'
import Update from '../../buttons/Update.vue'
import { timestampToDate } from '../../../functions/convertData'
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>{{ property }}:</p>
        <div>
          <p>Name:</p>
          <p>{{ product.name }}</p>
        </div>
        <div>
          <p>Dose:</p>
          <p>{{ product.dose }} {{ product.unit }}</p>
        </div>
        <div>
          <p>Date:</p>
          <p>{{ timestampToDate(product.timestamp) }}</p>
        </div>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
      </div>
    </div>
    <div v-show="editActive">
      <div>
        <p>{{ property }}:</p>
        <div>
          <p>Name:</p>
          <input v-model="updatedProduct.name"/>
        </div>
        <div>
          <p>Dose:</p>
          <input v-model.number="updatedProduct.dose"/>
          <input v-model="updatedProduct.unit"/>
        </div>
      </div>
      <div class="property-controls">
        <ToggleEditCancel
          @onToggleEdit="toggleEdit"
          :editActive="editActive"
        />
        <Update
          @onUpdate="update"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    index: { required: true },
    property: { required: true },
    event: { required: true },
    product: { required: true }
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      this.$emit(this.event, { index: this.index, product: this.updatedProduct });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedProduct: this.product
    }
  }
}
</script>