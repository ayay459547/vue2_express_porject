<template>
  <div class="flex-column c-ga-md full-height">
    <div>
      <form-button
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
      <template #header-action>操作</template>
      <template #column-action="{ rowData }">
        <div class="flex content-evenly">
          <form-button
            icon="fa-solid fa-pen-to-square"
            type="warning"
            hover-label="編輯"
            @click="openCreate(rowData)"
          />
          <form-button
            icon="fa-solid fa-trash-can"
            type="danger"
            hover-label="刪除"
            @click="deleteData(rowData)"
          />
        </div>
      </template>
    </v-table>

    <Create v-if="modal.create" @close="closeCreate"/>
    <Update v-if="modal.update > 0" @close="closeUpdate"/>
  </div>
</template>

<script>
import { tableData as FakeData } from './FakeData'
import Create from './Create'
import Update from './Update'

export default {
  components: {
    Create,
    Update
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
        create: false,
        update: 0
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
      this.modal.create = true
    },
    closeCreate () {
      this.modal.create = false
    },
    openUpdate (row) {
      this.modal.update = row.id
    },
    closeUpdate () {
      this.modal.update = 0
    },
    deleteData (scope) {
      console.log(scope)
    }
  },
  async created () {
    await this.$store.dispatch('options/init')

    this.init()
  }
}
</script>

<style>

</style>