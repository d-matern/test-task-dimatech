<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { setStroke } from '@/utils/set-stroke';
import { setStrokeDashoffset } from '@/utils/set-stroke-dashoffset';

import type { StatusBarType } from '@/models/status-bar.type';

const strokeWidth = 5;
const halfSizePathIcon = 12;

const props = withDefaults(
  defineProps<{
    totalDownload: number;
    totalDownloaded: number;
    type?: 'default' | 'dashboard';
    size?: number;
    status?: StatusBarType;
    stroke?: string;
  }>(),
  {
    type: 'default',
    size: 100,
  },
);

const svgRef = ref<SVGSVGElement | null>(null);
const svgCircleProgressRef = ref<SVGCircleElement | null>(null);

const progress = computed(() => {
  if (!props.status && props.type === 'default') {
    return 0;
  }
  return +Math.min((props.totalDownloaded / props.totalDownload) * 100, 100).toFixed(0);
});
const halfSize = computed(() => props.size / 2);
const radius = computed(() => halfSize.value - strokeWidth);
const circumference = computed(() => 2 * Math.PI * radius.value);
const rotate = computed(() => {
  if (props.type === 'dashboard') {
    return `rotate(135 ${halfSize.value} ${halfSize.value})`;
  }
  return `rotate(-90 ${halfSize.value} ${halfSize.value})`;
});
const pathPosition = computed(
  () => `translate(${halfSize.value - halfSizePathIcon} ${halfSize.value - halfSizePathIcon})`,
);
const strokeDashoffset = computed(() => {
  if (props.type === 'dashboard') {
    return circumference.value * 0.25;
  }

  return 0;
});
const totalStrokeDashOffset = computed(
  () =>
    circumference.value -
    (+circumference.value / 100 - strokeDashoffset.value / 100) * progress.value,
);
const strokeInternal = computed(() => {
  if (props.stroke) {
    return props.stroke;
  }

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

watch(
  [
    () => svgRef.value,
    () => svgCircleProgressRef.value,
    () => props.status,
    strokeInternal,
    totalStrokeDashOffset,
  ],
  ([svg, svgCircleProgress, newStatus, newStroke, newTotalStrokeDashOffset]) => {
    if (svg && svgCircleProgress) {
      if (newStatus === 'inProgress' || props.type === 'dashboard') {
        if (svg.animationsPaused()) {
          svg.unpauseAnimations();
          return;
        }

        const currentDashoffset = svgCircleProgress.getAttribute('stroke-dashoffset');
        if (currentDashoffset) {
          if (newTotalStrokeDashOffset < strokeDashoffset.value) {
            setStrokeDashoffset(svgCircleProgress, `${strokeDashoffset.value}`);
          } else {
            setStrokeDashoffset(svgCircleProgress, `${newTotalStrokeDashOffset}`);
          }
        }
      }

      if (newStatus === 'success') {
        setStrokeDashoffset(svgCircleProgress, `${strokeDashoffset.value}`);
      }

      if (newStatus === 'warning' || newStatus === 'error') {
        handlePauseAnimation(svg, newStatus);
      }

      setStroke(svgCircleProgress, newStroke);
    }
  },
);

onMounted(() => {
  if (svgRef.value && props.type === 'default') {
    handlePauseAnimation(svgRef.value, 'onMounted');
  }
});
</script>

<template>
  <svg ref="svgRef" :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <text
      v-if="!status || status === 'inProgress' || type === 'dashboard'"
      :class="$style.circleProgressBarText"
      :x="halfSize"
      :y="halfSize + 5.75"
      text-anchor="middle"
    >
      {{ progress }}%
    </text>
    <path
      v-if="status === 'success' && type !== 'dashboard'"
      d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
      :fill="strokeInternal"
      :transform="pathPosition"
    />
    <path
      v-if="status === 'warning' && type !== 'dashboard'"
      d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      :fill="strokeInternal"
      :transform="pathPosition"
    />
    <path
      v-if="status === 'error' && type !== 'dashboard'"
      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      :fill="strokeInternal"
      :transform="pathPosition"
      stroke-linecap="round"
    />

    <circle
      :class="$style.circleProgressBarCircleBase"
      :cx="halfSize"
      :cy="halfSize"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="strokeDashoffset"
      :transform="rotate"
      stroke-linecap="round"
    />

    <circle
      ref="svgCircleProgressRef"
      :class="$style.circleProgressBarCircleMain"
      :cx="halfSize"
      :cy="halfSize"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="circumference"
      :transform="rotate"
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

.circleProgressBarCircleMain {
  transition: stroke-dashoffset 0.5s ease;
}
</style>
