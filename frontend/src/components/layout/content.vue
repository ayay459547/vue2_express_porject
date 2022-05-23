<template>
  <div class="content-wrapper">
    <div class="content-top"></div>
    <div class="content-container c-pa-lg">
      {{ 'hi' + userName}}
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-content',
  data () {
    return {}
  },
  computed: {
    userName () {
      return this.$store.state.user.name
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  &-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-top {
    width: 100%;
    height: 100%;
    background-color: #aac8eb;

    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-container {
    padding: 4px 2px;
    overflow: hidden;

    width: 100%;
    height: calc(100% - 75px);
    background-color: #fff;

    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 0;

    border-radius: 15px 15px 0 0;
    transition: border-radius 1s, height 0.3s;
  }
}

@media (max-width: 1200px) {
  .content {
    &-container {
      height: calc(100% - 65px);
      border-radius: 40px 40px 0 0;
    }
  }
}

@media (max-width: 768px) {
  .content {
    &-container {
      height: calc(100% - 55px);
      border-radius: 40px 40px 0 0;
    }
  }
}
</style>