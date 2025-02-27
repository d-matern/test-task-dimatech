<script setup lang="ts">
import { ref } from 'vue';

import UiGroupField from '../ui-kit/UiGroupField.vue';
import PieContainerForm from './PieContainerForm.vue';
import UiModal from '../ui-kit/UiModal.vue';

import type { SectorType } from '@/models/sector.type';
import { useModalStore } from '@/stores/modal';
import UiButtonFilled from '../ui-kit/UiButtonFilled.vue';
import { usePieStore } from '@/stores/pie';
import UiGroupFieldColorPicker from '../ui-kit/UiGroupFieldColorPicker.vue';

const modalStore = useModalStore();
const pieStore = usePieStore();

const formState = ref<SectorType>({
  name: '',
  // eslint-disable-next-line
  // @ts-ignore
  amount: '',
  color: '',
});

const handleToggleForm = () => {
  modalStore.handleToggleModal('createSector');
};

const handleSubmit = () => {
  if (
    !formState.value.name &&
    (!formState.value.amount || +formState.value.amount <= 0) &&
    !formState.value.color
  ) {
    return;
  }

  pieStore.createSector({
    ...formState.value,
    amount: +formState.value.amount,
  });
  formState.value = {} as SectorType;
  handleToggleForm();
};
</script>

<template>
  <div>
    <UiButtonFilled @click="handleToggleForm">Добавить сектор</UiButtonFilled>

    <UiModal v-if="modalStore.modal.createSector" @click-close="handleToggleForm">
      <PieContainerForm @submit.prevent="handleSubmit">
        <h2>Добавление сектора</h2>

        <UiGroupField name="Наименование" v-model="formState.name" />

        <UiGroupField
          name="Значение"
          v-model="formState.amount"
          :attributes-input="{ type: 'number', min: 0, step: 1 }"
        />

        <UiGroupFieldColorPicker name="Цвет" v-model:color="formState.color" />

        <UiButtonFilled>Добавить сектор</UiButtonFilled>
      </PieContainerForm>
    </UiModal>
  </div>
</template>

<style module></style>
