<script setup lang="ts">
import IconClose from '../icons/IconClose.vue';
import UiButtonIcon from './UiButtonIcon.vue';

const emit = defineEmits(['click-close']);

const handleClose = () => {
  emit('click-close');
};
</script>

<template>
  <Teleport to="#app">
    <div :class="$style.uiModal" @click="handleClose">
      <UiButtonIcon :class="$style.uiModalCloseBtn" @click="handleClose">
        <IconClose />
      </UiButtonIcon>

      <slot />
    </div>
  </Teleport>
</template>

<style module>
.uiModal {
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  background: rgba(0, 0, 0, 0.5);
}

.uiModalCloseBtn {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 10000;

  color: white;
}
</style>
