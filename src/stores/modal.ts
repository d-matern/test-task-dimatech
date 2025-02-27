import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ModalType } from '@/models/modal.type';

export const useModalStore = defineStore('modalStore', () => {
  const modal = ref({
    createSector: false,
    editSector: false,
  });

  const handleToggleModal = (type: ModalType) => {
    modal.value[type] = !modal.value[type];
  };

  return {
    modal,
    handleToggleModal,
  };
});
