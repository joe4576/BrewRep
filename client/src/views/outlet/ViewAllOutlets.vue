<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrGrid from "@/components/grid/BrGrid.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import useLoadingState from "@/composables/useLoadingState";
import { Outlet } from "@server/models/outlet.model";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ButtonBar from "@/components/ButtonBar.vue";
import CreateOutletDialog from "@/components/outlets/CreateOutletDialog.vue";
import { useUserStore } from "@/store/userStore";
import ImportBrewManOutletsDialog from "@/components/outlets/ImportBrewManOutletsDialog.vue";

const router = useRouter();
const userStore = useUserStore();

const outlets = ref<Outlet[]>([]);
const brewmanOutlets = ref<Outlet[]>([]);
const showCreateOutletDialog = ref(false);
const showImportBrewManOutletsDialog = ref(false);

const [loading, refresh] = useLoadingState(async () => {
  outlets.value = await client.outlet.getAllOutlets.query();

  if (userStore.hasBrewManLink) {
    brewmanOutlets.value = await client.outlet.getAllBrewManOutlets.query();
  }
});

const gridConfiguration = new GridConfigurationBuilder<Outlet>()
  .addTextColumn("Outlet name", (item) => item.name)
  .addTextColumn("Outlet code", (item) => item.code)
  .addBooleanColumn("BrewMan Outlet?", (item) => item.isBrewManOutlet)
  .addActionsColumn((builder) =>
    builder
      .addRoutingAction("View", (item) => ({
        path: "/outlets/" + item.id,
      }))
      .addClickAction("Delete", async (item) => {
        await client.outlet.deleteOutlet.mutate(item);
        await refresh();
      })
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
      class="pb-4"
      :items="outlets"
      :grid-configuration="gridConfiguration"
      :loading="loading"
      @row-clicked="goToOutlet"
    />
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            v-if="userStore.hasBrewManLink"
            secondary
            :disabled="loading"
            @click="showImportBrewManOutletsDialog = true"
          >
            Import BrewMan Outlets
          </br-btn>
          <br-btn
            class="ml-2"
            color="primary"
            :disabled="loading"
            @click="showCreateOutletDialog = true"
          >
            Create outlet
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-outlet-dialog
    v-if="showCreateOutletDialog"
    v-model="showCreateOutletDialog"
    @accept="refresh"
  />
  <import-brew-man-outlets-dialog
    v-if="showImportBrewManOutletsDialog"
    v-model="showImportBrewManOutletsDialog"
    :brewman-outlets="brewmanOutlets"
    @accept="refresh"
  />
</template>
