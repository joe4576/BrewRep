<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

// wormhole hasContentFor is not in the Vue 3 version of PortalVue,
// so use this hack to hide v-footer when there is no content
const defaultSlotContent = ref();
const showContent = computed(() => !defaultSlotContent.value);
</script>

<template>
  <v-footer v-show="showContent" class="footer px-1" app>
    <div class="footer-container">
      <portal-target name="footer">
        <div ref="defaultSlotContent" />
      </portal-target>
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
