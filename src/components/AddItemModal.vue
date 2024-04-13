<script setup>
import LabelTextbox from './base/LabelTextbox.vue'
import ToggleAddModal from './buttons/ToggleAddModal.vue'
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
      <ToggleAddModal
        @onToggle="create"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItemModal',
  comments: {
    LabelTextbox,
    ToggleAddModal
  },
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

<style>
.modal-mask {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 8000;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: var(--overlay-color);
}

.modal {
  display: flex;
  flex-direction: column;
  z-index: 9000;

  width: 50%;
  height: 50%;

  margin-right: auto;
  margin-left: auto;

  background-color: var(--shade-color);
  border-radius: 10px;
}

.modal-inputs {
  width: 100%;
  height: 70%;
}

.modal-inputs input {
  background-color: var(--accent-color-faded);
}
</style>