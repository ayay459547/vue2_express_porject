<template>
  <div class="form-container">
    <label class="form-label">{{ label }}</label>
    <el-input 
      v-model="tempValue"
      class="form-input"
      :type="type"
      :placeholder="placeholder"
    ></el-input> 
  </div>
</template>

<script>
export default {
  name: 'form-input',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '輸入內容'
    }
  },
  computed: {
    tempValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &-container {
    // border: 1px solid gray;
    height: fit-content;
  }
  &-label {
    display: block;
    padding: 6px 4px;
    font-weight: 600;
  }
}
</style>