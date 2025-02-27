<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';

import UiGroupField from '../ui-kit/UiGroupField.vue';
import PieContainerForm from './PieContainerForm.vue';
import UiModal from '../ui-kit/UiModal.vue';

import type { SectorDetailedType, SectorType } from '@/models/sector.type';
import { useModalStore } from '@/stores/modal';
import UiButtonFilled from '../ui-kit/UiButtonFilled.vue';
import { usePieStore } from '@/stores/pie';
import UiGroupFieldColorPicker from '../ui-kit/UiGroupFieldColorPicker.vue';

const props = defineProps<{ sector: SectorDetailedType | null }>();

const modalStore = useModalStore();
const pieStore = usePieStore();

const formState = ref<SectorType>({
  name: '',
  // eslint-disable-next-line
  // @ts-ignore
  amount: '',
  color: '',
});

const handleCloseForm = () => {
  modalStore.handleToggleModal('editSector');
};

const handleSubmit = () => {
  if (
    props.sector &&
    !formState.value.name &&
    (!formState.value.amount || +formState.value.amount <= 0) &&
    !formState.value.color
  ) {
    return;
  }

  pieStore.editSector({
    id: props.sector!.id,
    ...formState.value,
    amount: +formState.value.amount,
  });
  handleCloseForm();
};

watch(
  () => props.sector,
  (sector) => {
    if (sector) {
      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = props.sector;
      formState.value = { ...rest };
    }
  },
);

onBeforeUnmount(() => {
  formState.value = {} as SectorDetailedType;
});
</script>

<template>
  <UiModal v-if="modalStore.modal.editSector" @click-close="handleCloseForm">
    <PieContainerForm @submit.prevent="handleSubmit">
      <h2>Изменение сектора</h2>

      <UiGroupField name="Наименование" v-model="formState.name" />

      <UiGroupField
        name="Значение"
        v-model="formState.amount"
        :attributes-input="{ type: 'number', min: 0, step: 1 }"
      />

      <UiGroupFieldColorPicker name="Цвет" v-model:color="formState.color" />

      <UiButtonFilled>Сохранить изменения</UiButtonFilled>
    </PieContainerForm>
  </UiModal>
</template>

<style module></style>
