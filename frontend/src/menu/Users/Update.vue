<template>
  <v-modal 
    title="編輯使用者"
    @close="close"
  >
    <div>測試</div>
  </v-modal>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
