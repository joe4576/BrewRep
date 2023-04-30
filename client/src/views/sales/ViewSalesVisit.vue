<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, reactive, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { useRouter } from "vue-router";
import { Outlet } from "@server/models/outlet.model";
import useDirtyState from "@/composables/useDirtyState";
import BrDropdown from "@/components/input/BrDropdown.vue";
import { useValidationRules } from "@/composables/useValidationRules";
import ButtonBar from "@/components/ButtonBar.vue";

type SalesVisitAndJourney = SalesVisit & {
  salesJourney: SalesJourney | null;
};

interface ViewSalesJourneyProps {
  salesVisitId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesVisit = ref<SalesVisitAndJourney>();
const outlets = ref<Outlet[]>([]);
const salesJourneys = ref<SalesJourney[]>([]);

const internalSalesVisit = reactive<SalesVisit>({
  endTime: new Date(),
  reference: "",
  status: "OPEN",
  startTime: new Date(),
  outletId: "",
  id: "",
  salesJourneyId: "",
  tenantId: "",
});

const { form } = useFormValidation();
const { required } = useValidationRules();
const { isDirty, resetDirtyState } = useDirtyState(ref(internalSalesVisit));
const router = useRouter();

const [loading, refresh] = useLoadingState(async () => {
  [salesVisit.value, outlets.value, salesJourneys.value] = await Promise.all([
    client.salesVisit.getSalesVisit.query(props.salesVisitId),
    client.outlet.getAllOutlets.query(),
    client.salesJourney.getAllSalesJourneys.query(),
  ]);

  Object.entries(salesVisit.value).forEach(
    // @ts-ignore
    ([key, value]) => (internalSalesVisit[key] = value)
  );

  resetDirtyState();
});

const [updating, updateSalesVisit] = useLoadingState(async () => {
  if (!salesVisit.value) {
    return;
  }

  await client.salesVisit.saveSalesVisit.mutate({
    ...salesVisit.value,
    ...internalSalesVisit,
  });

  await refresh();
});

const salesVisitStatus = computed(() => {
  if (!salesVisit.value) {
    return "-";
  }

  return salesVisit.value?.status ?? "-";
});

onMounted(refresh);
</script>

<template>
  <br-page title="Sales Visit">
    <template #summary>
      {{ salesVisitStatus }}
    </template>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title> Sales Visit Details</v-card-title>
          <v-card-text>
            <br-form ref="form">
              <br-text
                v-model="internalSalesVisit.reference"
                label="Reference"
                :rules="[required]"
                :loading="loading"
              />
              <br-date
                v-model="internalSalesVisit.startTime"
                label="Visit Start Date"
                :loading="loading"
              />
              <br-date
                v-model="internalSalesVisit.endTime"
                label="Journey End Date"
                :loading="loading"
              />
              <br-dropdown
                v-model="internalSalesVisit.outletId"
                :item-title="(item: Outlet) => item.name"
                :item-value="(item: Outlet) => item.id"
                label="Outlet"
                :items="outlets"
              />
            </br-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title>Journey Details</v-card-title>
          <v-card-text>
            <br-dropdown
              v-model="internalSalesVisit.salesJourneyId"
              :loading="loading"
              label="Assign to journey"
              :items="salesJourneys"
              :item-title="(item: SalesJourney) => item.reference"
              :item-value="(item: SalesJourney) => item.id"
              clearable
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            secondary
            :disabled="!internalSalesVisit.salesJourneyId"
            :to="{
              path: `/sales/journeys/${internalSalesVisit.salesJourneyId}`,
            }"
          >
            Go to Journey
          </br-btn>
          <br-btn
            class="ml-2"
            color="primary"
            :disabled="loading || !isDirty || updating"
            @click="updateSalesVisit"
          >
            Update
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
</template>
