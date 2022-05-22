<template>
  <transition name="bounce">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {

  }
}
</script>

<style lang="scss" scoped>

// 動畫進出
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>