<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, reactive, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import useDirtyState from "@/composables/useDirtyState";
import { SalesVisit } from "@server/models/salesVisit.model";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import BrGrid from "@/components/grid/BrGrid.vue";
import { Outlet } from "@server/models/outlet.model";
import ButtonBar from "@/components/ButtonBar.vue";
import { useRouter } from "vue-router";
import { useValidationRules } from "@/composables/useValidationRules";
import CreateSalesVisitDialog from "@/components/sales/CreateSalesVisitDialog.vue";
import AddExistingVisitDialog from "@/components/sales/AddExistingVisitDialog.vue";
import BrMap, { Marker } from "@/components/map/BrMap.vue";
import InProgressJourney from "@/views/sales/InProgressJourney.vue";

type SalesJourneyAndVisit = SalesJourney & {
  salesVisits: SalesVisit[];
};

interface ViewSalesJourneyProps {
  salesJourneyId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesJourney = ref<SalesJourneyAndVisit>();
const allSalesVisits = ref<SalesVisit[]>([]);
const outlets = ref<Outlet[]>([]);
const showCreateSalesVisitDialog = ref(false);
const showAddExistingVisitDialog = ref(false);
const showMapView = ref(false);
const selectedOutletIdFromMap = ref<string | null>(null);
const showAddVisitSnackbar = ref(false);
const currentVisit = ref<SalesVisit>();

const internalSalesJourney = reactive<SalesJourney>({
  reference: "",
  assignedUserId: "",
  inProgress: false,
  completed: false,
  tenantId: "",
  date: new Date(),
  id: "",
  endMilage: 0,
  startMilage: 0,
});

const { form } = useFormValidation();
const { required } = useValidationRules();
const { isDirty, resetDirtyState } = useDirtyState(ref(internalSalesJourney));
const router = useRouter();

const [loading, refresh] = useLoadingState(async () => {
  [salesJourney.value, outlets.value, allSalesVisits.value] = await Promise.all(
    [
      client.salesJourney.getSalesJourney.query(props.salesJourneyId),
      client.outlet.getAllOutlets.query(),
      client.salesVisit.getAllSalesVisits.query(),
    ]
  );

  Object.entries(salesJourney.value).forEach(
    // @ts-ignore
    ([key, value]) => (internalSalesJourney[key] = value)
  );

  resetDirtyState();
  selectedOutletIdFromMap.value = null;
  showAddVisitSnackbar.value = false;
});

const [updating, updateSalesJourney] = useLoadingState(async () => {
  if (!salesJourney.value) {
    return;
  }

  await client.salesJourney.saveSalesJourney.mutate({
    ...salesJourney.value,
    ...internalSalesJourney,
  });
  await refresh();
});

const startJourney = async () => {
  internalSalesJourney.inProgress = true;
  await updateSalesJourney();
};

const finishJourney = async () => {
  if (!salesJourney.value?.id) {
    return;
  }

  // get updated journey
  salesJourney.value = await client.salesJourney.getSalesJourney.query(
    salesJourney.value.id
  );

  // update journey
  await client.salesJourney.completeJourney.mutate(salesJourney.value.id);

  // refresh
  await refresh();
};

const journeyInProgress = computed(
  () => salesJourney.value?.inProgress ?? false
);

const journeyComplete = computed(() => salesJourney.value?.completed ?? false);

const salesJourneyStatus = computed(() => {
  if (!salesJourney.value) {
    return "-";
  }

  if (salesJourney.value?.inProgress) {
    return "In Progress";
  }

  if (salesJourney.value?.completed) {
    return "Completed";
  }

  return "Pending";
});

const markers = computed((): Marker[] =>
  outlets.value.map((outlet) => ({
    lat: outlet.lat,
    long: outlet.long,
    label: outlet.name,
    entityId: outlet.id,
    color: salesJourney.value?.salesVisits
      ?.map((visit) => visit.outletId)
      ?.includes(outlet.id)
      ? "green"
      : "red",
  }))
);

const gridConfiguration = new GridConfigurationBuilder<SalesVisit>()
  .addTextColumn("Reference", (item) => item.reference)
  .addTextColumn(
    "Outlet",
    (item) =>
      outlets.value.find((outlet) => outlet.id === item.outletId)?.name ?? "-"
  )
  .addDateTimeColumn("Start time", (item) => item.startTime)
  .addDateTimeColumn("End time", (item) => item.endTime)
  .addTextColumn("Status", (item) => item.status)
  .addActionsColumn((builder) => {
    if (journeyComplete.value) {
      return;
    }

    builder
      .addRoutingAction("View", (item) => ({
        path: `/sales/visits/${item.id}`,
      }))
      .addClickAction("Remove Visit", async (item) => {
        if (!item.salesJourneyId) {
          return;
        }

        await client.salesJourney.removeVisitFromSalesJourney.mutate({
          salesJourneyId: item.salesJourneyId,
          salesVisitId: item.id,
        });

        await refresh();
      });
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page title="Sales Journey" show-back-button :loading="loading">
    <template #summary>
      {{ salesJourneyStatus }}
    </template>
    <template v-if="journeyComplete">
      <p>
        This journey had been completed. This is a list of all the visits that
        were completed on this journey.
      </p>
      <br-grid
        :grid-configuration="gridConfiguration"
        :items="salesJourney?.salesVisits ?? []"
        :loading="loading"
        @row-clicked="
          $router.push({
            path: `/sales/visits/${$event.id}`,
          })
        "
      />
    </template>
    <template v-else-if="journeyInProgress">
      <in-progress-journey :sales-journey-id="salesJourney.id" />
    </template>
    <template v-else-if="!showMapView">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card :loading="loading">
            <v-card-title> Sales Journey Details</v-card-title>
            <v-card-text>
              <br-form ref="form" @submit.prevent="updateSalesJourney">
                <br-text
                  v-model="internalSalesJourney.reference"
                  label="Reference"
                  :rules="[required]"
                  :loading="loading"
                />
                <br-date
                  v-model="internalSalesJourney.date"
                  label="Journey Start Date"
                  :loading="loading"
                />
              </br-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <br-btn
                variant="text"
                :disabled="!isDirty || updating"
                :loading="loading || updating"
                color="primary"
                @click="updateSalesJourney"
              >
                Update
              </br-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row class="justify-space-between">
            <v-col cols="auto">
              <br-subtitle>Visits on Journey</br-subtitle>
            </v-col>
            <v-col cols="auto">
              <br-btn
                secondary
                :disabled="loading"
                @click="showAddExistingVisitDialog = true"
              >
                Add existing visit
                <v-icon icon="mdi-plus-circle-outline" class="ml-2" />
              </br-btn>
              <br-btn
                class="ml-2"
                color="primary"
                :disabled="loading"
                @click="showCreateSalesVisitDialog = true"
              >
                Create Visit
                <v-icon icon="mdi-plus-circle-outline" class="ml-2" />
              </br-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <br-grid
            :grid-configuration="gridConfiguration"
            :items="salesJourney?.salesVisits ?? []"
            :loading="loading"
            @row-clicked="
              $router.push({
                path: `/sales/visits/${$event.id}`,
              })
            "
          />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-container class="mx-0 mb-2">
        <v-row>
          <v-col cols="auto" class="d-flex align-center pa-0">
            <v-img
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
              width="30px"
              height="30px"
            />
            <p>= Outlet with scheduled visit on this journey,</p>
          </v-col>
          <v-col cols="auto" class="d-flex align-center pa-0">
            <v-img
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
              width="30px"
              height="30px"
            />
            <p>= Outlet with no scheduled visit</p>
          </v-col>
        </v-row>
      </v-container>
      <br-map
        style="height: 700px"
        :markers="markers"
        :loading="false"
        @marker-click="
          selectedOutletIdFromMap = $event;
          showAddVisitSnackbar = true;
        "
        @map-click="showAddVisitSnackbar = false"
      />
    </template>
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            v-if="!journeyInProgress && !journeyComplete"
            secondary
            @click="
              showMapView = !showMapView;
              showAddVisitSnackbar = false;
              selectedOutletIdFromMap = null;
            "
          >
            {{ showMapView ? "Close" : "Open" }} Map 🌍
          </br-btn>
          <br-btn
            v-if="journeyInProgress"
            class="ml-2"
            color="primary"
            :disabled="loading"
            @click="finishJourney"
          >
            Finish Journey
          </br-btn>
          <br-btn
            v-if="!journeyComplete && !journeyInProgress"
            class="ml-2"
            color="primary"
            :disabled="loading"
            :loading="updating"
            @click="startJourney"
          >
            Start Journey
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-sales-visit-dialog
    v-if="showCreateSalesVisitDialog && salesJourney"
    v-model="showCreateSalesVisitDialog"
    :sales-journeys="[salesJourney]"
    creating-from-visit
    :outlets="outlets"
    :outlet-id="selectedOutletIdFromMap"
    @accept="refresh"
  />
  <add-existing-visit-dialog
    v-if="showAddExistingVisitDialog && salesJourney"
    v-model="showAddExistingVisitDialog"
    :sales-visits="allSalesVisits"
    :sales-journey="salesJourney"
    @accept="refresh"
  />
  <v-snackbar v-model="showAddVisitSnackbar" :timeout="10000">
    Would you like to add a visit to
    {{
      outlets.find((outlet) => outlet.id === selectedOutletIdFromMap)?.name ??
      "-"
    }}
    ?
    <template #actions>
      <br-btn variant="text" @click="showCreateSalesVisitDialog = true">
        Add Visit
      </br-btn>
    </template>
  </v-snackbar>
</template>
