<template>
  <div class="menu-container" :class="isOpen ? 'open' : 'close'">
    <ul v-if="!isEmpty(menu)" class="menu-list">
      <li
        v-for="menuItem in menu" 
        :key="menuItem.id" 
        class="menu-item"
        @click="changeRouter(menuItem)"
      >
        <font-awesome-icon icon="fa-solid fa-user-secret" />
        <div class="item-name">
          {{ menuItem.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      menu: []
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menu.menuList
    },
    currentMenu () {
      return this.$store.state.menu.currentMenu
    }
  },
  methods: {
    async init () {
      try {
        await new Promise(resolve => {
          setTimeout(() => {
            this.$deepClone(this.menu, this.menuList, this.$set)
            resolve(this.menuList)
          })
        })
      } catch (e) {
        this.swal({
          icon: 'error',
          title: '獲取選單資料失敗!',
          text: '請洽詢服務人員'
        })
      }
    },
    changeRouter (menuItem) {
      this.$emit('update:is-open', false)

      if (this.currentMenu.id === menuItem.id) {
        this.$bus.$emit('init')
        return
      }
      if (!this.isEmpty(menuItem.router)) {
        this.$store.commit('menu/setCurrentMenu', menuItem)
        this.$router.push({ name: menuItem.name })
        // this.$router.push({ path: `/${menuItem.id}` })
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.menu {
  &-container {
    position: fixed;
    width: calc(100% - 300px);
    top: 15px;
    right: 50%;
    transform: translateX(50%);
    z-index: 777;
    overflow: hidden;

    transition: width 0.3s;
  }
  &-list {
    width: 100%;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    align-items: center;
  }
  &-item {
    color: #fff;
    font-size: 1.2em;
    width: fit-content;
    height: 46px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    padding: 0 12px;
    background-color: #5e95d3;
    transition: background-color 0.3s;
    
    .item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 12px;
      transition: transform 0.3s;
    }

    &:hover {
      background-color: #3b77bd;
      .item-name {
        transform: translateX(4px);
      }
    }
  }
}

@media (max-width: 1200px) {
  .menu {
    &-container {
      top: 100px;
      right: 50px;
      width: 200px;
      border-radius: 6px;
      transform: translateX(0);

      &.close {
        width: 0;
      }
    }
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0px;
      align-items: flex-start;
    }
    &-item {
      width: 100%;
      border-radius: 0;
    }
  }
}

@media (max-width: 760px) {
  .menu {
    &-container {
      top: 90px;
      right: 30px;
      width: 170px;
      border-radius: 6px;
      transform: translateX(0);

      &.close {
        width: 0;
      }
    }
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0px;
      align-items: flex-start;
    }
    &-item {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>