<template>
  <Transition>
    <FlashAlert v-if="globalStore.flashAlert.message" />
  </Transition>

  <GameOption v-if="globalStore.gameManagement.gameStep === 'gameOption'" />

  <template v-else> 
    <GameMain />
    <ScoreBoard />
  </template>
  

  <Loader
    v-if="loading"
    message="Loading ..." 
  />
</template>

<script setup>

import { useGlobalStore } from './stores/GlobalStore'; 
import FlashAlert from './components/Shared/FlashAlert.vue';
import GameOption from './components/GameOption.vue';
import GameMain from './components/GameMain.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import Loader from './components/Shared/Loader.vue';

import { onMounted, ref } from 'vue';

const globalStore = useGlobalStore();

const loading = ref(0);

onMounted(async () => {
  try {
    loading.value += 1;
    await globalStore.fetchUsers();
  } finally {
    loading.value -= 1;
  }
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
