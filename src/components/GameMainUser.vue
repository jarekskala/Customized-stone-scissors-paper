<template>
  <div class="player player-1">
    <h3 class="player__type">
      HRÁČ {{ userNumber }}
    </h3> 
    <img
      :src="props.imgSrc" 
      class="player__image"
      alt="player"
    >
    <div class="player__credentials"> 
      <b>{{ name }}</b> <br>  
      ID: {{ id }} <br>
    </div>
    <div class="player__score">
      {{ localScore }} 
    </div>
  </div>
</template>
 
<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true 
    }, 
    userNumber: {
        type: Number,
        required: true
    },
    imgSrc: {
        type: String, 
        required: true 
    },
    name: {
        type: String,
        default: 'User' 
    },
    localScore: {
        type: Number,  
        required: true 
    }
});
</script>

<style lang="scss" scoped>
 .player-1,
  .player-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &__weapons {
      width: 167px;
      text-align: center;
      button {
        margin: 0 0 10px 0;
        transition: background 0.3s;
        img {
          max-width: 100px;
        }
      }
    }
  }
  .player {
    &__score {
      color: black;
      font-size: 34px;
      height: 51px;
    }
    &__type {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .player-1 {
    &__weapons {
      button {
        &:hover {
          background: #8eb5eb;
        }
      }
    }
  }
  .player-2 {
    &__weapons {
      button {
        &:hover {
          background: #e7a428;
        }
      }
    }
  }
</style>