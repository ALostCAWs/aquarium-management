<script setup>
import ToggleEditCancel from '../../buttons/ToggleEditCancel.vue'
import Update from '../../buttons/Update.vue'
import { doseUnit } from '../../../constants/unit'
import { timestampToDate } from '../../../functions/convertData'
import { validateDecimalInput } from '../../../functions/validateInput'
</script>

<template>
  <div class="tank-property list">
    <div v-show="!editActive">
      <div>
        <p>{{ property }}:</p>
        <div>
          <p>Product:</p>
          <p>{{ product.product }}</p>
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
      <div class="property-input-container">
        <p>{{ property }}:</p>
        <div>
          <p>Product:</p>
          <select v-model="updatedProduct.product">
            <option :value="``"></option>
            <option v-for="(p, i) in products" :value="p.product" :key="`product-option-${i}`">{{ p.product }}</option>
          </select>
        </div>
        <div>
          <p>Dose:</p>
          <input v-model.number="updatedProduct.dose"/>
          <select v-model="updatedProduct.unit">
            <option :value="``"></option>
            <option v-for="(u, i) in doseUnit" :value="u" :key="`product-unit-${i}`">{{ u }}</option>
          </select>
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
    product: { required: true },
    products: { required: true }
  },
  comments: {
    ToggleEditCancel,
    Update
  },
  methods: {
    toggleEdit() {
      this.editActive = !this.editActive;
    },
    update() {
      if (!validateDecimalInput(this.updatedProduct.dose)) {
        return;
      }
      this.$emit(this.event, { index: this.index, product: this.updatedProduct });
      this.toggleEdit();
    }
  },
  data() {
    return {
      editActive: false,
      updatedProduct: structuredClone(this.product)
    }
  }
}
</script>