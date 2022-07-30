<template>
  <div class="login-fixed">
    <div class="login-wrapper">
      <div class="login-blur"></div>
      <form class="login-container">
        <label class="login-label">管理系統</label>

        <form-input
          class="login-input"
          v-model="postData.account"
          label="帳號"
          placeholder="請輸入帳號"
        />
        <form-input
          class="login-input"
          v-model="postData.password"
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
        />

        <form-buttom
          label="登入"
          size="mini"
          icon="fa-solid fa-right-to-bracket"
          round
          :btn-style="{
            marginTop: '32px',
            width: '100px'
          }"
          @click="submit"
        />

        <div class="login-other">
          <div class="login-icon">
            <font-awesome-icon class="i" icon="fa-brands fa-github"/>
          </div>
          <div class="login-icon">
            <font-awesome-icon class="i" icon="fa-brands fa-google"/>
          </div>
          <div class="login-icon">
            <font-awesome-icon class="i" icon="fa-brands fa-instagram-square"/>
          </div>
          <div class="login-icon">
            <font-awesome-icon class="i" icon="fa-brands fa-facebook"/>
          </div>
        </div>

        <div class="login-sign">
          <span class="sign">XieZhenZhan</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       postData: {
         account: '',
         password: ''
       }
    }
  },
  methods: {
    login () {
      return this.$request({
        url: '/views/login',
        method: 'post',
        data: this.postData
      }, {}).then((resData) => {
        if (resData.status !== 'success') {
          throw(e)
        }

        return resData.data
      })
    },
    status (userId) {
      return this.$request({
        url: '/views/setStatus',
        method: 'post',
        data: {
          userId
        }
      }, {}).then((resData) => {
        if (resData.status !== 'success') {
          throw(e)
        }
      })
    },
    async submit () {
      try {
        let userId =  await this.login()

        if (userId > 0) {
          await this.status(userId)

          // this.swal({
          //   icon: 'success',
          //   title: '登入成功!',
          //   text: '歡迎使用'
          // })
          this.$emit('init')
        } else {
          this.swal({
            icon: 'error',
            title: '帳號或密碼錯誤!',
            text: '請重新輸入'
          })
        }

      } catch (e) {
        this.swal({
          icon: 'error',
          title: '系統錯誤!',
          text: '請聯絡服務人員'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// icon hover
// https://www.youtube.com/watch?v=fDm0WJ_66d0
.login {
  &-fixed {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
  &-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-blur {
    filter: blur(200px);
    position: absolute;
    background:linear-gradient(45deg, rgb(82, 169, 231) 10%, rgb(126, 190, 235) 100%);
    width: 100%;
    height: 100%;
  }
  &-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 500px;
    min-height: 550px;
    height: 80%;
    padding: 72px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  }

  &-label {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 16px;
  }

  &-input {
    margin-top: 16px;
    width: 300px;
  }

  &-other {
    margin-top: 32px;
    width: 300px;
    display: flex;
    justify-content: space-evenly;
    height: fit-content;
  }

  &-icon {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0px 1px 45px rgba(204, 204, 204, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

    .i {
      color: rgb(20, 98, 149);
      font-size: 2em;
      transition: font-size 0.2s, color 0.3s;
      position: relative;
    }

    &::before {
      content: "";
      position: absolute;
      width: 140%;
      height: 140%;
      background-color: rgb(91, 174, 234);
      transform: rotateZ(45deg);
      left: -120%;
      top: 80%;
    }

    &:hover {
      .i {
        color: #fff;
        font-size: 2.3em;
      }

      &::before {
        animation: hover-icon 0.8s 1;
        left: -20%;
        top: -20%;
      }
    }
  }

  &-sign {
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 2em;
  }
}

@keyframes hover-icon {
  0% {
    left: -120%;
    top: 80%;
  } 70% {
    left: 0%;
    top: -40%;
  } 100% {
    left: -20%;
    top: -20%;
  }
}

@media (max-width: 768px) {
  .login {
    &-container {
      width: 80%;
      height: 80%;
      padding: 64px 16px;
      align-items: center;
    }

    &-input,
    &-other,
    &-buttom {
      width: 75%;
    }

    &-sign {
      position: relative;
      bottom: 0;
      right: 0;
      margin-top: 32px;
    }
  }
}

@media (max-width: 576px) {
  .login {
    &-container {
      width: 100%;
      height: 100%;
      padding: 64px 16px;
      align-items: center;
    }

    &-input,
    &-other,
    &-buttom {
      width: 85%;
    }

    &-sign {
      position: relative;
      bottom: 0;
      right: 0;
      margin-top: 32px;
    }
  }
}
</style>