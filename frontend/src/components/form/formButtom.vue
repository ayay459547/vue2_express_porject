<template>
  <el-button 
    :size="size"
    :type="type"
  >
    <!-- <font-awesome-icon v-if="iconPosition === 'front'" :icon="icon"/> -->
    {{ label }}
    <!-- <font-awesome-icon v-if="iconPosition === 'back'" :icon="icon"/> -->
  </el-button>
</template>

<script>
export default {
  name: 'formButtom',
  props: {
    label: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'front'
    },
    icon: {
      type: Array,
      default: []
    },
    size: {
      type: String,
      default: '',
      description: 'medium / small / mini'
    },
    type: {
      type: String,
      default: '',
      description: 'primary / success / warning / danger / info / text'
    }
  }
}
</script>

<style>

</style>