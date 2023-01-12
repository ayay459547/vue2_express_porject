<template>
  <div class="modal-wrapper flex-center">
    <transition name="bounce">
      <div v-if="isShow" class="modal-container">
        <div class="modal-header">
          <div class="modal-title">{{ title }}</div>
          <div>
            <form-button
              icon="fa-solid fa-xmark"
              type="info"
              hover-label="關閉"
              @click="closeModal"
            />
          </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <form-button
              icon="fa-solid fa-xmark"
              type="warning"
              btnClass="c-mt-sm"
              label="取消"
              @click="closeModal"
            />
            <form-button
              icon="fa-solid fa-check"
              type="success"
              btnClass="c-mt-sm"
              label="確認"
              @click="submitModal"
            />
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-modal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    closeModal () {
      this.isShow = false
      // 等動畫結束 再關閉
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    },
    submitModal () {
      this.$emit('submit')
    }
  },
  mounted () {
    this.isShow = true
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
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;

  }
  &-container {
    width: 70%;
    height: 70%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 3px 3px 5px 1px #999;
    padding: 8px;

    display: flex;
    flex-direction: column;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #999;
  }
  &-title {
    font-size: 1.2em;
    font-weight: 600;
  }
  &-body {
    flex: 1;
    padding: 8px;
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    border-top: 1px solid #999;
  }
}
</style>