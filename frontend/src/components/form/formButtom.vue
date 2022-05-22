<template>
  <el-button
    :size="size"
    :type="type"
    :disabled="disabled"
    :round="round"
    @click="$emit('click')"
  >
    <font-awesome-icon v-if="iconPosition === 'front' && !isEmpty(icon, 'String')" :icon="icon"/>
    <label class="form-label">{{ label }}</label>
    <font-awesome-icon v-if="iconPosition === 'back' && !isEmpty(icon, 'String')" :icon="icon"/>
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
      type: String,
      default: ''
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  &-label {
    display: inline-block;
    padding: 4px 8px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>