 <template>
  <div style="display: contents">
     <el-tooltip 
      v-if="!isEmpty(hoverLabel, 'String')"
      class="item" 
      effect="dark"
      :content="hoverLabel" 
      placement="top"
    >
      <el-button
        :size="size"
        :type="type"
        :disabled="disabled"
        :round="round"
        :style="btnStyle"
        :class="btnClass"
        class="el-btn"
        @click="$emit('click')"
      >
        <font-awesome-icon 
          v-if="iconPosition === 'front' && !isEmpty(icon, 'String')"
          :icon="icon"
          class="form-icon"
        />
        <label v-if="isSet(label, 'String')" class="form-label">{{ label }}</label>
        <font-awesome-icon 
          v-if="iconPosition === 'back' && !isEmpty(icon, 'String')" 
          :icon="icon"
          class="form-icon"
        />
      </el-button>
     </el-tooltip>

     <el-button
        v-else
        :size="size"
        :type="type"
        :disabled="disabled"
        :round="round"
        :style="btnStyle"
        :class="btnClass"
        class="el-btn"
        @click="$emit('click')"
      >
        <font-awesome-icon 
          v-if="iconPosition === 'front' && !isEmpty(icon, 'String')" 
          :icon="icon"
          class="form-icon"
        />
        <label v-if="isSet(label, 'string')" class="form-label">{{ label }}</label>
        <font-awesome-icon 
          v-if="iconPosition === 'back' && !isEmpty(icon, 'String')" 
          :icon="icon"
          class="form-icon"
        />
      </el-button>
  </div>
</template>

<script>
export default {
  name: 'formButtom',
  props: {
    label: {
      type: String,
      default: ''
    },
    hoverLabel: {
      type: String,
      default: '',
      description: 'hover 顯示提示文字'
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
      default: 'mini',
      description: 'medium / small / mini'
    },
    type: {
      type: String,
      default: 'primary',
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
    btnStyle: {
      type: [Object, String],
      default () {
        return {}
      }
    },
    btnClass: {
      type: [Array, Object, String],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-btn {
  padding: 6px 10px;
}
.form {
  &-label {
    display: inline-block;
    padding: 4px 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1.2em;
  }

  &-icon {
    font-size: 1.3em;
  }
}
</style>