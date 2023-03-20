<template>
  <section class="game-main">
    <div class="container">
      <div class="row">
        <b class="mb-3">
          Zápas {{ globalStore.gameManagement.roundOfTournamentCurrrent }} / {{ roundOfTournamentSum }}
        </b>

        <!-- USER 1 -->
        <div class="col-lg-4">
          <GameMainUser
            :id="currentPlayer1Data.id"
            user-number="1"
            img-src="/src/assets/player-1.png"
            :name="currentPlayer1Data.name"
            :local-score="showLocalScorePlayer1"
          /> 
        </div>

        <div class="col-lg-4 player-table">
          <div class="col-lg-6 player-table__weapon">
            <img
              :src="`src/assets/${player1Weapon}.png`"
              alt="player 1"
            >
          </div>
          <div class="col-lg-6 player-table__weapon">
            <img
              :src="`src/assets/${player2Weapon}-opposite.png`"
              alt="player 1"
            >
          </div>
        </div>

        <!-- USER 2 -->
        <div class="col-lg-4">
          <GameMainUser
            :id="currentPlayer2Data.id"
            user-number="2"
            img-src="/src/assets/player-2.png"
            :name="currentPlayer2Data.name"
            :local-score="showLocalScorePlayer2"
          /> 
        </div>
      </div> 

      <div class="game-main__round-message">
        <h3 v-if="!roundTournamentRunning">
          {{ globalStore.gameManagement.roundLocalMessage }}
        </h3>
      </div>

      <button
        v-if="roundTournamentRunning"
        type="button"
        class="btn btn-success"
        :disabled="gameRunning"
        @click="startRound()" 
      >
        Zahájit kolo {{ globalStore.gameManagement.roundLocalCurrent }}
      </button>
      <button
        v-if="!roundTournamentRunning"
        type="button"
        class="btn btn-info"
        @click="setNewGame()"
      >
        Nastavit novou hru
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useGlobalStore } from '../stores/GlobalStore';
import { wait, findUserIndex } from '../helpers/general';
import GameMainUser from '../components/GameMainUser.vue'; 

const globalStore = useGlobalStore();

// DATA
const players = reactive({
  weapons: ['rock', 'scissors', 'paper'],
  player1: {
    localScore: 0,
  },
  player2: {
    localScore: 0,
  },
});

const player1Weapon = ref(players.weapons[0]);
const player2Weapon = ref(players.weapons[0]);

const gameRunning = ref(false);
const roundTournamentRunning = ref(true);
const roundOfTournamentSum= ref((globalStore.usersState.length * (globalStore.usersState.length - 1)) / 2); 

// INIT VARIABLES
let counter; 
let selectPlayer1Weapon;
let selectPlayer2Weapon;  
let indexOfCurrentRivalUser;
let indexOfWinner; 
let scorePlayer1;
let scorePlayer2; 

// LOCAL COMPONENT FUNCTIONS 
const decideWinner = async (selectPlayer1Weapon, selectPlayer2Weapon, animationTime) => {
  await wait(animationTime);
    player1Weapon.value = players.weapons[selectPlayer1Weapon];
    player2Weapon.value = players.weapons[selectPlayer2Weapon];
    await wait(animationTime);
    if (selectPlayer1Weapon === selectPlayer2Weapon) { 
      globalStore.showFlashAlert('Remíza', 0);
    } else if (
      // 0 = rock, 1 = scissors, 2 = paper
      (selectPlayer1Weapon === 0 && selectPlayer2Weapon === 1) ||
      (selectPlayer1Weapon === 1 && selectPlayer2Weapon === 2) ||
      (selectPlayer1Weapon === 2 && selectPlayer2Weapon === 0)
    ) {
      players.player1.localScore += 1;
      globalStore.showFlashAlert('Vyhrál hráč 1', 1);
    } else {
      players.player2.localScore += 1;
      globalStore.showFlashAlert('Vyhrál hráč 2', 2);
    }
    await wait(animationTime + (animationTime / 100) * 8);
    gameRunning.value = false;
    globalStore.gameManagement.roundLocalCurrent += 1;
};

