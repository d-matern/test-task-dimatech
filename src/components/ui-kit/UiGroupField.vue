<script setup lang="ts">
import { ref, type InputHTMLAttributes } from 'vue';

defineProps<{
  name: string;
  attributesInput?: InputHTMLAttributes;
}>();
const modelValue = defineModel();

const isFocusInput = ref(false);

const handleToggleFocusInput = () => {
  isFocusInput.value = !isFocusInput.value;
};
</script>

<template>
  <label :class="$style.uiGroupField">
    <span
      :class="`${$style.uiGroupFieldTitle} ${modelValue || isFocusInput ? $style.uiGroupFieldTitleActive : ''}`"
    >
      {{ name }}
    </span>
    <input
      :class="$style.uiGroupFieldInput"
      v-model="modelValue"
      v-bind="attributesInput"
      @focus="handleToggleFocusInput"
      @blur="handleToggleFocusInput"
    />
  </label>
</template>

<style module>
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

.uiGroupFieldTitleActive,
.uiGroupField:focus .uiGroupFieldTitle {
  top: 10px;
  transform: none;

  font-size: 12px;
  line-height: 16px;
}

.uiGroupFieldInput {
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
