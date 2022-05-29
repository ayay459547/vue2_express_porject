<template>
  <div class="menu-container" :class="isOpen ? 'open' : 'close'">
    <ul v-if="!isEmpty(menuList, 'array')" class="menu-list">
      <li
        v-for="menuItem in menuList" 
        :key="menuItem.id" 
        class="menu-item"
        @click="changeRouter(menuItem)"
      >
        <font-awesome-icon :icon="menuItem.icon"/>
        <div class="item-name">
          {{ menuItem.name }}
        </div>
      </li>

      <li class="menu-item" @click="logout">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        <div class="item-name">登出</div>
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
  computed: {
    menuList () {
      return this.$store.state.menu.menuList
    },
    currentMenu () {
      return this.$store.state.menu.currentMenu
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
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
  }
}
</script>

<style lang="scss" scoped>
.menu {
  &-container {
    position: fixed;
    width: calc(100% - 300px);
    top: 0px;
    right: 0px;
    // right: 50%;
    // transform: translateX(50%);
    z-index: 777;
    overflow: hidden;
    transition: width 0.3s;
  }
  &-list {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-item {
    color: #fff;
    font-size: 1.1em;
    width: fit-content;
    height: 60px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding: 0 12px;
    background-color: #5e94d3;
    transition: background-color 0.3s;
    
    .item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 16px;
      transition: transform 0.3s;
    }

    &:hover {
      background-color: #3b77bd;
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
      background-color: #5e95d3;
      width: 100%;
      border-radius: 0;
    }
  }
}

@media (max-width: 768px) {
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
      background-color: #5e95d3;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>