import type { SectorDetailedType, SectorType } from '@/models/sector.type';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePieStore = defineStore('pieStore', () => {
  const sectors = ref<SectorDetailedType[]>([
    {
      id: 1,
      name: 'Сектор-1',
      amount: 250,
      color: '#FF6384',
    },
    {
      id: 2,
      name: 'Сектор-2',
      amount: 250,
      color: '#FFCD56',
    },
    {
      id: 3,
      name: 'Сектор-3',
      amount: 250,
      color: '#4BC0C0',
    },
  ]);
  const data = computed(() => ({
    labels: sectors.value.map((s) => s.name),
    datasets: [
      {
        label: 'Test task part 2',
        data: sectors.value.map((s) => s.amount),
        backgroundColor: sectors.value.map((s) => s.color),
        hoverOffset: 4,
      },
    ],
  }));
  const sectorPercent = computed<{ [key: number]: number }>(() => {
    let totalAmount = 0;
    const result: { [key: number]: number } = {};

    sectors.value.forEach((s) => {
      totalAmount += s.amount;
    });

    sectors.value.forEach((s) => {
      result[s.id] = +((s.amount / totalAmount) * 100).toFixed(0);
    });

    return result;
  });

  const createSector = (payload: SectorType) => {
    sectors.value.push({
      id: sectors.value.length + 1,
      ...payload,
    });
  };

  const editSector = (payload: SectorDetailedType) => {
    const sector = sectors.value.find((s) => s.id === payload.id);

    if (sector) {
      sector.name = payload.name;
      sector.amount = payload.amount;
      sector.color = payload.color;
    }
  };

  const deleteSector = (sectorId: number) => {
    sectors.value = sectors.value.filter((s) => s.id !== sectorId);
  };

  return { sectors, data, sectorPercent, createSector, editSector, deleteSector };
});
