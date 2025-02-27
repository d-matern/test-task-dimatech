<template>
  <ul :class="$style.pieContainer">
    <slot />
  </ul>
</template>

<style module>
.pieContainer li {
  margin-bottom: 5px;
}

.pieContainer li:last-child {
  margin-bottom: 0;
}
</style>
