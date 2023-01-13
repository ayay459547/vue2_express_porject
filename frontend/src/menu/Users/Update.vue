<template>
  <v-modal
    title="編輯使用者"
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
      <form-button
        :label="isChangePassword ? '取消更換' : '更換密碼'"
        icon="fa-solid fa-pen-to-square"
        type="danger"
        btn-class="c-my-md"
        @click="changeShowPassword"
      />
      <form-input
        v-if="isChangePassword"
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
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isChangePassword: false,
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
    async init () {
      this.$bus.$emit('loading', { type: 'open' })

      try {
        let { data: userData } = await this.getData()
        
        
        this.$deepClone(this.postData, userData)
      } catch (e) {
        console.log(e)

        this.swal({
          icon: 'error',
          title: '獲取使用者資料失敗!',
          text: '請洽詢服務人員'
        })
      } finally {
        this.$bus.$emit('loading', { type: 'close' })
      }
    },
    getData () {
      return this.$request({
        url: '/menu/getUser',
        method: 'post',
        data: {
          userId: this.userId
        }
      }, {}).then(resData => {
        return resData
      })
    },
    changeShowPassword () {
      this.isChangePassword = !this.isChangePassword
      this.postData.password = ''
    },
    submit () {
      this.$bus.$emit('upload', { type: 'open' })

      try {
        this.$request({
          url: '/menu/updateUser',
          method: 'put',
          data: {
            userId: this.userId,
            ...this.postData
          }
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
          title: '更新個人資料失敗!',
          text: '請洽詢服務人員'
        })
      } finally {
        this.$bus.$emit('upload', { type: 'close' })
      }
    },
    close () {
      this.$emit('close')
    }
  },
  created() {
    this.init()
  }
}
</script>
