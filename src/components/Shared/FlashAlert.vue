<template>
  <div :class="[`alert alert--${globalStore.flashAlert.type} fade-in`]">
    {{ globalStore.flashAlert.message }}
  </div>
</template>

<script setup>
import { useGlobalStore } from '../../stores/GlobalStore';  
const globalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.alert {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #4c4c4c;
  padding: 25px;
  &--0 {
    background-color: #6c757d;
    color: white;
  }
  &--1 {
    background-color: #8eb5eb;
  }
  &--2 {
    background-color: #e7a428;
  }
  .fade-in {
    animation-name: fade-in;
    animation-duration: 1s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
