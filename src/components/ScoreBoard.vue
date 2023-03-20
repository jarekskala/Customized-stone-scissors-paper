<template>
  <section class="score-board">
    <div class="container">
      <div class="row">
        <div v-if="globalStore.gameManagement.roundOfTournamentCurrrent < 2">
          <p>Tabulka výsledků se zobrazí od 2 zápasu.</p>
        </div>

        <table
          v-if="globalStore.gameManagement.roundOfTournamentCurrrent > 1"
          class="table table-striped"
        >
          <thead>
            <tr>
              <th scope="col">
                ID
              </th>
              <th scope="col">
                Jméno
              </th>
              <th scope="col">
                Víťezství
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="({id, name, wins}) in scoreBoardData"
              :key="id"  
            >
              <th scope="row">
                {{ id }}
              </th>
              <td>{{ name }}</td> 
              <td>{{ wins }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGlobalStore } from '../stores/GlobalStore';
import { computed } from 'vue';

const globalStore = useGlobalStore();

const scoreBoardData = computed(() => {
  const getAllWinners = globalStore.usersState
    .filter((current) => current.wins)
    .sort((a, b) => b.wins - a.wins);
  return getAllWinners;
});
</script>

<style lang="scss" scoped>
.score-board {
  margin: 50px 0 0 0;
  min-height: 50px;
  p {
    background: #f2f2f2;
    text-align: center;
    padding: 15px;
    font-weight: 700;
  }
  .container {
    max-width: 700px;
  }
}
</style>
