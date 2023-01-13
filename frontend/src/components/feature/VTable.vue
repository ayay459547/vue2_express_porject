<template>
  <div v-loading="loading" class="table-container">
    <template v-if="isSet(renderColumn, 'array')">
      <el-table
        v-if="isShowTable"
        ref="table"
        class="table-el"
        style="width: 100%"
        height="100%"
        :data="listData"
      >
          <el-table-column v-for="column in renderColumn" v-bind="column" :key="`${column.prop}`">
            <template v-if="slotList.includes(`header-${column.prop}`)" v-slot:header="scope">
              <slot 
                :name="`header-${column.prop}`" 
                v-bind="scope"
              ></slot>
            </template>
            <template v-if="slotList.includes(`column-${column.prop}`)" v-slot:default="scope">
              <slot
                :name="`column-${column.prop}`"
                :row-data="scope.row"
                :row-index="scope.$index"
                :column-key="column.prop"
                :scope-props="scope"
              ></slot>  
            </template>
          </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'v-table',
  props: {
    tableKey: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default () {
        return []
      },
      description: '資料列表'
    },
    befaultColumns: {
      type: Array,
      default () {
        return []
      },
      description: '固定浮動左邊 columnList'
    },
    tableColumns: {
      type: Array,
      default () {
        return []
      },
      description: '一般 columnList'
    },
    afterColumns: {
      type: Array,
      default () {
        return []
      },
      description: '固定浮動右邊 columnList'
    }
  },
  data () {
    return {
      isShowTable: false,
      listData: [],
      loading: true
    }
  },
  computed: {
    slotList () {
      // console.log(this)
      // console.log(Object.keys(this.$slots))
      return Object.keys(this.$scopedSlots)
    },
    renderColumn ({ tableColumns, befaultColumns, afterColumns }) {
      return []
        .concat(tableColumns)
        .concat(befaultColumns.map(column => {
          return {
            ...column,
            fixed: 'left'
          }
        }))
        .concat(afterColumns.map(column => {
          return {
            ...column,
            fixed: 'right'
          }
        }))
    }
  },
  watch: {
    tableKey: {
      handler: 'init',
      immediate: true
    }
    // tableData: {
    //   handler: 'init',
    //   deep: false,
    //   immediate: false
    // }
  },
  methods: {
    init () {
      this.listData.splice(0)
      this.$deepClone(this.listData, this.tableData)

      this.isShowTable = false
      this.loading = true

      setTimeout(() => {
        this.isShowTable = true
      }, 100)

      setTimeout(() => {
        this.loading = false
      }, 500)

      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  &-container {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    overflow: hidden;
  }
}
</style>