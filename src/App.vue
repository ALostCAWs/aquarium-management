<script setup>
import AddItemModal from './components/AddItemModal.vue'
import ToggleModalButton from './components/ToggleModalButton.vue'
import DeleteItemButton from './components/DeleteItemButton.vue'
import Sidebar from './components/Sidebar.vue'
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
        <Sidebar
          :group="'plants'"
        />
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
        <Sidebar
          :group="'livestock'"
        />
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
    Sidebar,
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
    async updateItem({ index, tank }) {
      console.log(tank);

      const response = await fetch(`http://localhost:3000/tanks/`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tank)
      });
      console.log(await response.json());
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
@import url('./styles/styles.css');
h1.hiddenHeading {
  position: absolute;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
}

h2:not(aside h2) {
  padding-bottom: 1em;
}

input {
  padding-left: .25em;

  border-bottom: 1px solid var(--accent-color);
  border-radius: 3px;
}

button {
  background-color: var(--accent-color-faded);
}

button:not(aside button) {
  width: 5em;
  height: 1.5em;
  border: thin solid var(--accent-color);
  border-radius: 5px;

  color: var(--accent-color);
}

button:hover {
  background-color: var(--accent-color);
}

button:not(aside button):hover {
  border: thin solid var(--light-color);
}

button:hover {
  color: var(--accent-color-faded);
}

.list-container {
  overflow-y: auto;
  width: 40%;
  margin: auto;
  margin-top: 2em;
}

.list-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

aside {
  overflow: auto;
  position: fixed;
  width: 20%;
  height: 100vh;
  bottom: 0;
  background-color: var(--accent-color-faded);
}

.sidebar-left {
  top: 0;
}

.sidebar-right {
  right: 0;
}
</style>
