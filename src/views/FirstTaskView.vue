<script setup lang="ts">
import CircleProgressBar from '@/components/CircleProgressBar.vue';
import type { StatusBarType } from '@/models/status-bar.type';
import { onMounted, onUnmounted, ref } from 'vue';

const totalDownload = ref<number>(100);
const totalDownloadedDefault = ref<number>(0);
const totalDownloaded = ref<number>(0);
const totalDownloadedWarning = ref<number>(0);
const totalDownloadedError = ref<number>(0);
const statusInProgress = ref<StatusBarType>('inProgress');
const statusSuccess = ref<StatusBarType>('inProgress');
const statusWarning = ref<StatusBarType>('inProgress');
const statusError = ref<StatusBarType>('inProgress');

const totalPowerFirst = ref<number>(100);
const totalPowerFirstProgress = ref<number>(0);
const totalPowerSecond = ref<number>(100);
const totalPowerSecondProgress = ref<number>(0);

onMounted(() => {
  const intervalDefault = setInterval(() => {
    totalDownloaded.value += 5;

    if (totalDownloaded.value >= totalDownload.value) {
      statusSuccess.value = 'success';
      clearInterval(intervalDefault);
    }
  }, 500);

  const intervalWarning = setInterval(() => {
    totalDownloadedWarning.value += 5;

    if (totalDownloadedWarning.value >= 75) {
      statusWarning.value = 'warning';
      clearInterval(intervalWarning);
    }
  }, 500);

  const intervalError = setInterval(() => {
    totalDownloadedError.value += 5;

    if (totalDownloadedError.value >= 55) {
      statusError.value = 'error';
      clearInterval(intervalError);
    }
  }, 500);

  const intervalPowerFirst = setInterval(() => {
    totalPowerFirstProgress.value += 2;

    if (totalPowerFirstProgress.value >= 10) {
      clearInterval(intervalPowerFirst);
    }
  }, 500);

  const intervalPowerSecond = setInterval(() => {
    totalPowerSecondProgress.value += 5;

    if (totalPowerSecondProgress.value >= 60) {
      clearInterval(intervalPowerSecond);
    }
  }, 500);

  onUnmounted(() => {
    clearInterval(intervalDefault);
    clearInterval(intervalWarning);
    clearInterval(intervalError);
    clearInterval(intervalPowerFirst);
    clearInterval(intervalPowerSecond);
  });
});
</script>

<template>
  <main :class="$style.firstTask">
    <div>
      <CircleProgressBar :totalDownload="totalDownload" :totalDownloaded="totalDownloadedDefault" />
      <CircleProgressBar
        :totalDownload="totalDownload"
        :totalDownloaded="totalDownloaded"
        :status="statusInProgress"
      />
      <CircleProgressBar
        :totalDownload="totalDownload"
        :totalDownloaded="totalDownloaded"
        :status="statusSuccess"
      />
      <CircleProgressBar
        :totalDownload="totalDownload"
        :totalDownloaded="totalDownloadedWarning"
        :status="statusWarning"
      />
      <CircleProgressBar
        :totalDownload="totalDownload"
        :totalDownloaded="totalDownloadedError"
        :status="statusError"
      />
    </div>

    <div>
      <CircleProgressBar
        type="dashboard"
        :totalDownload="totalPowerFirst"
        :totalDownloaded="totalPowerFirstProgress"
        stroke="rgb(245, 108, 109)"
      />
      <CircleProgressBar
        type="dashboard"
        :totalDownload="totalPowerSecond"
        :totalDownloaded="totalPowerSecondProgress"
        stroke="rgb(28, 138, 247)"
      />
    </div>
  </main>
</template>

<style module>
.firstTask {
  margin-top: 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.firstTask div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

@media (max-width: 600px) {
  .firstTask div {
    flex-direction: column;
    align-items: center;
  }
}
</style>
