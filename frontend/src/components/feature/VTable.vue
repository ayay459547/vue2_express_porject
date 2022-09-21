<template>
  <div v-loading="loading" class="table-container">
    <template v-if="isSet(renderColumn, 'array')">
      <el-table
        v-if="isShowTable"
        :data="listData"
        ref="table"
        class="table-el"
        style="width: 100%"
        height="100%">
          <el-table-column v-for="column in renderColumn" v-bind="column" :key="`${column.prop}`">
            <template v-if="slotList.includes(`header-${column.prop}`)" v-slot:header="scope">
              <slot :name="`header-${column.prop}`" v-bind="scope"></slot>
            </template>
            <template v-if="slotList.includes(`column-${column.prop}`)" v-slot:default="scope">
              <slot 
                v-if="scope.row"
                :name="`column-${column.prop}`"
                :row="scope.row"
                :row-index="scope.$index"
                :scope="scope"
                v-bind="getBindData(scope)"
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
      return Object.keys(this.$slots)
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
    tableData: {
      handler: 'init',
      deep: true,
      immediate: false
    }
  },
  methods: {
    init () {
      this.$deepClone(this.listData, this.tableData)

      setTimeout(() => {
        this.isShowTable = true
      }, 100)

      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    getBindData (scope) {
      const scopeData = {
        rowData: scope.row,
        rowIndex: scope.$index,
        scope
      }
      return scopeData
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