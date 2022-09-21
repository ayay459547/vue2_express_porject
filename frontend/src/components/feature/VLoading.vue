<template>
  <transition name="fade">
    <div v-if="isShow" class="loading-wrapper">
      <div class="loading-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p class="loading-text">{{ text }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      defaultText: 'loading ...',
      isShow: false,
      text: '',
      isError: false,
      openTime: null,
      minTime: 300
    }
  },
  watch: {
  //   isShow (newValue, oddValue) {
  //     if (newValue) {
  //       setTimeout(() => {
  //         if (this.isError) {
  //           this.swal({
  //             icon: 'error',
  //             title: '獲取資料超時或失敗',
  //             text: '請洽詢服務人員'
  //           })
  //         }
  //         this.close()
  //       }, 10000);
  //     }
  //   }
  },
  methods: {
    open () {
      this.isShow = true
      this.isError = true
    },
    close () {
      this.isShow = false
      this.isError = false
    }
  },
  created () {
    this.$bus.$on('loading', ({ type, msg = '' }) => {

      if (!this.isEmpty(msg, 'string')) {
        this.text = msg
      } else {
        this.text = this.defaultText
      }

      switch (type) {
        case 'open':
          this.open()
          this.openTime = null
          this.openTime = Date.now()
          break
        case 'close':
          // 強制間格超過300毫秒
          if (Date.now() >= this.openTime + this.minTime) {
            this.close()

          } else {
            setTimeout(() => {
              this.close()
            }, this.minTime)
          }
          break
      }
    })
  },
  beforeDestory () {
    this.$bus.$off('loading')
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loading {
  &-wrapper {
    position: fixed;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 16px;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    background: rgba(33, 33, 33, 0.6);
  }

  &-container {
    $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
    display: flex;

    .dot {
      position: relative;
      width: 1.2em;
      height: 1.2em;
      margin: 0.8em;
      border-radius: 50%;

      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: wave 1s ease-out infinite;
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          background: nth($colors, $i);

          &::before {
            animation-delay: $i * 0.2s;
          }
        }
      }
    }
  }

  &-text {
    font-size: 1.2em;
    color: #fff;
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}

</style>