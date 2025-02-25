<script setup lang="ts">
import CircleProgressBar from '@/components/CircleProgressBar.vue';
import { onMounted, onUnmounted, ref } from 'vue';
const inProgress = ref(false);
const success = ref(false);
const warning = ref(false);
const error = ref(false);

onMounted(() => {
  const timerInProgressId = setTimeout(() => {
    inProgress.value = true;
  }, 1000);
  const timerId = setTimeout(() => {
    success.value = true;
  }, 2000);

  onUnmounted(() => {
    clearTimeout(timerInProgressId);
    clearTimeout(timerId);
  });
});
</script>

<template>
  <main :class="$style.firstTask">
    <CircleProgressBar
      :in-progress="inProgress"
      :success="success"
      :warning="warning"
      :error="error"
    />
  </main>
</template>

<style module>
.firstTask {
  margin-top: 1rem;
  padding: 0 1rem;
  text-align: center;
}
</style>
