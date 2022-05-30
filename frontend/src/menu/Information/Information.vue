<template>
  <div>
    <label>{{ `hi ${userName}` }}</label>
    <img style="width: 100px; height: 100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX5k94cAPnOWjNkkpK166JMSiQyjDq0KF4UQ&usqp=CAU" alt="cat">
  </div>
</template>

<script>
export default {
  computed: {
    userName () {
      return this.$store.state.user.name
    }
  }
}
</script>

<style>

</style>