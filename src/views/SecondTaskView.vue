<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Chart, ArcElement, Legend, PieController } from 'chart.js';
import UiDivider from '@/components/ui-kit/UiDivider.vue';
import PieCard from '@/components/pie/PieCard.vue';
import UiButtonIcon from '@/components/ui-kit/UiButtonIcon.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import { usePieStore } from '@/stores/pie';
import PieContainer from '@/components/pie/PieContainer.vue';
import PieCreateSectorForm from '@/components/pie/PieCreateSectorForm.vue';
import type { SectorDetailedType } from '@/models/sector.type';
import { useModalStore } from '@/stores/modal';
import PieEditSectorForm from '@/components/pie/PieEditSectorForm.vue';

Chart.register(ArcElement, Legend, PieController);

const pieStore = usePieStore();
const modalStore = useModalStore();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const chart = ref<Chart | null>(null);
const selectedSector = ref<SectorDetailedType | null>(null);

const handleOpenEditSector = (sector: SectorDetailedType) => {
  selectedSector.value = sector;
  modalStore.handleToggleModal('editSector');
};

const handleDeleteSector = (sectorId: number) => {
  pieStore.deleteSector(sectorId);
};

const createChart = () => {
  if (canvasRef.value) {
    chart.value = new Chart(canvasRef.value, {
      type: 'pie',
      options: {
        normalized: true,
        animation: false,
      },
      data: { ...pieStore.data },
    });
  }
};

watch(
  () => pieStore.data,
  () => {
    if (chart.value) {
      chart.value.destroy();
      createChart();
    }
  },
  { deep: true },
);

onMounted(() => {
  createChart();
});

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.destroy();
    chart.value = null;
  }
});
</script>

<template>
  <main :class="$style.pie">
    <h1 :class="$style.pieTitle">Круговая диаграмма</h1>

    <UiDivider :margin-top="30" :margin-bottom="40" />

    <div :class="$style.pieContent">
      <div :class="$style.pieContentControl">
        <PieContainer>
          <PieCard
            v-for="sector in pieStore.sectors"
            :key="sector.name"
            :name="sector.name"
            :percent="pieStore.sectorPercent[sector.id]"
            :color="sector.color"
          >
            <template #actions>
              <UiButtonIcon @click="handleOpenEditSector(sector)">
                <IconEdit />
              </UiButtonIcon>

              <UiButtonIcon @click="handleDeleteSector(sector.id)">
                <IconTrash />
              </UiButtonIcon>
            </template>
          </PieCard>
        </PieContainer>

        <PieCreateSectorForm :class="$style.pieContentControlAddSectorBtn" />
      </div>

      <div :class="$style.pieContentPreview">
        <canvas ref="canvasRef" role="img"></canvas>
      </div>
    </div>

    <PieEditSectorForm :sector="selectedSector" />
  </main>
</template>

<style module>
.pie {
  padding: 0 15px;
}

.pieTitle {
  font-weight: 600;
  font-size: 32px;
  line-height: 38.73px;
}

.pieContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.pieContentControl {
  width: 100%;
  max-width: 540px;
}

.pieContentControlAddSectorBtn {
  margin-top: 30px;
}

.pieContentPreview {
  width: 100%;
  max-width: 500px;
}

@media (max-width: 768px) {
  .pieTitle {
    text-align: center;
  }

  .pieContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
