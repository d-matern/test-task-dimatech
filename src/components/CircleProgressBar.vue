<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    inProgress?: boolean;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    size?: number;
  }>(),
  {
    inProgress: false,
    success: false,
    warning: false,
    error: false,
    size: 100,
  },
);

const strokeWidth = 5;
const radius = computed(() => props.size / 2);
const stroke = computed(() => {
  if (props.success) {
    return 'rgb(18, 206, 102)';
  }
  if (props.warning) {
    return 'rgb(231, 162, 61)';
  }
  if (props.error) {
    return 'rgb(255, 73, 73)';
  }
  return 'rgb(32, 160, 255)';
});
const strokeDasharray = computed(() => 2 * 3.14 * radius.value);
const strokeDashoffset = computed(() => 2 * 3.14 * radius.value);
const pathPosition = computed(() => `translate(${radius.value - 12} ${radius.value - 12})`);
</script>

<template>
  <svg :width="size" :height="size">
    <text
      v-if="!success && !warning && !error"
      :class="$style.circleProgressBarText"
      :x="radius"
      :y="radius + 5.75"
      text-anchor="middle"
    >
      0%
    </text>
    <path
      v-if="success"
      d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
      :fill="stroke"
      :transform="pathPosition"
    />
    <path
      v-if="warning"
      d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      :fill="stroke"
      :transform="pathPosition"
    />
    <path
      v-if="error"
      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      :fill="stroke"
      :transform="pathPosition"
      stroke-linecap="round"
    />

    <circle
      :class="$style.circleProgressBarCircleBase"
      :cx="radius"
      :cy="radius"
      :r="radius - strokeWidth / 2"
      fill="none"
      :stroke-width="strokeWidth"
    />

    <circle
      :cx="radius"
      :cy="radius"
      :r="radius - strokeWidth / 2"
      fill="none"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="!success ? strokeDasharray : undefined"
      :stroke-dashoffset="!success ? strokeDashoffset : undefined"
      :transform="`rotate(-90 ${radius} ${radius})`"
      stroke-linecap="round"
    >
      <animate attributeName="stroke-dashoffset" :from="strokeDashoffset" to="0" dur="2s" />
    </circle>
  </svg>
</template>

<style module>
.circleProgressBarText {
  fill: rgb(145, 146, 148);
  font-size: 1rem;
  font-weight: 600;
}

.circleProgressBarCircleBase {
  stroke: rgb(246, 247, 250);
}
</style>
