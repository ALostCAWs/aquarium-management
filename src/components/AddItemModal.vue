<script setup>
import LabelTextbox from './LabelTextbox.vue'
import ToggleModalButton from './ToggleModalButton.vue'
</script>

<template>
  <div class="modal-mask" @click.self="toggle">
    <div role="dialog" aria-modal="true" class="add-modal modal">
      <div class="modal-inputs">
        <LabelTextbox
          :label="`Item:`"
          @onUpdate="setText"
        />
        <LabelTextbox
          :label="`Date:`"
          @onUpdate="setDate"
        />
      </div>
      <ToggleModalButton
        @onToggle="create"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setText(text) {
      this.text = text;
    },
    setDate(date) {
      this.date = date;
    },
    refreshData() {
      this.setText('');
      this.setDate('');
    },
    create() {
      this.$emit('onCreate', { text: this.text, date: this.date });
      this.refreshData();
    },
    toggle() {
      this.$emit('onToggle');
    }
  },
  data() {
    return {
      text: '',
      date: ''
    }
  }
}
</script>

<style scoped>
.toggle-modal {
  align-self: flex-end;

  margin: 20px auto;
}
</style>