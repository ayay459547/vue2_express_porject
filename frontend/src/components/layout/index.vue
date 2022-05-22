<template>
  <div class="layout-container">
    <logo/>
    <hamburger :is-open.sync="isOpen"/>
    <v-nav :is-open.sync="isOpen"/>
    <v-content/>
  </div>
</template>

<script>
import content from './content'
import hamburger from './hamburger'
import nav from './nav'
import logo from './logo'

export default {
  components: {
    'v-content': content,
    'v-nav': nav,
    hamburger,
    logo
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>