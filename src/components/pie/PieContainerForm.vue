<template>
  <form :class="$style.pieContainerForm" @click.stop>
    <slot />
  </form>
</template>

<style module>
.pieContainerForm {
  width: 100%;
  max-width: 390px;
  height: 100vh;
  max-height: fit-content;

  margin: 75px 0;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  position: relative;

  border-radius: 15px;
  background: white;
  overflow-y: auto;
}
</style>
