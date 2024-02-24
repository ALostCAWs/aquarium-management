<script setup>
import AddItemModal from './components/AddItemModal.vue'
import ToggleModalButton from './components/ToggleModalButton.vue'
import DeleteItemButton from './components/DeleteItemButton.vue'
import TankList from './components/TankList.vue'
</script>

<template>
  <div class="todo-container">
    <div v-show="modalActive">
      <AddItemModal
      @onCreate="createItem"
      @onToggle="toggleModal"
      />
    </div>
    <section :inert="modalActive">
      <h1 class="hiddenHeading">Aquarium Management - Tank List</h1>
      <h2>Tank List</h2>
      <div class="todo-btn">
        <ToggleModalButton
          @onToggle="toggleModal"
        />
        <DeleteItemButton
          :deleteSelectedItems="deleteSelectedItems"
          v-show="itemSelected"
        />
      </div>
      <TankList
        :list="tanks"
        @onSelect="toggleSelectItem"
        @onUpdate="updateItem"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AddItemModal,
    ToggleModalButton,
    DeleteItemButton,
    TankList
  },
  methods: {
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    async getAllTanks() {
      try {
        const response = await fetch('http://localhost:3000/tanks/');
        const allTanks = await response.json();
        const allTanksUnselected = allTanks.map(t => ({ ...t, selected: false }));
        this.tanks = allTanksUnselected;
      } catch (e) {
        console.error(e);
      }
    },
    createItem(item) {
      //

      this.toggleModal();
    },
    updateItem({ index, text }) {
      //
    },
    toggleSelectItem({ checked, item }) {
      item.selected = checked;
      if (checked) {
        this.itemSelected = true;
      } else {
        this.itemSelected = this.tanks.filter((item) => { return item.selected }).length > 0;
      }
    },
    deleteSelectedItems() {
      //
    },
    saveList() {
      //
    }
  },
  data() {
    return {
      modalActive: false,
      itemSelected: false,
      tanks: []
    };
  },
  async created() {
    await this.getAllTanks();
    console.log(this.tanks);
  },
  watch: {
    list: function (updatedList, previousList) {
      this.saveList();
    }
  }
}
</script>

<style>
.todo-container {
  width: 35%;
  margin: auto;
  margin-top: 2em;
}
.todo-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
