<template>
  <div class="form-container">
    <label class="form-label">{{ label }}</label>
    <el-select 
      v-model="tempValue"
      class="form-select"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :multiple="multiple"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'form-select',
  props: {
    value: {
      type: [Number, Array],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: [
        {
          label: '無選項',
          value: null
        }
      ]
    },
    placeholder: {
      type: String,
      default: '選擇選項'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
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
  &-select {
    width: 100%;
  }
}
</style>