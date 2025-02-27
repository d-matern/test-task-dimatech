<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
    color?: string;
  }>(),
  {
    size: 20,
    color: '#ffffff',
  },
);
</script>

<template>
  <span
    :class="$style.uiColorCircle"
    :style="{ width: `${size}px`, height: `${size}px`, background: color }"
  />
</template>

<style module>
.uiColorCircle {
  display: inline-block;
  border-radius: 50%;
}
</style>
