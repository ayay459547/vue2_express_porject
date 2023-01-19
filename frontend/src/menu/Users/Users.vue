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
      ref="userTable"
      :table-key="tableKey"
      :table-columns="tableColumns"
      :after-columns="afterColumns"
      :table-data="tableData"
      :table-data-count="tableDataCount"
      :pageSize="pageSize"
      @change-page="changePage"
    >
      <template #header-action>操作</template>
      <template #column-action="{ rowData }">
        <div class="flex content-evenly">
          <form-button
            icon="fa-solid fa-pen-to-square"
            type="warning"
            hover-label="編輯"
            @click="openUpdate(rowData)"
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

    <Create 
      v-if="modal.create" 
      @close="closeCreate" 
      @submit="submitCreate"
    />
    <Update 
      v-if="modal.update > 0" 
      :userId="modal.update"
      @close="closeUpdate"
      @submit="submitUpdate"
    />
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
      tableKey: 0,
      pageSize: 3,
      tableData: [],
      tableDataCount: 50,
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
      },
      filterData: {}
    }
  },
  methods: {
    async init (currentPage = 1) {
      this.$bus.$emit('loading', { type: 'open' })

      try {
        let [{ data: userData }, { data: userCount }] = await Promise.all([
          this.getData(currentPage),
          this.getCount()
        ])

        this.tableData.splice(0)
        this.$deepClone(this.tableData, userData.map(item => {
          return {
            ...item,
            menuNameList: item.menuList.map(menuItem => menuItem.name).join(' , ')
          }
        }))

        this.tableDataCount = userCount
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
    // 只有初始化會用到
    getData (currentPage) {
      return this.$request({
        url: '/menu/getUserList',
        method: 'post',
        data: {
          pageSize: this.pageSize,
          currentPage,
          filter: this.filterData
        }
      }, FakeData).then(resData => {
        return resData
      })
    },
    getCount () {
      return this.$request({
        url: '/menu/getUserCount',
        method: 'post',
        data: {
          filter: this.filterData
        }
      }, {}).then(resData => {
        return resData
      })
    },
    // create
    openCreate () {
      this.modal.create = true
    },
    closeCreate () {
      this.modal.create = false
    },
    async submitCreate () {
      this.modal.create = false
      await this.init()
      this.tableKey++
    },
    // update
    openUpdate (rowData) {
      this.modal.update = rowData.id
    },
    closeUpdate () {
      this.modal.update = 0
    },
    async submitUpdate () {
      this.modal.update = 0
      await this.init()
      this.tableKey++
    },
    async deleteData (rowData) {
      const res = await this.swal({
        icon: 'warning',
        title: `確定刪除 ${rowData?.name ?? ''}!`,
        text: '刪除將無法返回',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      })
      if (res?.isConfirmed ?? false) {
        try {
          this.$request({
            url: '/menu/deleteUser',
            method: 'delete',
            data: { userId: rowData.id }
          }, {}).then(async resData => {
            if (resData.status === 'success') {
              await this.init()
              this.tableKey++
            } else {
              throw(resData.msg)
            }
          })
        } catch (e) {
          this.swal({
            icon: 'error',
            title: '刪除使用者失敗!',
            text: '請洽詢服務人員'
          })
        }
      }
    },
    async changePage (currentPage) {
      await this.init(currentPage)
      this.tableKey++
    }
  },
  async created () {
    await Promise.all([
      this.$store.dispatch('options/init'),
      this.init()
    ])

    this.tableKey++
  }
}
</script>

<style>

</style>