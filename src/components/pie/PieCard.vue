<script setup lang="ts">
import UiDivider from '@/components/ui-kit/UiDivider.vue';
import UiColorCircle from '../ui-kit/UiColorCircle.vue';

defineProps<{
  name: string;
  percent: number;
  color: string;
}>();
</script>

<template>
  <li :class="$style.pieCard">
    <div :class="$style.pieCardParam">
      <p :class="$style.pieCardParamName">{{ name }}</p>
      <UiDivider :height="16" variant="vertical" />
      <p :class="$style.pieCardParamPercent">{{ percent }}%</p>
      <UiDivider :height="16" variant="vertical" />
      <UiColorCircle :color="color" />
    </div>

    <div :class="$style.pieCardActions">
      <slot name="actions" />
    </div>
  </li>
</template>

<style module>
.pieCard {
  padding: 18px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 10px;
  background: rgba(219, 223, 233, 0.2);
}

.pieCardParam {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
}

.pieCardParamName {
  width: 100px;
  overflow: hidden;
}

.pieCardParamPercent {
  width: 37px;
  text-align: center;
}

.pieCardActions {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 410px) {
  .pieCard {
    justify-content: center;
  }
}
</style>
