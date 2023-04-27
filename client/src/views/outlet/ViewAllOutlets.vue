<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrGrid from "@/components/grid/BrGrid.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import useLoadingState from "@/composables/useLoadingState";
import { Outlet } from "@server/models/outlet.model";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const outlets = ref<Outlet[]>([]);

const [loading, refresh] = useLoadingState(async () => {
  outlets.value = await client.outlet.getAllOutlets.query();
});

const gridConfiguration = new GridConfigurationBuilder<Outlet>()
  .addTextColumn("Outlet name", (item) => item.name)
  .addTextColumn("Outlet code", (item) => item.code)
  .addActionsColumn((builder) =>
    builder.addRoutingAction("View", (item) => ({
      path: "/outlets/" + item.id,
    }))
  )
  .build();

const goToOutlet = async (outlet: Outlet) => {
  await router.push({
    path: "/outlets/" + outlet.id,
  });
};

onMounted(refresh);
</script>

<template>
  <br-page title="Outlets">
    <template #summary>
      <br-btn color="primary" @click="$router.push({ name: 'outlets-map' })">
        Go to Map 🌍
      </br-btn>
    </template>
    <br-grid
      :items="outlets"
      :grid-configuration="gridConfiguration"
      :loading="loading"
      @row-clicked="goToOutlet"
    />
  </br-page>
</template>
