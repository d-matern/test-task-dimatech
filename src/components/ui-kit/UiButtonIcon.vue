<template>
  <button :class="$style.uiButtonIcon">
    <slot />
  </button>
</template>

<style module>
.uiButtonIcon {
  color: #99a1b7;
}

.uiButtonIcon:active,
.uiButtonIcon:hover {
  color: #616574;
}

.uiButtonIcon:active {
  transform: scale(0.9);
}
</style>
