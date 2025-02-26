<template>
  <div class="about">
    <h1>This is an about page</h1>

    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke-dasharray="565.48"
        stroke-dashoffset="141.37"
        stroke="#ccc"
        stroke-width="10"
        transform="rotate(135 100 100)"
        stroke-linecap="round"
      />
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#007bff"
        stroke-width="10"
        stroke-dasharray="565.48"
        stroke-dashoffset="141.37"
        transform="rotate(135 100 100)"
        stroke-linecap="round"
      >
        <animate attributeName="stroke-dashoffset" from="565.48" to="141.37" dur="2s" />
      </circle>
    </svg>
  </div>
</template>

<style></style>
