<script setup lang="ts">
import { ref } from 'vue';
import { ColorPicker } from 'vue-accessible-color-picker';
import UiButtonIcon from './UiButtonIcon.vue';
import IconChevronDown from '../icons/IconChevronDown.vue';
import UiColorCircle from './UiColorCircle.vue';

type Color = {
  colors: {
    hex: string;
    hsl: { h: number; s: number; l: number; a: number };
    hsv: { h: number; s: number; v: number; a: number };
    hwb: { h: number; w: number; b: number; a: number };
    rgb: { r: number; g: number; b: number; a: number };
  };
  cssColor: string;
};

const props = defineProps<{
  name: string;
  color?: string;
}>();
const emit = defineEmits(['update:color']);

const isOpenPicker = ref(false);
const colorInternal = ref(props.color || '#7A63FF');

const handleTogglePicker = () => {
  isOpenPicker.value = !isOpenPicker.value;
};

const handleColorChanged = (color: Color) => {
  colorInternal.value = color.colors.hex;
  emit('update:color', color.colors.hex);
};
</script>

<template>
  <div :class="$style.uiGroupFieldWidth">
    <div :class="$style.uiGroupField">
      <span :class="`${$style.uiGroupFieldTitle} ${$style.uiGroupFieldTitleActive}`">
        {{ name }}
      </span>

      <div :class="$style.uiGroupFieldSelect">
        <span>{{ colorInternal }}</span>

        <UiButtonIcon type="button" @click="handleTogglePicker">
          <UiColorCircle :size="24" :color="colorInternal" />

          <IconChevronDown :style="{ transform: `rotate(${isOpenPicker ? '180deg' : '0deg'})` }" />
        </UiButtonIcon>
      </div>
    </div>

    <ColorPicker
      v-show="isOpenPicker"
      :class="$style.uiGroupFieldWidth"
      :color="colorInternal"
      @color-change="handleColorChanged"
    />
  </div>
</template>

<style>
@import url('vue-accessible-color-picker/styles');
</style>

<style module>
.uiGroupFieldWidth {
  max-width: 100%;
  min-width: 100%;
}

.uiGroupField {
  width: 100%;
  padding: 26px 20px 10px 20px;
  display: block;
  position: relative;
  border: 1px solid #dbdfe9;
  border-radius: 10px;
}

.uiGroupFieldTitle {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);

  color: #99a1b7;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.uiGroupFieldTitleActive {
  top: 10px;
  transform: none;

  font-size: 12px;
  line-height: 16px;
}

.uiGroupFieldSelect {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 24px;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
