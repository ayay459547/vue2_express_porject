<template>
  <div class="logo">
    <img class="logo-img" alt="CareerVantage" src="@/assets/img/logo.png">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  z-index: 888;
  top: 5px;
  left: 30px;

  transition: top 0.3s, left 0.3s;
  &-img {
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 1200px) {
  .logo {
    top: 30px;
    left: 40px;

    &-img {
      width: 60px;
      height: 60px;
    }
  }
}

@media (max-width: 768px) {
  .logo {
    top: 20px;
    left: 30px;

    &-img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>