const removeCurrentRivalOfPlayer = (currentUser, currentRivalUser) => {
  if (currentUser !== -1) {
    indexOfCurrentRivalUser = globalStore.usersState[ 
    currentUser
    ].remainingRivalsID.indexOf(currentRivalUser); 
    if (indexOfCurrentRivalUser > -1) { 
      globalStore.usersState[currentUser].remainingRivalsID.splice(indexOfCurrentRivalUser, 1);
    }
  } 
};

const recordTheWinner = (player) => {
  indexOfWinner = findUserIndex(player, globalStore);  

  if (indexOfWinner !== -1) {
    globalStore.usersState[indexOfWinner].wins += 1;
  }
}; 

const makePlayersMove = () => {
  selectPlayer1Weapon = Math.floor(Math.random() * 3);
  selectPlayer2Weapon = Math.floor(Math.random() * 3); 
};

const unselectAllUsers = () => {
  globalStore.gameManagement.currentPlayer1 = 0;
  globalStore.gameManagement.currentPlayer2 = 0;
};

// VUE METHODS
const startRound =  (animationTime = 370) => {
  gameRunning.value = true;
  makePlayersMove();
  counter = 0;

  const animateWeapons = setInterval(async () => {
    player1Weapon.value = players.weapons[counter];
    player2Weapon.value = players.weapons[counter];
    counter++;
    if (counter === 3) {
      clearInterval(animateWeapons);
      decideWinner(selectPlayer1Weapon, selectPlayer2Weapon, animationTime ); 
    } 
  }, animationTime);
};

const setNewGame = () => {
  globalStore.gameManagement.gameStep = 'gameOption';
  globalStore.gameManagement.roundOfTournamentCurrrent += 1;
  
  let getUser1 = findUserIndex(globalStore.gameManagement.currentPlayer1, globalStore); 
  let getUser2 = findUserIndex(globalStore.gameManagement.currentPlayer2, globalStore);  

  removeCurrentRivalOfPlayer(getUser1, globalStore.gameManagement.currentPlayer2);  //currentUser, currentRivalUser
  removeCurrentRivalOfPlayer(getUser2, globalStore.gameManagement.currentPlayer1);  //currentUser, currentRivalUser

  unselectAllUsers(); 
};

//WATCHERS
watch(() => globalStore.gameManagement.roundLocalCurrent, (newValue) => {
    if (newValue > 3) {
      scorePlayer1 = players.player1.localScore;
      scorePlayer2 = players.player2.localScore; 

      if (scorePlayer1 > scorePlayer2) {
        globalStore.gameManagement.roundLocalMessage = 'Vyhrál HRÁČ 1';
        recordTheWinner(globalStore.gameManagement.currentPlayer1); 
      } 
      else if (scorePlayer1 < scorePlayer2) {
        globalStore.gameManagement.roundLocalMessage = 'Vyhrál HRÁČ 2';
        recordTheWinner(globalStore.gameManagement.currentPlayer2);
      } 
      else {
        globalStore.gameManagement.roundLocalMessage = 'Nastala remíza';
      }
      roundTournamentRunning.value = false;
    }
  }
);

// COMPUTED PROPERTIES
const showLocalScorePlayer1 = computed(() => 'I '.repeat(players.player1.localScore)); 
const showLocalScorePlayer2 = computed(() => 'I '.repeat(players.player2.localScore)); 

const currentPlayer1Data = computed(() => globalStore.usersState.find((player) => player.id === globalStore.gameManagement.currentPlayer1));
const currentPlayer2Data = computed(() => globalStore.usersState.find((player) => player.id === globalStore.gameManagement.currentPlayer2)); 

</script>

<style lang="scss" scoped>
.game-main {
  text-align: center;
  &__round-message {
    height: 34px;
    margin: 0 0 15px 0;
    h3 {
      text-transform: uppercase;
      color: #ffffff;
      background: #de5353;
      display: inline;
      padding: 0 102px;
      border-radius: 7px;
    }
  }
 
  .player-table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__weapon {
      max-width: 200px;
    }
  }
}
</style>
