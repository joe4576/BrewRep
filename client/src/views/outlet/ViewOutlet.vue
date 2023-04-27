<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { Outlet } from "@server/models/outlet.model";
import { onMounted, reactive, ref } from "vue";

interface ViewOutletProps {
  outletId: string;
}

const props = defineProps<ViewOutletProps>();

const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const outlet = ref<Outlet>();

const outletFields = reactive<Pick<Outlet, "name" | "code" | "lat" | "long">>({
  name: "",
  code: "",
  lat: "",
  long: "",
});

const [loading, refresh] = useLoadingState(async () => {
  outlet.value = await client.outlet.getOutlet.query(props.outletId);
  Object.keys(outletFields).forEach(
    // @ts-ignore
    (key) => (outletFields[key] = outlet.value[key])
  );
});

const [savingOutlet, saveOutlet] = useLoadingState(
  async () => {
    if (!(await formIsValid()) || !outlet.value) {
      return;
    }

    await client.outlet.saveOutlet.mutate({
      ...outlet.value,
      ...outletFields,
    });

    await refresh();
  },
  (e) => {
    console.error("Failed to save outlet", e);
  }
);

onMounted(refresh);
</script>

<template>
  <br-page :title="outlet?.name ?? ''" :loading="loading">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title>Outlet details</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="saveOutlet">
              <br-text
                v-model="outletFields.name"
                label="Name"
                :rules="[required]"
              />
              <br-text
                v-model="outletFields.code"
                label="Code"
                :rules="[required]"
              />
              <br-text
                v-model="outletFields.lat"
                label="Latitude"
                :rules="[required]"
              />
              <br-text
                v-model="outletFields.long"
                label="Longitude"
                :rules="[required]"
              />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              color="primary"
              :disabled="loading || savingOutlet"
              :loading="savingOutlet"
              @click="saveOutlet"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </br-page>
</template>
