<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import { User } from "@server/models/user.model";
import BrGrid from "@/components/grid/BrGrid.vue";
import BrPage from "@/components/base/BrPage.vue";
import { useRouter } from "vue-router";
import { SalesVisit } from "@server/models/salesVisit.model";
import { SalesJourney } from "@server/models/salesJourney.model";
import { Outlet } from "@server/models/outlet.model";
import ButtonBar from "@/components/ButtonBar.vue";
import CreateSalesVisitDialog from "@/components/sales/CreateSalesVisitDialog.vue";
import { filterNonUniqueByProperty } from "@/utils/dataUtils";

type SalesVisitAndJourney = SalesVisit & {
  salesJourney: SalesJourney | null;
};

const router = useRouter();

const visits = ref<SalesVisitAndJourney[]>([]);
const users = ref<User[]>([]);
const outlets = ref<Outlet[]>([]);
const showCreateSalesVisitDialog = ref(false);
const showCreatedSnackbar = ref(false);

const salesJourneys = computed(() =>
  filterNonUniqueByProperty(
    visits.value
      .map((visit) => visit.salesJourney)
      .filter((visit) => !!visit) as SalesJourney[],
    (visit) => visit.id
  )
);

const [loading, refresh] = useLoadingState(async () => {
  visits.value = await client.salesVisit.getAllSalesVisits.query();

  const journeyUserIds = visits.value
    .map((visit) => visit.salesJourney?.assignedUserId)
    .filter((id) => !!id) as string[];

  [users.value, outlets.value] = await Promise.all([
    client.user.getUsers.query(journeyUserIds),
    client.outlet.getOutlets.query(visits.value.map((visit) => visit.outletId)),
  ]);
});

const openSalesVisit = async (item: SalesVisit) => {
  await router.push({
    path: `/sales/visits/${item.id}`,
  });
};

const gridConfiguration = new GridConfigurationBuilder<SalesVisitAndJourney>()
  .addTextColumn("Reference", (item) => item.reference)
  .addTextColumn(
    "Outlet Name",
    (item) =>
      outlets.value.find((outlet) => outlet.id === item.outletId)?.name ?? "-"
  )
  .addTextColumn(
    "Assigned to user",
    (item) =>
      users.value?.find((user) => user.id === item.salesJourney?.assignedUserId)
        ?.name ?? "-"
  )
  .addDateTimeColumn("Start time", (item) => item.startTime)
  .addDateTimeColumn("End time", (item) => item.endTime)
  .addActionsColumn((builder) => {
    builder
      .addRoutingAction("View", (item) => ({
        path: `/sales/visits/${item.id}`,
      }))
      .addRoutingAction("Go to Outlet", (item) => ({
        path: `/outlets/${item.outletId}`,
      }));
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page :loading="loading" title="Sales Visits">
    <br-grid
      :items="visits"
      :grid-configuration="gridConfiguration"
      :loading="loading"
      @row-clicked="openSalesVisit"
    />
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn color="primary" @click="showCreateSalesVisitDialog = true">
            Create Visit
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-sales-visit-dialog
    v-if="showCreateSalesVisitDialog"
    v-model="showCreateSalesVisitDialog"
    :outlets="outlets"
    :sales-journeys="salesJourneys"
    @accept="
      showCreatedSnackbar = true;
      refresh();
    "
  />
  <v-snackbar v-model="showCreatedSnackbar" :timeout="2000" color="success">
    Created new sales visit successfully!
  </v-snackbar>
</template>
