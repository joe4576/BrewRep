<script setup lang="ts">
// TODO use portal vue
</script>

<template>
  <v-footer class="footer px-1" app>
    <div class="footer-container">
      <div id="app-footer" />
    </div>
  </v-footer>
</template>

<style scoped>
.footer-container {
  width: 100%;
  margin: 0 8px;
}

#app-footer {
  display: flex;
}

.footer {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: inline-block;
}
</style>
