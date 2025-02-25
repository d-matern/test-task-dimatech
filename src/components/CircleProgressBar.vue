<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { setStroke } from '@/utils/set-stroke';
import { setStrokeDasharray } from '@/utils/set-stroke-dasharray';

import type { StatusBarType } from '@/models/status-bar.type';

const strokeWidth = 5;
const halfSizePathIcon = 12;

const props = withDefaults(
  defineProps<{
    totalDownload: number;
    totalDownloaded: number;
    status?: StatusBarType;
    size?: number;
  }>(),
  {
    size: 100,
  },
);

const svgRef = ref<SVGSVGElement | null>(null);
const svgCircleProgressRef = ref<SVGCircleElement | null>(null);

const progress = computed(() => {
  if (!props.status) {
    return 0;
  }
  return +Math.min((props.totalDownloaded / props.totalDownload) * 100, 100).toFixed(0);
});
const radius = computed(() => props.size / 2);
const pathPosition = computed(
  () => `translate(${radius.value - halfSizePathIcon} ${radius.value - halfSizePathIcon})`,
);
const strokeDasharray = computed(() => 2 * 3.14 * radius.value - halfSizePathIcon);
const strokeDashoffset = computed(() => 2 * 3.14 * radius.value - halfSizePathIcon);
const totalStrokeDashOffset = computed(
  () => strokeDashoffset.value - (strokeDashoffset.value * progress.value) / 100,
);
const stroke = computed(() => {
  if (props.status === 'success') {
    return 'rgb(18, 206, 102)';
  }

  if (props.status === 'warning') {
    return 'rgb(231, 162, 61)';
  }

  if (props.status === 'error') {
    return 'rgb(255, 73, 73)';
  }

  return 'rgb(32, 160, 255)';
});

const handlePauseAnimation = (svg: SVGSVGElement, status: string) => {
  svg.pauseAnimations();
  console.log(`${status}: Анимация на паузе`);
};

function animateStrokeDashoffset(element: SVGCircleElement, targetOffset: number, duration = 500) {
  const startOffset = element.getAttribute('stroke-dashoffset') || '0';
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentOffset = +startOffset + (targetOffset - +startOffset) * progress;

    element.setAttribute('stroke-dashoffset', currentOffset.toString());

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

watch(
  [
    () => svgRef.value,
    () => svgCircleProgressRef.value,
    () => props.status,
    stroke,
    totalStrokeDashOffset,
  ],
  ([svg, svgCircleProgress, newStatus, newStroke, newTotalStrokeDashoffset]) => {
    if (svg && svgCircleProgress) {
      if (newStatus === 'inProgress') {
        if (svg.animationsPaused()) {
          setStroke(svgCircleProgress, newStroke);
          svg.unpauseAnimations();
          return;
        }

        setStroke(svgCircleProgress, newStroke);
        setStrokeDasharray(svgCircleProgress, strokeDasharray.value.toString());
        animateStrokeDashoffset(svgCircleProgress, newTotalStrokeDashoffset);
      }

      if (newStatus === 'success') {
        setStroke(svgCircleProgress, newStroke);
        animateStrokeDashoffset(svgCircleProgress, 0);
      }

      if (newStatus === 'warning' || newStatus === 'error') {
        setStroke(svgCircleProgress, newStroke);
        handlePauseAnimation(svg, newStatus);
      }
    }
  },
);
</script>

<template>
  <svg ref="svgRef" :width="size" :height="size">
    <text
      v-if="!status || status === 'inProgress'"
      :class="$style.circleProgressBarText"
      :x="radius"
      :y="radius + 5.75"
      text-anchor="middle"
    >
      {{ progress }}%
    </text>
    <path
      v-if="status === 'success'"
      d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
      :fill="stroke"
      :transform="pathPosition"
    />
    <path
      v-if="status === 'warning'"
      d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      :fill="stroke"
      :transform="pathPosition"
    />
    <path
      v-if="status === 'error'"
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
      ref="svgCircleProgressRef"
      :cx="radius"
      :cy="radius"
      :r="radius - strokeWidth / 2"
      fill="none"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
      :stroke-dashoffset="strokeDashoffset"
      :transform="`rotate(-90 ${radius} ${radius})`"
      stroke-linecap="round"
    />
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
