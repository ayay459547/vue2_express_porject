<template>
  <transition name="fade">
    <div v-if="isShow" class="loading-wrapper">
      <div class="loading-container">
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <p class="word">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      text: 'loading',
      isError: false
    }
  },
  watch: {
    isShow (newValue, oddValue) {
      if (newValue) {
        setTimeout(() => {
          if (this.isError) {
            this.swal({
              icon: 'error',
              title: '獲取資料失敗',
              text: '請洽詢服務人員'
            })
          }
          this.close()
        }, 10000);
      }
    }
  },
  methods: {
    open () {
      this.isShow = true
      this.isError = true
    },
    close () {
      this.isShow = false
      this.isError = false
    },
    setText (text) {
      this.text = text
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loading {
  &-wrapper {
    position: fixed;
    z-index: 99999;
    display: flex;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    background: rgba(0, 0, 0, 0.6);
  }

  &-container {
    position: relative;
    width: 4rem;
    height: 4rem;
    transform-style: preserve-3d;
    perspective: 800px;
    .word {
      color: #fff;
      text-align: center;
      transform: translateY(80px);
      white-space: nowrap;
    }

    .arc {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border-bottom: 3px solid #fff;

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation: rotate#{$i} 1.15s linear infinite;
        }
      }

      &:nth-child(1) {
        animation-delay: -0.8s;
      }

      &:nth-child(2) {
        animation-delay: -0.4s;
      }

      &:nth-child(3) {
        animation-delay: 0s;
      }
    }
  }
}

@keyframes rotate1 {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(1turn);
  }
}

@keyframes rotate2 {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
  }

  to {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(1turn);
  }
}

@keyframes rotate3 {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(1turn);
  }
}

</style>