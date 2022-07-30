<template>
  <div class="modal-wrapper flex-center">
    <transition name="bounce">
      <div v-if="isShow" class="modal-container">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-modal',
  props: {
    
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    setTimeout(() => {
      this.isShow = true
    })
  }
}
</script>

<style lang="scss" scoped>

// 動畫進出
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal {
  &-wrapper {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;

  }
  &-container {
    width: 80%;
    height: 80%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 3px 3px 5px 1px #999;
    padding: 8px;
  }
}
</style>