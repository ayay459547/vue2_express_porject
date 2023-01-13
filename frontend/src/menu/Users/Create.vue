<template>
  <v-modal 
    title="新增使用者"
    @close="close"
    @submit="submit"
  >
    <div>
      <form-input
        v-model="postData.name"
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
        v-model="postData.menuList"
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
        name: '',
        account: '',
        password: '',
        menuList: []
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
      this.$bus.$emit('upload', { type: 'open' })

      try {
        this.$request({
          url: '/menu/createUser',
          method: 'post',
          data: this.postData
        }, {}).then(resData => {
          if (resData.status === 'success') {
            this.$emit('submit')
          } else {
            throw(resData.msg)
          }
        })
      } catch (e) {
        this.swal({
          icon: 'error',
          title: '獲取個人資料失敗!',
          text: '請洽詢服務人員'
        })
      } finally {
        this.$bus.$emit('upload', { type: 'close' })
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
