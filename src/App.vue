<script setup>
import AddItemModal from './components/AddItemModal.vue'
import ToggleModalButton from './components/ToggleModalButton.vue'
import DeleteItemButton from './components/DeleteItemButton.vue'
import TankList from './components/TankList.vue'
</script>

<template>
  <div>
    <div v-show="modalActive">
      <AddItemModal
      @onCreate="createItem"
      @onToggle="toggleModal"
      />
    </div>
    <div class="page-wrapper" :inert="modalActive">
      <h1 class="hiddenHeading">Aquarium Management - Tank List</h1>
      <aside class="sidebar-left">
        <section>
          <h2>Plants</h2>
        </section>
      </aside>
      <section class="list-container">
        <h2>Tank List</h2>
        <div class="list-btn-container">
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
      <aside class="sidebar-right">
        <section>
          <h2>Livestock</h2>
        </section>
      </aside>
    </div>
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
aside {
  position: fixed;
  padding: 0 1em;
  width: 15%;
  height: 100vh;
  bottom: 0;
  background-color: var(--accent-color-faded);
}

aside > section > h2:first-child {
  padding-top: 1.1em;
}

.sidebar-left {
  top: 0;
}

.sidebar-right {
  right: 0;
}

.list-container {
  overflow-y: auto;
  width: 35%;
  margin: auto;
  margin-top: 2em;
}

.list-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
