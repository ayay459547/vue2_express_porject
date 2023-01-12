<template>
  <v-modal 
    title="新增使用者"
    @close="close"
    @submit="submit"
  >
    <div>
      <form-input
        v-model="postData.userName"
        label="使用者名稱"
        placeholder="請輸入名稱"
      />
      <form-input
        v-model="postData.account"
        label="帳號"
        placeholder="請輸入帳號"
      />
      <form-input
        v-model="postData.password"
        type="password"
        label="密碼"
        placeholder="請輸入密碼"
      />
      <form-select
        v-model="postData.menu"
        type="password"
        label="功能"
        placeholder="請選擇功能"
        multiple
        clearable
        :options="menuOptions"
      />
    </div>
  </v-modal>
</template>

<script>
export default {
  data () {
    return {
      postData: {
        userName: '',
        account: '',
        password: '',
        menu: []
      }
    }
  },
  computed: {
    menuOptions () {
      return this.$store.state.options.menu
    }
  },
  methods: {
    submit () {
      this.$request({
        url: '/menu/users',
        method: 'post',
        data: this.postData
      }, {}).then(resData => {
        if (resData.state === 'success') {
          this.$emit('close')
        } else {
          console.log('error')
        }
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
