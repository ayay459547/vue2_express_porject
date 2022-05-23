<template>
  <div class="nav-wrapper" :class="isOpen ? 'open' : 'close'">
    <div 
      class="hamburger-wrapper"
      @click="onClickHanburger"
    >
      <div class="hamburger-container" :class="isOpen ? 'open' : 'close'">
        <div class="hamburger-top" :class="isOpen ? 'open' : 'close'"/>
        <div class="hamburger-center" :class="isOpen ? 'open' : 'close'"/>
        <div class="hamburger-bottom" :class="isOpen ? 'open' : 'close'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.name
    }
  },
  methods: {
    onClickHanburger () {
      this.$emit('update:is-open', !this.isOpen)
    }
  }
}
</script>

<style lang="scss" scoped>
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}

%bar-attrs {
  position: absolute;
  width: 50%;
  height: 2px;
  border-radius: 4px;
  background-color: #fff;
  transition: transform 0.3s, opacity 0.2s;
}

$side-length: 50px; // 選單邊長
$revise-length: 14px; // 修正bar原始距離

.hamburger {
  &-wrapper {
    top: 40px;
    right: -60px;
    border-radius: 10%;

    width: $side-length;
    height: $side-length;
    position: fixed;
    z-index: 999;
    cursor: pointer;
    box-shadow: 1px 1px 6px 2px #88b3e7;
    background-color: #4c8ed9;
    
    transition: background-color 0.3s, top 0.3s, right 0.3s, border-radius 0.3s;
    &:hover {
      // border-radius: 20%;
      background-color: #3b77bd;
    }
  }

  &-container {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    @extend %center;

    &:hover,
    &.open {
      transform: rotateZ(180deg);
    }
  }

  &-top {
    @extend %bar-attrs;
    &.open {
      transform: translateY(0px) rotateZ(45deg);
    }
    &.close {
      transform: translateY(calc($side-length / -2 + $revise-length)) rotateZ(0deg);
    }
  }
  &-center {
    @extend %bar-attrs;
    &.open {
      opacity: 0;
    }
    &.close {
      opacity: 1;
    }
  }
  &-bottom {
    @extend %bar-attrs;
    &.open {
      transform: translateY(0px) rotateZ(-45deg);
    }
    &.close {
      transform: translateY(calc($side-length / 2 - $revise-length)) rotateZ(0deg);
    }
  }
}

@media (max-width: 1200px) {
  .hamburger {
    &-wrapper {
      top: 40px;
      right: 50px;
      border-radius: 50%;
    }
  }
}

@media (max-width: 768px) {
  .hamburger {
    &-wrapper {
      top: 30px;
      right: 30px;
      border-radius: 50%;
    }
  }
}
</style>