<script setup lang="ts"></script>

<template>
  <div class="footer-container">
    <div>
      <slot name="left" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px 0 4px;
}
</style>
