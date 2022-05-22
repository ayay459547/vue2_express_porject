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
          class="login-bottom"
          label="登入"
          size="mini"
          icon="fa-solid fa-right-to-bracket"
          round
          @click="submit"
        />
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
    submit () {
      console.log(this.postData)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  &-fixed {
    position: fixed;
    z-index: 9999;
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
  }

  &-input {
    margin-top: 16px;
    width: 300px;
    // height: fit-content;
  }
  &-bottom {
    margin-top: 32px;
    width: 100px;
    // height: fit-content;
  }
}
</style>