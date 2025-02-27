<template>
  <button :class="$style.uiButtonFilled">
    <slot />
  </button>
</template>

<style module>
.uiButtonFilled {
  width: 100%;
  padding: 18px 36px;

  color: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  border-radius: 10px;
  background-color: #1b84ff;
}

.uiButtonFilled:active,
.uiButtonFilled:hover {
  background-color: #5ba7ff;
}

.uiButtonFilled:active {
  transform: scale(0.98);
}
</style>
