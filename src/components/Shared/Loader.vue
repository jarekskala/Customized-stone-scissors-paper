<script setup>
// PROPS
const props = defineProps({
  message: {
    type: String,
    default: 'Loading',
  },
});
</script>

<template>
  <div class="loader">
    <div class="loader__inner">
      <svg
        class="loader-svg"
        viewBox="25 25 50 50"
      >
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="3"
          stroke-miterlimit="10"
        />
      </svg>
      <p
        v-if="message"
        class="loader__message"
      >
        {{ props.message }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 50px;
.loader {
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(256, 256, 256, 0.8);
  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
  &__message {
    max-width: 200px;
    text-align: center;
    line-height: 1.5;
  }
  &-svg {
    animation: rotate 2s linear infinite;
    height: $width;
    transform-origin: center center;
    width: $width;
  }
  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes color {
  100%,
  0% {
    stroke: red;
  }
  40% {
    stroke: blue;
  }
  66% {
    stroke: green;
  }
  80%,
  90% {
    stroke: yellow;
  }
}
</style>
