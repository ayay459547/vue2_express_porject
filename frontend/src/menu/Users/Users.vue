<template>
  <div class="flex-column c-ga-md full-height">
    <div>
      <form-buttom
        icon="fa-solid fa-pen-to-square"
        type="primary"
        label="新增"
        btnClass="c-mt-sm"
        @click="openCreate"
      />
    </div>

    <v-table
      :table-data="tableData"
      :table-columns="tableColumns"
      :after-columns="afterColumns"
    >
      <template v-slot:header-action>操作</template>
      <template v-slot:column-action>
        <div class="flex content-evenly">
          <form-buttom
            icon="fa-solid fa-pen-to-square"
            type="warning"
            hover-label="編輯"
            @click="openCreate"
          />
          <form-buttom
            icon="fa-solid fa-trash-can"
            type="danger"
            hover-label="刪除"
          />
        </div>
      </template>
      <template v-slot:column-menuNameList="scope">
        <span v-if="isSet(scope, 'Object', true)">
          {{ logAny(777) }}
        </span>
      </template>
    </v-table>

    <Create v-if="modal.create"/>
  </div>
</template>

<script>
import { tableData as FakeData } from './FakeData'
import Create from './Create'

export default {
  components: {
    Create
  },
  data () {
    return {
      FakeData,
      tableData: [],
      tableColumns: [
        {
          prop: 'name',
          label: '使用者名稱',
          width: "150"
        },
        {
          prop: 'account',
          label: '帳號',
          width: "150"
        },
        {
          prop: 'menuNameList',
          label: '功能列表',
          minWidth: "200"
        }
      ],
      afterColumns: [
        {
          prop: 'action',
          label: '操作',
          align: 'center',
          width: "120"
        }
      ],
      modal: {
        create: false
      }
    }
  },
  methods: {
    async init () {
      this.$bus.$emit('loading', { type: 'open' })

      try {
        let { data: userData } = await this.getData()
        
        this.$deepClone(this.tableData, userData.map(item => {
          return {
            ...item,
            menuNameList: item.menuList.map(menuItem => menuItem.name).join(' , ')
          }
        }))
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
        url: '/menu/userList',
        method: 'get'
      }, FakeData).then(resData => {
        return resData
      })
    },
    openCreate () {
      console.log(123)
      this.modal.create = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>

</style>