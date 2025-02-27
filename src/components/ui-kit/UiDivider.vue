<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    variant?: 'horizontal' | 'vertical';
  }>(),
  {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    variant: 'horizontal',
  },
);
</script>
<template>
  <div
    :class="`ui-divider--${variant}`"
    :style="{
      height: variant === 'vertical' ? `${height}px` : undefined,
      marginTop: `${marginTop}px`,
      marginRight: `${marginRight}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
    }"
  />
</template>

<style>
.ui-divider--horizontal {
  border-bottom: 1px solid #dbdfe9;
}

.ui-divider--vertical {
  border-radius: 2px;
  border-left: 2px solid #dbdfe9;
}
</style>
