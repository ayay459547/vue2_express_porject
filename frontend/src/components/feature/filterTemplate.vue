<template>
  <div class="card filter-container" :class="isLock ? 'open' : 'close'">
    <div class="filter-header" @click="isLock = !isLock">
      <div>
        <font-awesome-icon :icon="['fas', 'search']"/>
        <span>Filter</span>
      </div>
      <div class="filter-angle">
        <font-awesome-icon :icon="['fas', 'angle-up']" :class="isLock ? 'open' : 'close'"/>
      </div>
    </div>
    <div class="filter-body">
      <slot></slot>
    </div>
    <div class="filter-footer">
      <custom-button
        label="清空篩選"
        :icon="['fas', 'undo-alt']"
        type="danger"
      />
      <custom-button
        label="搜尋"
        :icon="['fas', 'search']"
        type="primary"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'filterTemplate',
  props: {
    defalutLock: {
      type: Boolean,
      default: true,
      description: '預設設否打開'
    }
  },
  data () {
    return {
      // lock 表示打開
      isLock: true
    }
  },
  methods: {
    setLock (v) {
      this.isLock = v
    }
  },
  created () {
    this.isLock = this.defalutLock
  }
}
</script>

<style lang="scss" scoped>
$paddingX: 12px;
$paddingY: 6px;

$hmb: 8px;

.filter {
  &-container {
    height: auto;
    padding: $paddingY $paddingX;
    transition: max-height 0.5s;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 8px;

    &.open {
      max-height: 1000px;
    }
    &.close {
      max-height: 25px;
    }
  }
  &-header {
    display: flex;
    justify-content: space-between;
    color: #1091ff;
    font-size: 1.3em;
    cursor: pointer;
  }
  &-angle {
    font-size: 1.5em;

    .open {
      transition: transform 0.3s;
      transform: rotateZ(180deg);
    }
    .close {
      transition: transform 0.3s;
      transform: rotateZ(0deg);
    }
  }

  &-body {
    flex: 1;
    transition: opacity 0.3s;
    padding: 0 6px;
  }

  &-footer {
    display: flex;
    justify-content: end;
  }
}
</style>