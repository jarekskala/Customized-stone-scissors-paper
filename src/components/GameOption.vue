<template>
  <section class="game-options">
    <div class="container">
      <h2>Výběr hraču</h2>
      <form action="">
        <div class="row game-options__selects">
          <div class="col-md-6 text-md-end">
            <select
              id="player1"
              v-model="globalStore.gameManagement.currentPlayer1"
              name="player1"
              @change="selectRival"
            >
              <option
                value="0"
                disabled
              >
                Vyberte hráče 1
              </option>
              <template
                v-for="current in globalStore.usersState"
                :key="current.id"
              >
                <option
                  v-if="current.remainingRivalsID?.length"
                  :value="current.id"
                >
                  {{ current.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="col-md-6 text-md-start">
            <select
              v-if="selectPlayer2List"
              id="player2"
              v-model="globalStore.gameManagement.currentPlayer2"
              name="player2"
              class="ms-md-3"
            >
              <option
                value="0"
                disabled
              >
                Vyberte hráče 2
              </option>
              <option
                v-for="current in selectPlayer2List"
                :key="current.id"
                :value="current.id"
              >
                {{ current.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="action">
          <button
            type="button"
            class="btn btn-success"
            :disabled="
              globalStore.gameManagement.currentPlayer1 === 0 ||
                globalStore.gameManagement.currentPlayer2 === 0
            "
            @click="startGame()"
          >
            Zahájit hru
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useGlobalStore } from '../stores/GlobalStore';
import { ref } from 'vue';
import { findUser } from '../helpers/general';

const globalStore = useGlobalStore();
const selectPlayer2List = ref('');

// INIT VARIABLES
let getCurrentPlayer1;
let currentPlayer1Rivals; 

// VUE METHODS 
const selectRival = () => {
  getCurrentPlayer1 = findUser(globalStore.gameManagement.currentPlayer1, globalStore); 

  currentPlayer1Rivals = [...getCurrentPlayer1.remainingRivalsID]; 

  const filteredData = globalStore.usersState.filter((current) =>
    currentPlayer1Rivals.includes(current.id)
  ); 

  selectPlayer2List.value = filteredData;
  
  globalStore.gameManagement.currentPlayer2 = 0; 
};

const startGame = () => { 
  // RESET STATS
  globalStore.gameManagement.roundLocalCurrent = 1;

  // SWITCH GAME STEP
  globalStore.gameManagement.gameStep = 'gameMain';
};
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';
.game-options {
  text-align: center;
  form {
    margin: 20px 0 20px 0;
    select {
      min-width: 200px;
      padding: 10px;
    }
    .action {
      margin: 20px 0 0 0;
      button {
        padding: 10px;
        display: inline-block;
      }
    }
  }  
  &__selects {
    @include media-breakpoint-down(md) {
      gap: 20px; 
    }
  }
}
</style>
